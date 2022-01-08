import {ChipInChip} from "../../Misc/ChipInChip";
import React from "react";
import {ContainerModalComponent, ShowContainerModal} from "../../Details/Container";

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

export const PinTooltip = ({pin}) => {
    if (pin.type === "container") {
        return <>
            <ChipInChip label={pin.name} secondaryLabel="name"/>
            <ChipInChip label={pin.type} secondaryLabel="type"/>
            <ChipInChip label={pin.category} secondaryLabel="category"/>
            <LockedChip container={pin}/>
        </>
    } else if (pin.type === "item") {
        return <>
            <ChipInChip label={pin.name} secondaryLabel="name"/>
        </>
    }

    return null
}

export const ShowPinModal = (pin, showModal) => {
    if (pin.type === "container") {
        const modal = showModal(ContainerModalComponent, {
            container: pin, closeModal: () => {
                modal.hide();
            }
        })
    }
}