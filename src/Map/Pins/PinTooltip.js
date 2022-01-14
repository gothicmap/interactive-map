import {ChipInChip} from "../../Misc/ChipInChip";
import React from "react";
import {ContainerModalComponent} from "../../Details/Container";
import {ItemModalComponent} from "../../Details/Item";

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

export const PinTooltip = ({container}) => {
    if (container.type === "container") {
        return <>
            <ChipInChip label={container.name} secondaryLabel="name"/>
            <ChipInChip label={container.type} secondaryLabel="type"/>
            <ChipInChip label={container.category} secondaryLabel="category"/>
            <LockedChip container={container}/>
        </>
    } else if (container.type === "item") {
        return <>
            <ChipInChip label={container.name} secondaryLabel="name"/>
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