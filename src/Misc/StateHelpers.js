import {useRecoilState, useRecoilValue} from "recoil"
import {useEffect, useRef} from "react";

export const useRecoilValueRef = (selector, refUpdatedCallback) => {
    const recoilValue = useRecoilValue(selector)
    const ref = useRef(null)
    useEffect(() => {
        ref.current = recoilValue
        if (refUpdatedCallback) {
            refUpdatedCallback()
        }
    }, [recoilValue])

    return ref
}

export const useRecoilStateEx = (selector, updatedCallback, setReducer) => {
    const [state, setState] = useRecoilState(selector)

    useEffect(() => {
        if (updatedCallback) {
            updatedCallback(state)
        }
    }, [state])

    const setStateProxy = (newState) => {
        if(setReducer) {
            setState(setReducer(newState))
        } else {
            setState(newState)
        }
    }

    return [state, setStateProxy]
}


export const useRefObj = (createInitialFunc) => {
    const ref = useRef(null)

    if(ref.current === null) {
        ref.current = createInitialFunc()
    }

    return ref.current
}