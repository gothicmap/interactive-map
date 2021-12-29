import {atomFamily, selectorFamily} from "recoil";


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

export const containerCatGravesFamily = atomFamily({
    key: 'MapContainersCatGraves',
    default: true
});

export const containerCatOtherFamily = atomFamily({
    key: 'MapContainersCatOthers',
    default: true
});

export const scaleFamily = atomFamily({
    key: 'MapScale',
    default: 100
});