import React from "react";
import {Chip, Popover} from "@mui/material";

const xdiff = 128070.0;
const ydiff = 199108.0;
const ydiv = 1600.0;
const xdiv = 1599.99;

export class MapPin extends React.Component {
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