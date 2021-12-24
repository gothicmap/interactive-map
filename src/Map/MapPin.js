import React from "react";
import {Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Popover, TextField} from "@mui/material";

const xdiff = 128070.0;
const ydiff = 199108.0;
const ydiv = 1600.0;
const xdiv = 1599.99;

const infoStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    p: 4,
};

export class MapPin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchor: null,
            infoOpened: false
        };
    }

    get content() {
        const result = [];
        const items = this.props.container.content.split(",");
        items.forEach((element) => {
            let consoleId;
            let count;
            [consoleId, count] = element.split(":")
            if (consoleId === undefined || consoleId === "") {
                return
            }
            if (count === undefined) {
                count = "1"
            }
            result.push({
                consoleId: consoleId.trim(),
                count: count.trim()
            })
        })
        return result
    }

    get calculatedX() {
        return (this.props.container.position.x + xdiff) / xdiv
    }

    get calculatedY() {
        return (this.props.container.position.z + ydiff) / ydiv
    }

    openModal = () => {
        this.setState({
            infoOpened: true,
            anchor: null
        })
    }

    closeModal = () => {
        this.setState({
            infoOpened: false
        })
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
            // onClick={this.openModal}
        >
            <div onClick={this.openModal} style={{
                width: "100%",
                height: "100%"
            }}/>
            <Dialog
                open={this.state.infoOpened}
                onClose={this.closeModal}
            >
                <DialogTitle>Container</DialogTitle>
                <DialogContent style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: "5px",
                    gap: "3px"
                }}>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "3px"
                    }}>
                        <TextField
                            label="x"
                            InputProps={{
                                readOnly: true,
                            }}
                            size="small"
                            defaultValue={this.props.container.position.x}
                        />
                        <TextField
                            label="y"
                            InputProps={{
                                readOnly: true,
                            }}
                            size="small"
                            defaultValue={this.props.container.position.y}
                        />
                        <TextField
                            label="z"
                            InputProps={{
                                readOnly: true,
                            }}
                            size="small"
                            defaultValue={this.props.container.position.z}
                        />
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: "3px"
                    }}>
                        {this.content.map((row) => (
                            <Chip
                                label={row.consoleId}
                                color="primary"
                                icon={
                                    <Chip color="secondary"
                                          label={row.count}
                                          sx={{
                                              height: (theme) => `calc(100% - ${theme.spacing(1)})`
                                          }}
                                    />
                                }
                            />
                        ))}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.closeModal} autoFocus>Close</Button>
                </DialogActions>
            </Dialog>
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