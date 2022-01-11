import {atom} from "recoil";
import {recoilPersist} from "recoil-persist";

const {persistAtom} = recoilPersist()
export const langs = ["en", "ru"]

export const langAtom = atom({
    key: 'appLangAtom',
    default: "en",
    effects_UNSTABLE: [persistAtom]
})