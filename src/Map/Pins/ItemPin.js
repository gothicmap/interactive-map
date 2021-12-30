import React from "react";
import {ChipInChip} from "../../Misc/ChipInChip";
import {MapPin} from "./MapPin";


export function ItemMapPin({pin, ...props}) {
    const tooltip = <>
        <ChipInChip label={pin.name} secondaryLabel="name"/>
    </>

    return <MapPin pin={pin} tooltip={tooltip} modal={()=>{}}/>
}