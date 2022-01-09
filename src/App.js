import './App.css';
import {AppBar, IconButton, ToggleButton, ToggleButtonGroup, Toolbar} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {MapContainer} from "./Map/MapContainer";
import Box from "@mui/material/Box";
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {Database} from "./Database/Database";

export const App = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const tabSelector = () => {
        if(location) {
            return location.pathname
        } else {
            return ""
        }
    }

    const handleRouteChange = (evt, newRoute) => {
        navigate(newRoute)
    }

    return <Box className="App" sx={{
            height: "100%",
            display: "flex",
            minWidth: "500px",
            flexDirection: "column"
        }}>
            <AppBar position="static" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}} className="Navbar">
                <Toolbar variant="dense">
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
                        value={tabSelector()}
                        onChange={handleRouteChange}
                        exclusive
                    >
                        <ToggleButton value="/map">Map</ToggleButton>
                        <ToggleButton value="/database">Database</ToggleButton>
                    </ToggleButtonGroup>
                </Toolbar>
            </AppBar>
            <Routes>
                <Route
                    path="/"
                    element={<Navigate to="/map" />}
                />
                <Route path="map" element={<MapContainer mapId="main"/>}/>
                <Route path="database" element={<Database/>}/>
            </Routes>

        </Box>
}
