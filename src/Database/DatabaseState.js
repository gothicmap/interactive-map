import {atom, selector, useRecoilState} from "recoil";
import {langAtom} from "../AppState";
import {recoilPersist} from "recoil-persist";
import {Strings} from "../Strings";
import {Box, Tooltip} from "@mui/material";

const {persistAtom} = recoilPersist()

export const databaseSearchTerm = atom({
    key: 'DatabaseSearchTermAtom',
    default: "",
})

export const dataSelector = selector({
    key: 'DatabaseDataSelector',
    get: async ({get}) => {
        const lang = get(langAtom)
        const items = await (await fetch(`/data/${lang}/database/items.json`)).json();

        const byId = {

        }

        for(const item of items.items) {
            byId[item.item] = item
        }

        items.byId = byId

        return items;
    }
});

export const categoriesSelector = selector({
    key: 'DatabaseCategoriesSelector',
    get: ({get}) => {
        const data = get(dataSelector)
        return data.categories
    },
});

export const activeCategoriesAtom = atom({
    key: 'DatabaseActiveCategoriesAtom',
    default: categoriesSelector,
    effects_UNSTABLE: [persistAtom],
})

export const paginationItemsPerPage = atom({
    key: 'DatabasePaginationItemsPerPage',
    default: 25,
    effects_UNSTABLE: [persistAtom],
})

export const itemsSelector = selector({
    key: 'DatabaseItemsSelector',
    get: ({get}) => {
        const data = get(dataSelector)
        const searchTerm = get(databaseSearchTerm).toLowerCase()
        const activeCategories = get(activeCategoriesAtom)

        const checkItem = (item) => {
            return (item.name && item.name.toLowerCase().includes(searchTerm))
                || (item.description && item.description.toLowerCase().includes(searchTerm))
        }

        if (searchTerm) {
            return data.items.filter((item) => activeCategories.includes(item.category) && checkItem(item))
        } else {
            return data.items.filter((item) => activeCategories.includes(item.category))
        }
    },
});


const valueGetter = (valueName) => {
    return (row) => {
        const found = row.values.find((element) => element[0] === valueName)
        return found && found[1]
    }
}

const HeaderName = ({title}) => {
    return <Tooltip title={title}>
        <Box sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        }}>{title}</Box>
    </Tooltip>
}

export const itemsColumnsSelector = selector({
    key: 'DatabaseColumnsSelector',
    get: ({get}) => {
        const lang = get(langAtom)

        const processed = []

        const columns = [
            {
                name: <HeaderName title={Strings.getUi("name", lang)}/>,
                selector: row => row.name,
                sortable: true,
                style: {
                    position: "sticky",
                    left: 0,
                    "z-index": "100",
                    backgroundColor: "#121212"
                }
            },
            {
                name: <HeaderName title={Strings.getUi("consoleId", lang)}/>,
                selector: row => row.item,
                sortable: true,
            },
            {
                name: <HeaderName title={Strings.getUi("description", lang)}/>,
                selector: row => row.description,
                sortable: true,
                cell: row => {
                    return <Tooltip title={<Box sx={{whiteSpace: "pre-wrap"}}>{row.description}</Box>}>
                        <Box sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }}>{row.description}</Box>
                    </Tooltip>
                }
            }
        ]

        const items = get(itemsSelector)

        for (const item of items) {
            for (const value of item.values) {
                if (!processed.includes(value[0])) {
                    processed.push(value[0])
                    columns.push({
                        name: <HeaderName title={value[0]}/>,
                        selector: valueGetter(value[0]),
                        // sortFunction: valueSort(value[0]),
                        sortable: true,
                    })
                }
            }
        }

        return columns
    },
});

export const useCategories = () => {
    const [activeCategories, setActiveCategories] = useRecoilState(activeCategoriesAtom)

    const activate = (category) => {
        if (!activeCategories.includes(category)) {
            setActiveCategories([...activeCategories, category])
        }
    }

    const deactivate = (category) => {
        if (activeCategories.includes(category)) {
            setActiveCategories(activeCategories.filter((cat) => cat !== category))
        }
    }

    const set = (category, value) => {
        if (value) {
            activate(category)
        } else {
            deactivate(category)
        }
    }

    const check = (category) => {
        return activeCategories.includes(category)
    }

    return [check, set]
}