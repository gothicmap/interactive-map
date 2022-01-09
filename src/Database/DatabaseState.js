import items from "./items.json";
import {atom, selector, useRecoilState} from "recoil";

export const allCategories = items.categories

export const activeCategoriesAtom = atom({
    key: 'DatabaseActiveCategoriesAtom',
    default: items.categories,
})

export const itemsSelector = selector({
  key: 'DatabaseItemsSelector',
  get: ({get}) => {
      const activeCategories = get(activeCategoriesAtom)
      return items.items.filter((item) => activeCategories.includes(item.category))
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
        if(value) {
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