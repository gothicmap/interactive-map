import {atomFamily, selector, selectorFamily, useRecoilState} from "recoil";
import {createKdTree} from "kd.tree";
import {langAtom} from "../AppState";
import {recoilPersist} from "recoil-persist";
import {searchPredicate} from "./Search/SearchState";
import {postProcessMapPins as ruPostProcessMapPins, mapContainerCategories as ruMapContainerCategories, mapItemsCategories as ruMapItemsCategories} from "../Data/database.ru"
import {postProcessMapPins as enPostProcessMapPins, mapContainerCategories as enMapContainerCategories, mapItemsCategories as enMapItemsCategories} from "../Data/database.en"
import {postProcessMapPins as plPostProcessMapPins, mapContainerCategories as plMapContainerCategories, mapItemsCategories as plMapItemsCategories} from "../Data/database.pl"
import {rawItemsSelector} from "../Database/DatabaseState";

const {persistAtom} = recoilPersist()

const pinsSelector = selector({
    key: 'MapPinsSelector',
    get: async ({get}) => {
        const lang = get(langAtom)
        const items = get(rawItemsSelector)
        switch (lang){
            case "en":
                let enResponse = await(await fetch(`/data/database.en.pins.json`)).json();
                enPostProcessMapPins(enResponse, items)
                return enResponse
            case "ru":
                let ruResponse = await(await fetch(`/data/database.ru.pins.json`)).json();
                ruPostProcessMapPins(ruResponse, items)
                return ruResponse
            case "pl":
                let plResponse = await(await fetch(`/data/database.pl.pins.json`)).json();
                plPostProcessMapPins(plResponse, items)
                return plResponse
            default:
                throw Error("Unknown language")
        }
    }
});

export const categoriesSelector = selector({
    key: 'MapCategoriesSelector',
    get: ({get}) => {
        const lang = get(langAtom)
        switch (lang){
            case "en":
                return [...enMapContainerCategories, ...enMapItemsCategories];
            case "ru":
                return [...ruMapContainerCategories, ...ruMapItemsCategories];
            case "pl":
                return [...plMapContainerCategories, ...plMapItemsCategories];
            default:
                throw Error("Unknown language")
        }
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

export const mapPinsSelector = selectorFamily({
    key: 'MapPinsFamily',
    get: (mapId) => ({get}) => {
        const lang = get(langAtom)
        const predicate = get(searchPredicate(mapId))
        const activeCategories = get(activeCategoriesFamily(mapId))
        const pins = get(pinsSelector)

        const result = []
        const treePoints = []

        for (const pin of pins) {
            if (!predicate.evaluate(pin, lang)) {
                continue
            }

            if (activeCategories.some(value => pin.data.flags.includes(value))) {
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