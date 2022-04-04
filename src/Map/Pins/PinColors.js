import {atom} from "recoil";
import {recoilPersist} from "recoil-persist";

const {persistAtom} = recoilPersist()

const PinColors = {
    "container": "#00ff00",
    "plant": "#00ff00",
    "potions": "#00ff00",
    "food": "#00ff00",
    "scroll": "#00ff00",
    "misc": "#00ff00",
    "magic": "#00ff00",
    "key": "#00ff00",
    "ammunition": "#00ff00",
    "melee weapon": "#00ff00",
    "rune": "#00ff00",
    "package": "#00ff00",
    "docs": "#00ff00",
    "trophy": "#00ff00",
    "crafting material": "#00ff00",
    "range weapon": "#00ff00",
    "recipe": "#00ff00",
    "armor": "#00ff00",
    "important": "#00ff00"
}

export const PinColorsAtom = atom({
    key: "PinColorsAtom",
    default: PinColors,
    effects_UNSTABLE: [persistAtom]
})

export const HighlightColorAtom = atom({
    key: "PinColorHighlightAtom",
    default: "#ff0000",
    effects_UNSTABLE: [persistAtom]
})

export const VisitedColorAtom = atom({
    key: "PinColorVisitedAtom",
    default: "#ffff00",
    effects_UNSTABLE: [persistAtom]
})
