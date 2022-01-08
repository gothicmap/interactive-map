import React from 'react';
import './App.css';
import {AppBar, IconButton, ToggleButton, ToggleButtonGroup, Toolbar} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {MapContainer} from "./Map/MapContainer";
import Box from "@mui/material/Box";

export default class App extends React.Component {
    render = () => (
        <Box className="App" sx={{
            height: "100%",
            display: "flex",
            minWidth: "500px",
            flexDirection: "column"
        }}>
            <AppBar position="static" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}} className="Navbar">
                <Toolbar variant="dense" >
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <ToggleButtonGroup
                        color="primary"
                        value={"map"}
                        exclusive
                    >
                        <ToggleButton value="map">Map</ToggleButton>
                        <ToggleButton value="database">Database</ToggleButton>
                    </ToggleButtonGroup>
                </Toolbar>
            </AppBar>
            <MapContainer mapId="main"/>
        </Box>
    );
}
