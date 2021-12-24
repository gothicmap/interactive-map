import React from 'react';
import './App.css';
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";

import containers from './containers.json'
import {AppBar, Button, Chip, IconButton, Popover, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

const mapImage = require('./archolos_map.png');

const xdiff = 128070.0;
const ydiff = 199108.0;
const ydiv = 1600.0;
const xdiv = 1599.99;

class MapPin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchor: null
        };
    }

    get calculatedX() {
        return (this.props.container.position.x + xdiff) / xdiv
    }

    get calculatedY() {
        return (this.props.container.position.z + ydiff) / ydiv
    }

    render() {
        return <div className="MapPin"
                    style={{
                        width: `10px`,
                        height: `10px`,
                        position: 'absolute',
                        top: `calc(${this.calculatedX}% - 5px)`,
                        left: `calc(${this.calculatedY}% - 5px)`,
                        transform: `scale(${this.props.pointScale}) translate3d( 0, 0, 0)`
                    }}
                    onMouseEnter={(event) => {
                        this.setState({anchor: event.currentTarget})
                    }}
                    onMouseLeave={() => {
                        this.setState({anchor: null})
                    }}
        >
            <Popover
                sx={{
                    pointerEvents: 'none',
                }}
                open={this.state.anchor != null}
                anchorEl={this.state.anchor}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={() => {
                    this.setState({anchor: null})
                }}
                disableRestoreFocus
            >
                <div style={{
                    margin: 3
                }}>
                    <Chip label="Container" color="primary" size="small"/>
                    {this.props.container.locked && <Chip label="Locked" size="small" color="error"/>}
                </div>
            </Popover>
        </div>
    }
}

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {scale: 1};
        // this.onZoom = this.onZoom.bind(this)
        this.handleZoom = this.handleZoom.bind(this)
    }

    handleZoom(evt) {
        console.log(evt.state.scale)
        this.setState((state, props) => {
            return {scale: 1 / evt.state.scale};
        });
    }

    render = () => (
        <div className="App">
            <div className="Navbar">
                <AppBar position="static">
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
            </div>
            <TransformWrapper minScale={1}
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
        </div>
    );
}
