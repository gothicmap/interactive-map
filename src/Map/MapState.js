import {atomFamily, selector, selectorFamily, useRecoilState} from "recoil";
import {createKdTree} from "kd.tree";
import {langAtom} from "../AppState";
import {recoilPersist} from "recoil-persist";
import {searchPredicate} from "./Search/SearchState";
import {mapPinsCategories, postProcessMapPins} from "../Data/database"
import {rawItemsSelector} from "../Database/DatabaseState";
import * as React from "react";

const {persistAtom} = recoilPersist()

const pinsSelector = selector({
    key: 'MapPinsSelector',
    get: async ({get}) => {
        const lang = get(langAtom)
        const items = get(rawItemsSelector)
        let enResponse = await (await fetch(`/data/database.${lang}.pins.json`)).json();
        postProcessMapPins(enResponse, items)
        return enResponse
    }
});

export const categoryFamily = atomFamily({
    key: 'MapCategoryFamily',
    default: true,
    effects_UNSTABLE: [persistAtom],
})

// export const flattendCategories = flatCategories(mapPinsCategories)
//
// export const activeCategoriesFamily = atomFamily({
//     key: 'MapActiveCategoriesAtom',
//     default: flattendCategories,
//     effects_UNSTABLE: [persistAtom],
// })

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

        const pins = get(pinsSelector)

        const result = []
        const treePoints = []

        for (const pin of pins) {
            if (!predicate.evaluate(pin, lang)) {
                continue
            }
            if(get(categoryFamily(`${mapId}-${pin.data.category}`))) {
                for(const flag of pin.data.flags) {
                    if(get(categoryFamily(`${mapId}-${pin.data.category}-${flag}`))) {
                        result.push(pin)
                        treePoints.push({...pin.normPosition, pin: pin})
                    }
                }
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