import React from "react";
import {MapPin} from "./MapPin";
import mapImage from "../archolos_map.png";
import containers from "../containers.json";
import ScrollContainer from "react-indiana-drag-scroll";
import MapSettings from "./MapSettings";

export class Map extends React.Component {
    render() {
        return <ScrollContainer
            className="MapArea"
            hideScrollbars={false}
            style={{
                width: "100%",
                height: "100%",
            }}>
            <div className="ButtonsOverlay" style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                display: "flex",

            }}>
               <MapSettings/>
            </div>
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
                    backgroundSize: "cover"
                }}>
                    <div className="PinOverlay" style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                        top: 0,
                        right: 0
                    }}>
                        {
                            containers.map((container, i) => {
                                // Return the element. Also pass key
                                return (<MapPin pointScale={1} key={i} container={container}/>)
                            })
                        }
                    </div>
                </div>
            </div>
        </ScrollContainer>
    }
}