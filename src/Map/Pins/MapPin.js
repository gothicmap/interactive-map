import React from "react";
import {Box, Tooltip} from "@mui/material";

const xdiff = 128070.0;
const ydiff = 199108.0;
const ydiv = 1600.0;
const xdiv = 1599.99;

export function MapPin({pin, tooltip, modal, ...props}) {
    const calculatedX = (pin.position.x + xdiff) / xdiv
    const calculatedY = (pin.position.z + ydiff) / ydiv
    const showContainerModal = modal(pin)

    return <Tooltip {...props} title={
        <Box sx={{
            gap: (theme) => theme.spacing(1),
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap"
        }}>
            {tooltip}
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