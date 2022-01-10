import './App.css';
import {
    AppBar,
    FormControl,
    IconButton,
    InputLabel, MenuItem,
    Select,
    ToggleButton,
    ToggleButtonGroup,
    Toolbar
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {MapContainer} from "./Map/MapContainer";
import Box from "@mui/material/Box";
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {DatabaseVirtualized} from "./Database/DatabaseVirtualized";
import {useRecoilState} from "recoil";
import {langAtom} from "./AppState";
import {Suspense} from "react";
import {Loading} from "./Misc/Loading";

export const App = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [lang, setLang] = useRecoilState(langAtom)
    const tabSelector = () => {
        if (location) {
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
                    sx={{
                        flexGrow: 1
                    }}
                >
                    <ToggleButton value="/map">Map</ToggleButton>
                    <ToggleButton value="/database">Database</ToggleButton>
                </ToggleButtonGroup>
                <FormControl size={"small"} sx={{
                    marginTop: (theme) => theme.spacing(0.5)
                }}>
                    <InputLabel>language</InputLabel>
                    <Select
                        value={lang}
                        label="language"
                        onChange={(evt) => setLang(evt.target.value)}
                    >
                        <MenuItem value={"en"}>English</MenuItem>
                        <MenuItem value={"ru"}>Русский</MenuItem>
                    </Select>
                </FormControl>
            </Toolbar>
        </AppBar>
        <Routes>
            <Route
                path="/"
                element={<Navigate to="/map"/>}
            />
            <Route path="map" element={<MapContainer mapId="main"/>}/>
            <Route path="database" element={<Suspense fallback={<Loading/>}><DatabaseVirtualized/></Suspense>}/>
        </Routes>

    </Box>
}
