import React, {forwardRef} from "react";

import TextField from "@mui/material/TextField";

const InputComponent = forwardRef((props, ref) => {
    const {inputRef, ...other} = props
    return <div ref={ref} {...other} />
});

const Outline = forwardRef((props, ref) => {
    return (
        <TextField
            ref={ref}
            variant="outlined"
            label={props.label}
            size={props.size}
            multiline
            InputLabelProps={{shrink: true}}
            InputProps={{
                inputComponent: InputComponent
            }}
            inputProps={{children: props.children}}
        />
    );
});

export default Outline;