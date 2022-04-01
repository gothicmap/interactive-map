import {atom} from "recoil";
import {recoilPersist} from "recoil-persist";

const persistAtom = recoilPersist()

export const PinColors = {
    "container": "#2f4f4f",
    "plant": "#2e8b57",
    "potions": "#800000",
    "food": "#808000",
    "scroll": "#00008b",
    "misc": "#ff0000",
    "magic": "#ff8c00",
    "key": "#ffff00",
    "ammunition": "#7cfc00",
    "melee weapon": "#ba55d3",
    "rune": "#00ffff",
    "package": "#00bfff",
    "docs": "#0000ff",
    "trophy": "#ff00ff",
    "crafting material": "#fa8072",
    "range weapon": "#dda0dd",
    "recipe": "#ff1493",
    "armor": "#98fb98",
    "important": "#ffe4c4"
}