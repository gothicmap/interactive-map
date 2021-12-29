import React from "react";
import {MapPin} from "./MapPin";
import mapImage from "../archolos_map.png";
import containers from "../containers.json";
import ScrollContainer from "react-indiana-drag-scroll";
import MapSettings from "./MapSettings";
import {Box, IconButton, Paper, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {useRecoilState, useRecoilValue} from "recoil";
import {containersEnabledFamily, scaleFamily} from "./Atoms"

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function MapButtonsOverlay({...props}) {
    const [scale, setScale] = useRecoilState(scaleFamily(props.mapId));

    return <>
        <MapSettings mapId={props.mapId} elevation={3} sx={{
            position: "absolute",
            left: (theme) => theme.spacing(2),
            top: (theme) => theme.spacing(2),
            height: "fit-content",
            width: "fit-content",
        }}/>
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

export function Map(props) {
    const scale = useRecoilValue(scaleFamily(props.mapId));
    const containersEnabled = useRecoilValue(containersEnabledFamily(props.mapId));

    return <Box className="Map" sx={{
        position: "relative",
        display: "flex",
        flexGrow: 1000,
        overflow: "hidden"
    }}>
        <ScrollContainer
            className="MapScroller"
            hideScrollbars={false}
            style={{
                flexDirection: "row",
                flexGrow: 1000,
            }}>
            <div className="Map" style={{
                margin: "auto",
                alignSelf: "center",
                width: `calc(1024px * ${scale / 100.0})`,
                height: `calc(1024px * ${scale / 100.0})`,
                minWidth: `calc(1024px * ${scale / 100.0})`,
                minHeight: `calc(1024px * ${scale / 100.0})`,
                backgroundImage: `url(${mapImage})`,
                backgroundColor: "transparent",
                backgroundSize: "cover"
            }}>
                <div className="PinOverlay" style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "transparent",
                    top: 0,
                    right: 0
                }}>
                    { containersEnabled &&
                        containers.map((container, i) => {
                            return (<MapPin pointScale={1} key={i} container={container}/>)
                        })
                    }
                </div>
            </div>
        </ScrollContainer>
        <MapButtonsOverlay mapId={props.mapId}/>
    </Box>
}