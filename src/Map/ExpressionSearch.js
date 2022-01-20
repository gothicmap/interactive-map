import {DECIMAL, IDENTIFIER, OPERATOR, STRING} from "../Expression/constants";
import Modifier from "draft-js/lib/DraftModifier";
import {EditorState, RichUtils} from "draft-js";
import {parseExpression} from "../Expression/ExpressionParser";
import {useRecoilState, useRecoilValue} from "recoil";
import {mapPinsSearch, searchExpressionFamily} from "./MapState";
import ContentState from "draft-js/lib/ContentState";
import {useState} from "react";
import {DraftTextField} from "../Misc/DraftTextField";

const styleMap = {
    [OPERATOR]: {
        color: '#AB7832',
    },
    [STRING]: {
        color: '#6A8759',
    },
    [IDENTIFIER]: {
        color: '#A2B7BD',
    },
    [DECIMAL]: {
        color: '#6897BB',
    },
    "FONT_30": {
        fontSize: "30px"
    }
};

const cleanupStyles = (editorState) => {
    const currentContent = editorState.getCurrentContent();

    const previousSelection = editorState.getSelection()
    const allSelection = previousSelection.merge({
        anchorKey: currentContent.getFirstBlock().getKey(),
        anchorOffset: 0,

        focusOffset: currentContent.getLastBlock().getText().length,
        focusKey: currentContent.getLastBlock().getKey(),
    })

    const newContent = Object.keys(styleMap)
        .reduce((contentState, style) => {
            return Modifier.removeInlineStyle(
                contentState,
                allSelection,
                style
            );
        }, editorState.getCurrentContent());

    // let fontContent = Modifier.applyInlineStyle(newContent, allSelection, "FONT_30")
    editorState = EditorState.set(editorState, {currentContent: newContent})

    return EditorState.forceSelection(editorState, previousSelection)
}


const applyStyles = (editorState, styles) => {
    const previousSelection = editorState.getSelection()

    for (const style of styles) {
        const styleSelection = previousSelection.merge({
            anchorOffset: style.start,
            focusOffset: style.stop + 1
        })
        const stateWithStyleSelection = EditorState.forceSelection(editorState, styleSelection);
        editorState = RichUtils.toggleInlineStyle(stateWithStyleSelection, style.type)
    }

    return EditorState.acceptSelection(
        editorState,
        previousSelection
    )
}



export const ExpressionSearch = ({mapId, sx}) => {
    const [searchTerm, setSearchTerm] = useRecoilState(mapPinsSearch(mapId))
    const [editorState, setEditorState] = useState(() => EditorState.createWithContent(ContentState.createFromText("")));

    const handleOnChange = (newEditorState) => {
        const focus = newEditorState.getSelection()
        const text = newEditorState.getCurrentContent().getPlainText('\u0001')
        setSearchTerm(text)
        const {highlight} = parseExpression(text)
        const newStyle = applyStyles(cleanupStyles(newEditorState), highlight)
        setEditorState(EditorState.acceptSelection(newStyle, focus))
    };

    return <DraftTextField sx={{...sx}} customStyleMap={styleMap} onChange={handleOnChange} editorState={editorState}/>
}