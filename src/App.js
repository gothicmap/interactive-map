import React from 'react';
import './App.css';
import {Container, Nav, Navbar, OverlayTrigger, Tooltip} from 'react-bootstrap';
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";

import 'bootstrap/dist/css/bootstrap.min.css';

import containers from './containers.json'

const mapImage = require('./archolos_map.png');

const xdiff = 128070.0;
const ydiff = 199108.0;
const ydiv = 1600.0;
const xdiv = 1599.99;

class MapPin extends React.Component {
    get calculatedX() {
        return (this.props.x + xdiff) / xdiv
    }

    get calculatedY() {
        return (this.props.y + ydiff) / ydiv
    }

    render() {
        return <OverlayTrigger
            key={"auto"}
            placement={"auto"}
            overlay={
                <Tooltip>
                    {this.props.x} {this.props.y}
                </Tooltip>
            }
        >
            <div className="MapPin"
                 style={{
                     width: `10px`,
                     height: `10px`,
                     position: 'absolute',
                     top: `calc(${this.calculatedX}% - 5px)`,
                     left: `calc(${this.calculatedY}% - 5px)`,
                     transform: `scale(${this.props.pointSize}) translate3d( 0, 0, 0)`
                 }}
            />
        </OverlayTrigger>
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
                <Navbar bg="dark" variant="dark" style={{
                    display: "flex",
                    flexGrow: 1000
                }}>
                    <Container>
                        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
            <TransformWrapper minScale={1} initialScale={1} maxScale={3} centerOnInit={true} onInit={this.handleZoom}
                              onZoomStop={this.handleZoom}>
                <TransformComponent wrapperClass="MapArea" wrapperStyle={{
                    width: "100%",
                    height: "100%"
                }}>
                    <img src={mapImage}/>
                    {
                        containers.map((container, i) => {
                            // Return the element. Also pass key
                            return (<MapPin pointSize={this.state.scale} key={i} x={container.position.x}
                                            y={container.position.z}/>)
                        })
                    }
                </TransformComponent>
            </TransformWrapper>
        </div>
    );
}
