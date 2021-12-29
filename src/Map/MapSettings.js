import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import SettingsIcon from '@mui/icons-material/Settings';
import {Checkbox, FormControlLabel, FormGroup, IconButton, Paper} from "@mui/material";
import {Offset} from "../Misc/Offset";
import {useRecoilState} from "recoil";
import {containersEnabledFamily} from "./Atoms";

export default function MapSettings({...rest}) {
    const [containersEnabled, setContainersEnabled] = useRecoilState(containersEnabledFamily(rest.mapId));
    const [state, setState] = React.useState({
        left: false
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [anchor]: open});
    };

    const handleCheckboxChange = (evt) => {
        setContainersEnabled(evt.target.checked)
    }
    const list = () => (
        <Box
            role="presentation"
        >
            <List>
                <ListItem>
                    <FormGroup role="presentation">
                        <FormControlLabel control={<Checkbox checked={containersEnabled}
                                                             onChange={handleCheckboxChange}/>} label="Chests"/>
                        {/*<FormControlLabel control={<Checkbox defaultChecked/>} label="Weapons"/>*/}
                        {/*<FormControlLabel control={<Checkbox defaultChecked/>} label="Herbs"/>*/}
                        {/*<FormControlLabel control={<Checkbox defaultChecked/>} label="Food"/>*/}
                        {/*<FormControlLabel control={<Checkbox defaultChecked/>} label="Misc"/>*/}
                    </FormGroup>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Paper className="MapSettings" {...rest}>
            <IconButton onClick={toggleDrawer("left", true)} color="inherit" size="large" component="span">
                <SettingsIcon/>
            </IconButton>
            <Drawer
                anchor={"left"}
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
            >
                <Offset/>
                {list()}
            </Drawer>
        </Paper>
    )
}