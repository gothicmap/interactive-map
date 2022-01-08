import {useRecoilValue} from "recoil"
import {useEffect, useRef} from "react";

export const useRecoilValueRef = (selector, refUpdatedCallback) => {
    const recoilValue = useRecoilValue(selector)
    const ref = useRef(null)
    useEffect(() => {
        ref.current = recoilValue
        if(refUpdatedCallback) {
            refUpdatedCallback()
        }
    }, [recoilValue])

    return ref
}