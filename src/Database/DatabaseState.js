import {atom, selector, useRecoilState} from "recoil";
import {langAtom} from "../AppState";
import {recoilPersist} from "recoil-persist";
import {Strings} from "../Strings";

const {persistAtom} = recoilPersist()

export const databaseSearchTerm = atom({
    key: 'DatabaseSearchTermAtom',
    default: "",
})

const dataSelector = selector({
    key: 'DatabaseDataSelector',
    get: async ({get}) => {
        const lang = get(langAtom)
        let response = await fetch(`/data/${lang}/database/items.json`);
        return await response.json();
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


const valueSort = (valueName) => {
    const getter = valueGetter(valueName)
    return (rowA, rowB) => {
        const a = getter(rowA)
        const b = getter(rowB)

        if (a > b || (a && !b)) {
            return 1;
        }

        if (b > a || (b && !a)) {
            return -1
        }

        return 0
    }
}

export const itemsColumnsSelector = selector({
    key: 'DatabaseColumnsSelector',
    get: ({get}) => {
        const lang = get(langAtom)

        const processed = []

        const columns = [
            {
                name: Strings.getUi("name", lang),
                selector: row => row.name,
                sortable: true,
            },
            {
                name: Strings.getUi("consoleId", lang),
                selector: row => row.item,
                sortable: true,
            }
        ]

        const items = get(itemsSelector)

        for (const item of items) {
            for (const value of item.values) {
                if (!processed.includes(value[0])) {
                    processed.push(value[0])
                    columns.push({
                        name: value[0],
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