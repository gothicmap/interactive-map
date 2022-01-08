import * as React from 'react';
import List from '@mui/material/List';
import SettingsIcon from '@mui/icons-material/Settings';
import {Checkbox, Collapse, FormControlLabel, FormGroup, IconButton, ListItemButton, Paper} from "@mui/material";
import {mapSettingsFamily, usePinGroupsStates} from "./MapState";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {useRecoilState} from "recoil";


const FormCheckbox = ({label, ...props}) => {
    return <FormControlLabel control={<Checkbox {...props}/>}
                             label={label}/>
}


const transformToCheckBoxCallback = (useState) => {
    const handleCheckboxEvt = (evt) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useState(evt.target.checked)
    }

    return handleCheckboxEvt
}

export function RenderContainerSettings({mapId}) {
    const groups = usePinGroupsStates(mapId, transformToCheckBoxCallback)

    return <>
        {
            Object.entries(groups).map(([groupName, groupStates]) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const [subOpen, setSubOpen] = React.useState(true);
                const handleSubOpenClick = () => {
                    setSubOpen(!subOpen);
                };
                return <List key={groupName}>
                    <ListItemButton>
                        <FormCheckbox label={groupStates.main.display} checked={groupStates.main.state}
                                      onChange={groupStates.main.useState}/>
                        {subOpen ? <ExpandLess onClick={handleSubOpenClick}/> :
                            <ExpandMore onClick={handleSubOpenClick}/>}
                    </ListItemButton>
                    <Collapse in={subOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <FormGroup sx={{pl: 4}}>
                                {
                                    Object.entries(groupStates.categories).map(([categoryName, category]) => {
                                            return <FormCheckbox key={categoryName} label={category.display}
                                                                 checked={category.state}
                                                                 onChange={category.useState}/>
                                        }
                                    )
                                }
                            </FormGroup>
                        </List>
                    </Collapse>
                </List>
            })
        }
    </>
}


export default function MapSettings({mapId, ...rest}) {
    const [showMapSettings, setShowMapSettings] = useRecoilState(mapSettingsFamily(mapId))

    const flipShowMapSettings = () => {
        setShowMapSettings(!showMapSettings)
    }

    return (
        <Paper className="MapSettings" {...rest}>
            <IconButton onClick={flipShowMapSettings} color="inherit" size="large" component="span">
                <SettingsIcon/>
            </IconButton>
        </Paper>
    )
}