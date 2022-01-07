import React from 'react';
import './App.css';
import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {MapContainer} from "./Map/MapContainer";
import {Offset} from "./Misc/Offset";
import Box from "@mui/material/Box";

export default class App extends React.Component {
    render = () => (
        <Box className="App" sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column"
        }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} className="Navbar">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Offset/>
            <MapContainer mapId="main" />
        </Box>
    );
}
