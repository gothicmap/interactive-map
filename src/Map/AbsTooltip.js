import {Box, Card, Paper, Popper} from "@mui/material";
import {Component} from "react";

export class AbsTooltip extends Component {
    constructor(props) {
        super(props)
        this.clientWidth = 5
        this.clientHeight = 5
    }

    getBoundingClientRect = () => {
        return {
            top: this.props.y,
            left: this.props.x,
            right: this.props.x + 5,
            bottom: this.props.y + 5,
            x: this.props.x,
            y: this.props.y,
            height: 5,
            width: 5
        }
    }

    render() {
        return <Popper open={true} anchorEl={this}>
            <Paper elevation={4} sx={{
                padding: (theme) => theme.spacing(0.5),
                display: "flex",
                gap: (theme) => theme.spacing(0.5)
            }}>{this.props.data}</Paper>
        </Popper>
    }
}