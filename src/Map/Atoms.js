import {atomFamily} from "recoil";

export const containersEnabledFamily = atomFamily({
  key: 'MapContainersEnabled',
  default: true,
});

export const scaleFamily = atomFamily({
  key: 'MapScale',
  default: 100,
});