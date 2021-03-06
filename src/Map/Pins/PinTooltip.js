import {ChipInChip} from "../../Misc/ChipInChip";
import React from "react";
import {ContainerModalComponent} from "../../Details/Container";
import {ItemModalComponent} from "../../Details/Item";
import {Chip} from "@mui/material";

function LockedChip({container, ...props}) {
    if (container.data.locked) {
        if (container.data.key) {
            return <Chip label="key" color="error" size="small"/>
        } else if (container.data.pickLock) {
            return <Chip label="pick lock" color="error" size="small"/>
        }
    }
    return null
}

export const PinTooltip = ({container}) => {
    if (container.type === "container") {
        return <>
            <ChipInChip label={container.data.name} secondaryLabel="name"/>
            {
                container.data.flags.map(
                    (flag, idx) => {
                        return <Chip key={idx} label={flag} color="secondary" size="small"/>
                    }
                )
            }
            <LockedChip container={container}/>
        </>
    } else if (container.type === "item") {
        return <>
            <ChipInChip label={container.data.name} secondaryLabel="name"/>
            {
                container.data.flags.map(
                    (flag, idx) => {
                        return <Chip key={idx} label={flag} color="secondary" size="small"/>
                    }
                )
            }
        </>
    }

    return null
}

export const ShowPinModal = (mapId, pin, showModal) => {
    if (pin.type === "container") {
        const modal = showModal(
            ContainerModalComponent,
            {
                pin: pin,
                mapId: mapId,
                closeModal: () => {
                    modal.hide();
                }
            }
        )
    } else if (pin.type === "item") {
        const modal = showModal(
            ItemModalComponent,
            {
                pin: pin,
                mapId: mapId,
                closeModal: () => {
                    modal.hide();
                }
            }
        )
    }
}