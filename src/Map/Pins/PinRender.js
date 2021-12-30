import {usePinGroupsValues} from "../MapState";
import containers from "../../containers.json";
import items from "../../items.json";
import React from "react";
import {ContainerMapPin} from "./ContainerPin";
import {ItemMapPin} from "./ItemPin";

export function PinRender({mapId}) {
    const groups = usePinGroupsValues(mapId)

    const canRender = (category, group) => {
        const isOther = !(category in group.categories)
        if (isOther) {
            return group.categories._other.state
        } else {
            return group.categories[category].state
        }
    }

    const getGroupSpecificElements = (groupName) => {
        if (groupName === "containers") {
            return [containers, ContainerMapPin]
        } else if (groupName === "items") {
            return [items, ItemMapPin]
        }
    }

    return <> {
        Object.entries(groups).map(([groupName, groupStates]) => {
            const [groupPins, GroupItem] = getGroupSpecificElements(groupName)
            return <React.Fragment key={groupName}>
                {
                    groupStates.main.state &&
                    groupPins.map((pin, i) => {
                        if (canRender(pin.category, groupStates)) {
                            return <GroupItem key={pin.vobObjectID} pin={pin}/>
                        } else {
                            return null
                        }
                    })
                }
            </React.Fragment>
        })
    }
    </>
}