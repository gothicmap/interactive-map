import React from "react";
import {ShowContainerModal} from "../../Details/Container";
import {ChipInChip} from "../../Misc/ChipInChip";
import {MapPin} from "./MapPin";


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

export function ContainerMapPin({pin, ...props}) {
    const tooltip = <>
        <ChipInChip label={pin.name} secondaryLabel="name"/>
        <ChipInChip label={pin.type} secondaryLabel="type"/>
        <ChipInChip label={pin.category} secondaryLabel="category"/>
        <LockedChip container={pin}/>
    </>
    return <MapPin pin={pin} tooltip={tooltip} modal={ShowContainerModal} {...props}/>
}