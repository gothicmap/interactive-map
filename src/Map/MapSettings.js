import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import SettingsIcon from '@mui/icons-material/Settings';
import {
    Checkbox, Collapse,
    FormControlLabel,
    FormGroup,
    IconButton,
    ListItemButton,
    ListItemText,
    ListSubheader,
    Paper
} from "@mui/material";
import {Offset} from "../Misc/Offset";
import {atomFamily, useRecoilState} from "recoil";
import {
    containersEnabledFamily,
    containerCatCorpsesFamily,
    containerCatChestsFamily, containerCatOtherFamily, containerCatGravesFamily
} from "./Atoms";
import {ExpandLess, ExpandMore} from "@mui/icons-material";


const FormCheckbox = ({label, ...props}) => {
    return <FormControlLabel control={<Checkbox {...props}/>}
                             label={label}/>
}


const useRecoilStateCheckboxWrapper = (atom) => {
    const [state, setState] = useRecoilState(atom);

    const handleCheckboxEvt = (evt) => {
        setState(evt.target.checked)
    }

    return [state, handleCheckboxEvt]
}

export default function MapSettings({...rest}) {
    const [containersEnabled, handleContainersEnabled] = useRecoilStateCheckboxWrapper(containersEnabledFamily(rest.mapId));
    const [contCatCorpses, handleContCatCorpses] = useRecoilStateCheckboxWrapper(containerCatCorpsesFamily(rest.mapId));
    const [contCatChests, handleContCatChests] = useRecoilStateCheckboxWrapper(containerCatChestsFamily(rest.mapId));
    const [contCatGraves, handleContCatGraves] = useRecoilStateCheckboxWrapper(containerCatGravesFamily(rest.mapId));
    const [contCatOther, handleContCatOther] = useRecoilStateCheckboxWrapper(containerCatOtherFamily(rest.mapId));

    const [settingsOpen, setSettingsOpen] = React.useState(false);

    const toggleSettings = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setSettingsOpen(open);
    };

    const [containersCatOpen, setContainersCatOpen] = React.useState(true);
    const handleContainerCatClick = () => {
        setContainersCatOpen(!containersCatOpen);
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
                <List
                    sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Map Options
                        </ListSubheader>
                    }
                >
                    <ListItemButton>
                        <FormCheckbox label="Containers" checked={containersEnabled}
                                      onChange={handleContainersEnabled}/>
                        {containersCatOpen ? <ExpandLess onClick={handleContainerCatClick}/> :
                            <ExpandMore onClick={handleContainerCatClick}/>}
                    </ListItemButton>
                    <Collapse in={containersCatOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <FormGroup sx={{pl: 4}}>
                                <FormCheckbox label="Chests" checked={contCatChests}
                                              onChange={handleContCatChests}/>
                                <FormCheckbox label="Corpses" checked={contCatCorpses}
                                              onChange={handleContCatCorpses}/>
                                <FormCheckbox label="Graves" checked={contCatGraves}
                                              onChange={handleContCatGraves}/>
                                <FormCheckbox label="Other" checked={contCatOther}
                                              onChange={handleContCatOther}/>
                            </FormGroup>
                        </List>
                    </Collapse>
                </List>
            </Drawer>
        </Paper>
    )
}