import {forwardRef, useImperativeHandle, useRef} from "react";
import {Box, InputBase, TextField} from "@mui/material";
import Editor from '@draft-js-plugins/editor';
import createSingleLinePlugin from 'draft-js-single-line-plugin'
import 'draft-js/dist/Draft.css';
const singleLinePlugin = createSingleLinePlugin()
const plugins = [singleLinePlugin]

const DraftInput = forwardRef(function DraftField(props, ref) {
    const {component: Component, editorRef, onChange, className, editorState, ...rest} = props;

    function myBlockStyleFn(contentBlock) {
        return rest.className
    }

    useImperativeHandle(ref, () => ({
        focus: () => {
            editorRef?.current?.focus();
        }
    }))

    return <Box
        className={className}
        sx={{
            overflow: "hidden"
        }}
    >
        <Box

            sx={{
                overflowX: "scroll",
                overflowY: "hidden",
                msOverflowStyle: "none",
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": {
                    display: "none"
                },
                "& .DraftEditor-root": {
                    display: "flex",
                    flexGrow: 1,
                    flexShrink: 1,
                },
                "& .DraftEditor-editorContainer, & .public-DraftEditor-content": {
                    display: "flex",
                    flexGrow: 1,
                    flexShrink: 1,
                },
                "& .public-DraftStyleDefault-block": {
                    height: "100%",
                    whiteSpace: "pre"
                }
            }}
        >
            <Component {...rest} ref={editorRef} onChange={onChange} editorState={editorState}
                       blockStyleFn={myBlockStyleFn}/>
        </Box>
    </Box>
});

export const DraftTextField = ({sx, editorState, onChange, placeholder, customStyleMap}) => {
    const editorRef = useRef(null);

    return (
        <InputBase
            fullWidth
            sx={{
                ...sx,
                overflow: "hidden"
            }}
            value={editorState.getCurrentContent().getPlainText('\u0001')}
            inputProps={{
                component: Editor,
                editorRef,
                editorState,
                placeholder,
                onChange: onChange,
                customStyleMap: customStyleMap,
                plugins: plugins,
                blockRenderMap: singleLinePlugin.blockRenderMap,
            }}
            inputComponent={DraftInput}
        />
    )
}