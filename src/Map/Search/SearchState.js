import {atomFamily, selectorFamily, useRecoilState, useRecoilValue} from "recoil";
import {EditorState} from "draft-js";

const contains = (source, target) => {
    if (source) {
        return source.toLowerCase().includes(target)
    }

    return false
}

const containerContains = (container, predicate, lang) => {
    for (const item of container.data.contains) {
        if (predicate.evaluate(item.item, lang)) {
            return true
        }
    }

    return false
}

const evaluatePin = (pin, itemPredicate, lang) => {
    if (pin.type === "container") {
        return containerContains(pin, itemPredicate, lang)
    } else {
        return itemPredicate.evaluate(pin.data, lang)
    }
}

export const SearchType = {
    Simple: 1,
    Query: 2
}

export const searchType = atomFamily({
    key: 'MapSearchType',
    default: SearchType.Simple
})

export const searchSimpleExpression = atomFamily({
    key: 'MapSearchSimpleExpression',
    default: ""
})

export const searchSimplePredicate = selectorFamily({
    key: 'MapSearchSimplePredicate',
    get: (mapId) => ({get, set}) => {
        const searchSimpleExpressionValue = get(searchSimpleExpression(mapId))

        if (!searchSimpleExpressionValue) {
            return {
                evaluate: (pin, lang) => {
                    return true
                }
            }
        }

        const predicate = {
            evaluate: (item, lang) => {
                return contains(item.name, searchSimpleExpressionValue)
            }
        }

        return {
            evaluate: (pin, lang) => {
                return evaluatePin(pin, predicate, lang)
            }
        }
    }
})

export const searchQueryExpression = atomFamily({
    key: 'MapSearchQueryExpression',
    default: EditorState.createEmpty()
})

export const searchQueryPredicate = atomFamily({
    key: 'MapSearchQueryPredicate',
    default: {
        evaluate: () => false
    }
})

export const searchPredicate = selectorFamily({
    key: 'MapSearchPredicate',
    get: (mapId) => ({get, set}) => {
        const searchTypeValue = get(searchType(mapId))

        switch (searchTypeValue) {
            case SearchType.Simple:
                return get(searchSimplePredicate(mapId))
            case SearchType.Query:
                const predicate = get(searchQueryPredicate(mapId))
                return {
                    evaluate: (pin, lang) => {
                        return evaluatePin(pin, predicate, lang)
                    }
                }
            default:
                throw new Error("unknown search type")
        }
    }
})

export const useClearCurrentExpression = (mapId) => {
    const searchTypeValue = useRecoilValue(searchType(mapId))
    const [, setSearchQueryExpression] = useRecoilState(searchQueryExpression(mapId))
    const [, setSearchSimpleExpression] = useRecoilState(searchSimpleExpression(mapId))

    return () => {
        switch (searchTypeValue) {
            case SearchType.Simple:
                return setSearchSimpleExpression("")
            case SearchType.Query:
                return setSearchQueryExpression(EditorState.createEmpty())
            default:
                throw new Error("unknown search type")
        }
    }
}