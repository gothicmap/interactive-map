import React from "react";
import {Box, IconButton, TextField, Tooltip} from "@mui/material";
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export const VectorInfo = (props) => {
    return <React.Fragment>
        <Box sx={{
            display: "flex",
            flexDirection: "row",
            gap: (theme) => theme.spacing(1),
        }}>
            <TextField
                label="x"
                InputProps={{
                    readOnly: true,
                }}
                size="small"
                defaultValue={props.vector.x}
            />
            <TextField
                label="y (height)"
                InputProps={{
                    readOnly: true,
                }}
                size="small"
                defaultValue={props.vector.y}
            />
            <TextField
                label="z"
                InputProps={{
                    readOnly: true,
                }}
                size="small"
                defaultValue={props.vector.z}
            />
            <CopyToClipboard
                text={`goto vob ${props.vector.x} ${props.vector.y} ${props.vector.z}`}>
                <Tooltip title="Copy marvin goto command to clipboard">
                    <IconButton color="primary" component="span">
                        <ContentCopyIcon/>
                    </IconButton>
                </Tooltip>
            </CopyToClipboard>
        </Box>
    </React.Fragment>
}