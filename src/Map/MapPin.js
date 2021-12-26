import React from "react";
import {Box, Chip, Tooltip} from "@mui/material";
import {ShowContainerModal} from "../Details/Container";

const xdiff = 128070.0;
const ydiff = 199108.0;
const ydiv = 1600.0;
const xdiv = 1599.99;

export function MapPin(props) {
    const calculatedX = (props.container.position.x + xdiff) / xdiv
    const calculatedY = (props.container.position.z + ydiff) / ydiv
    const showContainerModal = ShowContainerModal(props.container)
    if (props.container.locked) {
        var locketText = "Locked"
        if (props.container.key) {
            locketText = locketText + " : " + props.container.key
        }
        if (props.container.combination) {
            locketText = locketText + " : " + props.container.combination
        }
    }


    return <Tooltip title={
        <Box sx={{
            gap: (theme) => theme.spacing(1),
            display: "flex",
            flexDirection: "row"
        }}>
            <Chip label="Container" color="primary" size="small"/>
            {props.container.locked && <Chip label={locketText} size="small" color="error"/>}
        </Box>
    }>
        <div className="MapPin"
             style={{
                 width: `10px`,
                 height: `10px`,
                 position: 'absolute',
                 top: `calc(${calculatedX}% - 5px)`,
                 left: `calc(${calculatedY}% - 5px)`,
                 caretColor: "transparent"
             }}
             onClick={showContainerModal}
        />
    </Tooltip>
}