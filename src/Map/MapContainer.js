import React from "react";
import MapSettings, {RenderContainerSettings} from "./MapSettings";
import {Box, Divider, IconButton, Paper, ToggleButton, ToggleButtonGroup, Tooltip, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {useRecoilState, useRecoilValue} from "recoil";
import {mapSettingsFamily, scaleFamily} from "./MapState"
import {Map} from "./Map";
import ClearIcon from '@mui/icons-material/Clear';
import darkScrollbar from "@mui/material/darkScrollbar";
import {QuerySearch} from "./Search/QuerySearch";
import {SimpleSearch} from "./Search/SimpleSearch";
import {SearchType, searchType, useClearCurrentExpression} from "./Search/SearchState";

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);


const SearchField = ({mapId}) => {
    const searchTypeValue = useRecoilValue(searchType(mapId))
    switch (searchTypeValue) {
        case SearchType.Simple:
            return <SimpleSearch mapId={mapId}/>
        case SearchType.Query:
            return <QuerySearch mapId={mapId}/>
        default:
            throw new Error("unknown search type")
    }
}

function MapButtonsOverlay({...props}) {
    const [scale, setScale] = useRecoilState(scaleFamily(props.mapId))
    const [searchTypeValue, setSearchType] = useRecoilState(searchType(props.mapId))
    const clearCurrentExpression = useClearCurrentExpression(props.mapId)

    return <>
        <MapSettings mapId={props.mapId} elevation={3} sx={{
            position: "absolute",
            left: (theme) => theme.spacing(2),
            top: (theme) => theme.spacing(2),
            height: "fit-content",
            width: "fit-content",
        }}/>
        <Paper
            sx={{
                position: "absolute",
                marginRight: "auto",
                marginLeft: "auto",
                left: 0,
                right: 0,
                maxWidth: "60%",
                top: (theme) => theme.spacing(2),
                display: "flex",
                height: "fit-content",
                width: "fit-content",
                alignItems: "center"
            }}
        >
            <ToggleButtonGroup
                color="primary"
                value={searchTypeValue}
                exclusive
                onChange={(_, newType) => newType && setSearchType(newType)}
            >
                <ToggleButton value={SearchType.Simple}>
                    <Tooltip title={"Show all items which name contains given text."}>
                        <span>S</span>
                    </Tooltip>
                </ToggleButton>
                <ToggleButton value={SearchType.Query}>
                    <Tooltip title={"Complex search using boolean expression."}>
                        <span>Q</span>
                    </Tooltip>
                </ToggleButton>
            </ToggleButtonGroup>
            <Box sx={{
                flexGrow: 100,
                minWidth: "200px",
                display: "flex",
            }}>
                <SearchField mapId={props.mapId}/>
            </Box>
            <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
            <IconButton color="inherit" size="large" onClick={clearCurrentExpression}>
                <ClearIcon/>
            </IconButton>
        </Paper>
        <Box className="ScaleControls" sx={{
            display: "flex",
            position: "absolute",
            right: (theme) => theme.spacing(2),
            top: (theme) => theme.spacing(2),
            height: "fit-content",
            width: "fit-content"
        }}>
            <Paper elevation={3} sx={{
                display: "flex", flexDirection: "row", paddingLeft: (theme) => theme.spacing(1), alignItems: "center"
            }}>
                <Typography textAlign="center">{scale}%</Typography>
                <IconButton onClick={() => setScale(clamp(scale - 20, 60, 260))} color="inherit" size="large"
                            component="span"
                            sx={{
                                alignSelf: "end"
                            }}>
                    <RemoveIcon/>
                </IconButton>
                <IconButton onClick={() => setScale(clamp(scale + 20, 60, 260))} color="inherit" size="large"
                            component="span"
                            sx={{
                                alignSelf: "end"
                            }}>
                    <AddIcon/>
                </IconButton>
            </Paper>
        </Box>
    </>
}

export function MapContainer(props) {
    const showMapSettings = useRecoilValue(mapSettingsFamily(props.mapId))
    return <Box className="MapContainer" sx={{
        position: "relative", display: "flex", flexGrow: 1000, minWidth: "500px", overflow: "hidden"
    }}>
        {showMapSettings && <Paper sx={{
            display: "flex", flexDirection: "column", borderRadius: '0px', overflowY: "auto", ...darkScrollbar()
        }} className={"MapSettings"}>
            <RenderContainerSettings mapId={props.mapId}/>
        </Paper>}
        <Box sx={{
            position: "relative", display: "flex", flexGrow: 1000, minWidth: "500px"
        }} className={"MapArea"}>
            <Map mapId={props.mapId}/>
            <MapButtonsOverlay mapId={props.mapId}/>
        </Box>
    </Box>
}