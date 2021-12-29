import React from "react";
import {Box, Tooltip} from "@mui/material";
import {ShowContainerModal} from "../../Details/Container";
import {ChipInChip} from "../../Misc/ChipInChip";

const xdiff = 128070.0;
const ydiff = 199108.0;
const ydiv = 1600.0;
const xdiv = 1599.99;


function LockedChip({container, ...props}) {
    if (container.locked) {
        if (container.key) {
            return <ChipInChip label={container.key} secondaryLabel="key" color="error"/>
        } else if (container.pickLock) {
            return <ChipInChip label={container.pickLock} secondaryLabel="combination" color="error"/>
        }
    }
    return null
}

export function MapPin({container, ...props}) {
    const calculatedX = (container.position.x + xdiff) / xdiv
    const calculatedY = (container.position.z + ydiff) / ydiv
    const showContainerModal = ShowContainerModal(container)

    return <Tooltip title={
        <Box sx={{
            gap: (theme) => theme.spacing(1),
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap"
        }}>
            <ChipInChip label={container.name} secondaryLabel="name"/>
            <ChipInChip label={container.type} secondaryLabel="type"/>
            <ChipInChip label={container.category} secondaryLabel="category"/>
            <LockedChip container={container}/>
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