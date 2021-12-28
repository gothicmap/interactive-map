import React from "react";
import {MapPin} from "./MapPin";
import mapImage from "../archolos_map.png";
import containers from "../containers.json";
import ScrollContainer from "react-indiana-drag-scroll";
import MapSettings from "./MapSettings";
import {Box, Button, IconButton} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {Offset} from "../Misc/Offset";

export function Map(props) {
    return <ScrollContainer
        className="MapArea"
        hideScrollbars={false}
        style={{
            width: "100%",
            height: "100%",
        }}>

        <div className="MapHolder" style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row"
        }}>
            <div className="Map" style={{
                margin: "auto",
                alignSelf: "center",
                width: "1024px",
                height: "1024px",
                minWidth: "1024px",
                minHeight: "1024px",
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
                    {
                        containers.map((container, i) => {
                            return (<MapPin pointScale={1} key={i} container={container}/>)
                        })
                    }
                </div>
            </div>
            {/*<Box className="ButtonsOverlay" style={{*/}
            {/*    position: "absolute",*/}
            {/*    width: "100%",*/}
            {/*    height: "100%",*/}
            {/*    display: "flex",*/}
            {/*    flexDirection: "row",*/}
            {/*    preventEvents: "none"*/}
            {/*}}>*/}
            {/*    <div className="ButtonsFirstRow" style={{*/}
            {/*        flexDirection: "row",*/}
            {/*        display: "flex",*/}
            {/*        flexGrow: 1000500,*/}
            {/*        pointerEvents: "none"*/}
            {/*    }}>*/}
            {/*        <MapSettings/>*/}
            {/*        <div style={{*/}
            {/*            flexGrow: 100500,*/}
            {/*            display: "flex",*/}
            {/*            pointerEvents: "none"*/}
            {/*        }}>*/}
            {/*            <Box sx={{*/}
            {/*                display: "flex",*/}
            {/*                flexDirection: "row",*/}
            {/*                margin: "0 0 auto auto"*/}
            {/*            }}>*/}
            {/*                <IconButton color="inherit" size="large" component="span" sx={{*/}
            {/*                    alignSelf: "end"*/}
            {/*                }}>*/}
            {/*                    <RemoveIcon/>*/}
            {/*                </IconButton>*/}
            {/*                <IconButton color="inherit" size="large" component="span" sx={{*/}
            {/*                    alignSelf: "end"*/}
            {/*                }}>*/}
            {/*                    <AddIcon/>*/}
            {/*                </IconButton>*/}
            {/*            </Box>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</Box>*/}
        </div>

    </ScrollContainer>
}