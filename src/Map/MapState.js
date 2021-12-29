import {atomFamily, useRecoilState, useRecoilValue} from "recoil";


export const containersEnabledFamily = atomFamily({
    key: 'MapContainersEnabled',
    default: true
});

export const containerCatCorpsesFamily = atomFamily({
    key: 'MapContainersCatCorpses',
    default: true
});

export const containerCatChestsFamily = atomFamily({
    key: 'MapContainersCatChests',
    default: true
});

export const containerCatBarrelsFamily = atomFamily({
    key: 'MapContainersCatBarrels',
    default: true
});

export const containerCatVineyardFamily = atomFamily({
    key: 'MapContainersCatVineyard',
    default: true
});

export const containerCatBookshelfFamily = atomFamily({
    key: 'MapContainersCatBookshelf',
    default: true
});

export const containerCatVineshelfFamily = atomFamily({
    key: 'MapContainersCatVineshelf',
    default: true
});

export const containerCatGravesFamily = atomFamily({
    key: 'MapContainersCatGraves',
    default: true
});

export const containerCatOtherFamily = atomFamily({
    key: 'MapContainersCatOthers',
    default: true
});

export const itemsEnabledFamily = atomFamily({
    key: 'MapItemsEnabled',
    default: true
});

export const itemsCatOtherFamily = atomFamily({
    key: 'MapItemsCatOthers',
    default: true
});

export const scaleFamily = atomFamily({
    key: 'MapScale',
    default: 100
});


export const groups = {
    "containers": {
        "main": {
            "display": "Containers",
            "family": containersEnabledFamily
        },
        "categories": {
            "corpse": {
                "display": "Corpses",
                "family": containerCatCorpsesFamily
            },
            "chest": {
                "display": "Chests",
                "family": containerCatChestsFamily
            },
            "grave": {
                "display": "Graves",
                "family": containerCatGravesFamily
            },
            "barrel": {
                display: "Barrels",
                family: containerCatBarrelsFamily
            },
            "bookshelf": {
                display: "Books Shelf",
                family: containerCatBookshelfFamily
            },
            "searchvineyard": {
                display: "Vineyard",
                family: containerCatVineyardFamily
            },
            "vineshelf": {
                display: "Vine Shelf",
                family: containerCatVineshelfFamily
            },
            "_other": {
                "display": "Other",
                "family": containerCatOtherFamily
            }
        }
    },
    "items": {
        "main": {
            "display": "Items",
            "family": itemsEnabledFamily
        },
        "categories": {
            "_other": {
                "display": "Other",
                "family": itemsCatOtherFamily
            }
        }
    }
}

export function usePinGroupsValues(mapId, groupName) {
    const group = groups[groupName]
    const result = {
        "main": {
            "display": group.main.display,
            "state": useRecoilValue(group.main.family(mapId))
        },
        "categories": {}
    }

    const categories = group.categories

    for (const categoryName in categories) {
        const category = categories[categoryName];
        result.categories[categoryName] = {
            "display": category.display,
            // eslint-disable-next-line react-hooks/rules-of-hooks
            "state": useRecoilValue(category.family(mapId))
        }
    }

    return result
}

export function usePinGroupsStates(mapId, setStateTransform = (useState) => useState) {
    const result = {}

    const getterSetter = (atom) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [state, useState] = useRecoilState(atom)
        return {
            state: state,
            useState: setStateTransform(useState)
        }
    }

    for (const [groupName, group] of Object.entries(groups)) {
        const groupResult = {
            "main": {
                "display": group.main.display,
                ...getterSetter(group.main.family(mapId))
            },
            "categories": {}
        }

        const categories = group.categories

        for (const categoryName in categories) {
            const category = categories[categoryName];
            groupResult.categories[categoryName] = {
                "display": category.display,
                // eslint-disable-next-line react-hooks/rules-of-hooks
                ...getterSetter(category.family(mapId))
            }
        }

        result[groupName] = groupResult
    }

    return result
}