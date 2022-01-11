import {atom, selector, useRecoilState} from "recoil";
import {langAtom} from "../AppState";
import {recoilPersist} from "recoil-persist";

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