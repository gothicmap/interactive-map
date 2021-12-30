import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import SettingsIcon from '@mui/icons-material/Settings';
import {Checkbox, Collapse, FormControlLabel, FormGroup, IconButton, ListItemButton, Paper} from "@mui/material";
import {Offset} from "../Misc/Offset";
import {usePinGroupsStates} from "./MapState";
import {ExpandLess, ExpandMore} from "@mui/icons-material";


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

function RenderContainerSettings({mapId}) {
    const groups = usePinGroupsStates(mapId, transformToCheckBoxCallback)

    return <>
        {
            Object.entries(groups).map(([groupName, groupStates]) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const [subOpen, setSubOpen] = React.useState(true);
                const handleSubOpenClick = () => {
                    setSubOpen(!subOpen);
                };
                return <List key={groupName}
                             sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
                             component="nav"
                >
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
    const [settingsOpen, setSettingsOpen] = React.useState(false);

    const toggleSettings = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setSettingsOpen(open);
    };

    return (
        <Paper className="MapSettings" {...rest}>
            <IconButton onClick={toggleSettings(true)} color="inherit" size="large" component="span">
                <SettingsIcon/>
            </IconButton>
            <Drawer
                anchor={"left"}
                open={settingsOpen}
                onClose={toggleSettings(false)}
            >
                <Offset/>
                <RenderContainerSettings mapId={mapId}/>
            </Drawer>
        </Paper>
    )
}