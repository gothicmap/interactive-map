import {atom} from "recoil";

export const langs = ["en", "ru"]

export const langAtom = atom({
    key: 'appLangAtom',
    default: "en",
})