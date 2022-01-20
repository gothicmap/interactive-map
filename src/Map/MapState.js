import {atomFamily, selector, selectorFamily, useRecoilState} from "recoil";
import {createKdTree} from "kd.tree";
import {langAtom} from "../AppState";
import {recoilPersist} from "recoil-persist";
import {parseExpression} from "../Expression/ExpressionParser";

const {persistAtom} = recoilPersist()

const dataSelector = selector({
    key: 'MapDataSelector',
    get: async ({get}) => {
        const lang = get(langAtom)
        let response = await fetch(`/data/${lang}/map/map.json`);
        return await response.json();
    }
});

export const categoriesSelector = selector({
    key: 'MapCategoriesSelector',
    get: ({get}) => {
        const data = get(dataSelector)
        return [...data.categories.containers, ...data.categories.items]
    },
});

export const activeCategoriesFamily = atomFamily({
    key: 'MapActiveCategoriesAtom',
    default: categoriesSelector,
    effects_UNSTABLE: [persistAtom],
})

export const visitedPinsAtop = atomFamily({
    key: 'MapVisitedPinsAtom',
    default: [],
    effects_UNSTABLE: [persistAtom],
})


export const usePinVisited = (mapId, pinId) => {
    const [visitedPins, setVisitedPins] = useRecoilState(visitedPinsAtop(mapId))


    const set = (value) => {
        if (value && !visitedPins.includes(pinId)) {
            setVisitedPins([...visitedPins, pinId])
        }
        if (!value && visitedPins.includes(pinId)) {
            setVisitedPins(visitedPins.filter((pin) => pin !== pinId))
        }
    }

    return [visitedPins.includes(pinId), set]
}

export const scaleFamily = atomFamily({
    key: 'MapScale',
    default: 100
});

export const mapSettingsFamily = atomFamily({
    key: 'MapSettings',
    default: false
});


export const mapPinsSearch = atomFamily({
    key: 'MapPinsSearch',
    default: ""
})

const contains = (source, target) => {
    if (source) {
        return source.toLowerCase().includes(target)
    }

    return false
}

const containerContains = (probablyContainer, target) => {
    if (probablyContainer.type === "container") {
        for (const item of probablyContainer.contains) {
            if (contains(item.name, target)) {
                return true
            }
        }
    } else {
        return false
    }
}

export const searchExpressionFamily = selectorFamily({
    key: 'MapSearchExpression',
    get: (mapId) => ({get}) => {
        const searchTerm = get(mapPinsSearch(mapId))
        return parseExpression(searchTerm)
    },
});

const searchPredicate = selectorFamily({
    key: 'MapSearchPredicate',
    get: (mapId) => ({get}) => {
        const searchTerm = get(mapPinsSearch(mapId)).toLowerCase().trim()
        const {expression} = get(searchExpressionFamily(mapId))

        if (expression) {
            return expression
        } else {
            return {
                evaluate: (item) => {
                    return contains(item.name, searchTerm) || containerContains(item, searchTerm)
                }
            }
        }
    },
});


export const mapPinsSelector = selectorFamily({
    key: 'MapPinsFamily',
    get: (mapId) => ({get}) => {
        const predicate = get(searchPredicate(mapId))
        const activeCategories = get(activeCategoriesFamily(mapId))
        const data = get(dataSelector)

        const result = []
        const treePoints = []

        for (const pin of data.pins) {
            if (!predicate.evaluate(pin)) {
                continue
            }

            if (activeCategories.includes(pin.category)) {
                result.push(pin)
                treePoints.push({...pin.normPosition, pin: pin})
            }
        }

        const containerDistance = function (a, b) {
            return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
        }

        const tree = createKdTree(treePoints, containerDistance, ['x', 'y'])

        return {
            nearest: (x, y, distance) => {
                return tree.nearest({x: x, y: y}, 1, distance)
            },
            pins: result
        }
    },
});

export const useCategories = (mapId) => {
    const [activeCategories, setActiveCategories] = useRecoilState(activeCategoriesFamily(mapId))

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