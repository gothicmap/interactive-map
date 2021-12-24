import React from "react";
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {MapPin} from "./MapPin";

import mapImage from "../archolos_map.png";
import containers from "../containers.json";

export class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {scale: 1};
    }

    handleZoom = (evt) => {
        this.setState((state, props) => {
            return {scale: 1 / evt.state.scale};
        });
    }

    render() {
        return <TransformWrapper minScale={1}
                                 initialScale={1}
                                 maxScale={3}
                                 centerOnInit={true}
                                 onInit={this.handleZoom}
                                 onZoomStop={this.handleZoom}
                                 alignmentAnimation={{
                                     disabled: true
                                 }}
                                 zoomAnimation={{
                                     disabled: true
                                 }}
                                 velocityAnimation={{
                                     disabled: true
                                 }}
                                 centerZoomedOut={false}
                                 panning={{
                                     velocityDisabled: true
                                 }}
        >

            <TransformComponent wrapperClass="MapArea" wrapperStyle={{
                width: "100%",
                height: "100%"
            }}>
                <img src={mapImage}/>
                {
                    containers.map((container, i) => {
                        // Return the element. Also pass key
                        return (<MapPin pointScale={this.state.scale} key={i} container={container}/>)
                    })
                }
            </TransformComponent>
        </TransformWrapper>
    }
}