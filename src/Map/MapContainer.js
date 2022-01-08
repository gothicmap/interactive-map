import React from "react";
import MapSettings, {RenderContainerSettings} from "./MapSettings";
import {Box, Divider, IconButton, InputBase, Paper, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {useRecoilState, useRecoilValue} from "recoil";
import {mapPinsSearch, mapSettingsFamily, scaleFamily} from "./MapState"
import {Map} from "./Map";
import ClearIcon from '@mui/icons-material/Clear';

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function MapButtonsOverlay({...props}) {
    const [scale, setScale] = useRecoilState(scaleFamily(props.mapId))
    const [searchTerm, setSearchTerm] = useRecoilState(mapPinsSearch(props.mapId))
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
                top: (theme) => theme.spacing(2),
                display: "flex",
                height: "fit-content",
                width: "fit-content",
                alignItems: "center"
            }}
        >
            <InputBase sx={{ml: 1, flex: 1}} placeholder="search" value={searchTerm}
                       onChange={(evt) => setSearchTerm(evt.target.value)}/>
            <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
            <IconButton color="inherit" size="large" onClick={() => setSearchTerm("")}>
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
                display: "flex",
                flexDirection: "row",
                paddingLeft: (theme) => theme.spacing(1),
                alignItems: "center"
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
        position: "relative",
        display: "flex",
        flexGrow: 1000,
        minWidth: "500px",
        overflow: "hidden"
    }}>
        {showMapSettings && <Box sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: (theme) => theme.palette.background.paper,
            color: (theme) => theme.palette.text.primary
        }} className={"MapSettings"}>
            <RenderContainerSettings mapId={props.mapId}/>
        </Box>
        }
        <Box sx={{
            position: "relative",
            display: "flex",
            flexGrow: 1000,
            minWidth: "500px"
        }} className={"MapArea"}>
            <Map mapId={props.mapId}/>
            <MapButtonsOverlay mapId={props.mapId}/>
        </Box>
    </Box>
}