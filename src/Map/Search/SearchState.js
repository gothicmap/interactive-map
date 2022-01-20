import {atomFamily, selectorFamily, useRecoilState, useRecoilValue} from "recoil";
import {EditorState} from "draft-js";

const contains = (source, target) => {
    if (source) {
        return source.toLowerCase().includes(target)
    }

    return false
}

const containerContains = (probablyContainer, target) => {
    if (probablyContainer.type === "container") {
        for (const item of probablyContainer.contains) {
            if (contains(item.name, target)) {
                return true
            }
        }
    } else {
        return false
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

        return {
            evaluate: (item) => {
                return contains(item.name, searchSimpleExpressionValue) || containerContains(item, searchSimpleExpressionValue)
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
                return get(searchQueryPredicate(mapId))
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