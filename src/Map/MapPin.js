import React from "react";
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField,
    Tooltip
} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";

const xdiff = 128070.0;
const ydiff = 199108.0;
const ydiv = 1600.0;
const xdiv = 1599.99;


export class MapPin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            infoOpened: true
        })
    }

    closeModal = () => {
        this.setState({
            infoOpened: false
        })
    }

    render() {
        return <Tooltip title={
            <Box sx={{
                gap: (theme) => theme.spacing(1),
                display: "flex",
                flexDirection: "row"
            }}>
                <Chip label="Container" color="primary" size="small"/>
                {this.props.container.locked && <Chip label="Locked" size="small" color="error"/>}
            </Box>
        }>
            <div className="MapPin"
                 style={{
                     width: `10px`,
                     height: `10px`,
                     position: 'absolute',
                     top: `calc(${this.calculatedX}% - 5px)`,
                     left: `calc(${this.calculatedY}% - 5px)`,
                     transform: `scale(${this.props.pointScale}) translate3d( 0, 0, 0)`
                 }}
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
                    <DialogContent sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: (theme) => theme.spacing(1),
                        overflow: "visible"
                    }}>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: (theme) => theme.spacing(1),
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
                                label="y (height)"
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
                            <CopyToClipboard
                                text={`goto vob ${this.props.container.position.x} ${this.props.container.position.y} ${this.props.container.position.z}`}>
                                <Tooltip title="Copy marvin goto command to clipboard">
                                    <IconButton color="primary" component="span">
                                        <ContentCopyIcon/>
                                    </IconButton>
                                </Tooltip>
                            </CopyToClipboard>
                        </Box>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            gap: (theme) => theme.spacing(1),
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
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeModal} autoFocus>Close</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Tooltip>

    }
}