import {atom, selector, useRecoilState} from "recoil";
import {langAtom} from "../AppState";
import {recoilPersist} from "recoil-persist";
import {Strings} from "../Strings";
import {Box, Tooltip} from "@mui/material";
import {
    items as ruItems,
    itemsCategories as ruItemsCategories
} from "../Data/database.ru"
import {
    items as enItems,
    itemsCategories as enItemsCategories
} from "../Data/database.en"
import {
    items as plItems,
    itemsCategories as plItemsCategories
} from "../Data/database.pl"

const {persistAtom} = recoilPersist()

export const databaseSearchTerm = atom({
    key: 'DatabaseSearchTermAtom',
    default: "",
})

export const dataSelector = selector({
    key: 'DatabaseDataSelector',
    get: async ({get}) => {
        const lang = get(langAtom)
        switch (lang) {
            case "en":
                return Object.entries(enItems).map(([, item]) => item);
            case "ru":
                return Object.entries(ruItems).map(([, item]) => item);
            case "pl":
                return Object.entries(plItems).map(([, item]) => item);
            default:
                throw Error("Unknown language")
        }
    }
});

export const categoriesSelector = selector({
    key: 'DatabaseCategoriesSelector',
    get: ({get}) => {
        const lang = get(langAtom)
        switch (lang) {
            case "en":
                return enItemsCategories;
            case "ru":
                return ruItemsCategories;
            case "pl":
                return plItemsCategories;
            default:
                throw Error("Unknown language")
        }
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
        const items = get(dataSelector)
        const searchTerm = get(databaseSearchTerm).toLowerCase()
        const activeCategories = get(activeCategoriesAtom)

        const checkItem = (item) => {
            return (item.name && item.name.toLowerCase().includes(searchTerm))
                || (item.description && item.description.toLowerCase().includes(searchTerm))
        }

        if (searchTerm) {
            return items.filter((item) => activeCategories.some(value => item.flags.includes(value)) && checkItem(item))
        } else {
            return items.filter((item) => activeCategories.some(value => item.flags.includes(value)))
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