import React from "react";
import {Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useModal} from "mui-modal-provider";
import Outline from "../Misc/Outline";
import {VectorInfo} from "../Misc/VectorInfo";

const KeyInfo = (props) => {
    return <React.Fragment>
        {props.container.locked && props.container.key && <Box sx={{
            display: "flex",
            flexDirection: "row",
            gap: (theme) => theme.spacing(1),
        }}>
            <TextField
                sx={{
                    flexGrow: 1
                }}
                label="key"
                InputProps={{
                    readOnly: true,
                }}
                size="small"
                defaultValue={props.container.key}
            />
        </Box>
        }
    </React.Fragment>
}

const LockCombinationInfo = (props) => {
    return <React.Fragment>
        {props.container.locked && props.container.combination && <Outline label="combination">
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: (theme) => theme.spacing(1),
            }}>
                {props.container.combination.split("").map((direction, idx) => (
                    <Chip
                        key={idx}
                        label={direction}
                        color="primary"
                    />
                ))}
            </Box>
        </Outline>
        }
    </React.Fragment>
}


const ContainerContentInfo = (props) => {
    return <React.Fragment>
        <Outline label="content">
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: (theme) => theme.spacing(1),
            }}>
                {props.container.contains.map((item) => (
                    <Chip
                        key={item.item}
                        label={item.item}
                        color="primary"
                        icon={
                            <Chip color="secondary"
                                  label={item.count}
                                  sx={{
                                      height: (theme) => `calc(100% - ${theme.spacing(1)})`
                                  }}
                            />
                        }
                    />
                ))}
            </Box>
        </Outline>
    </React.Fragment>
}

const ContainerModalComponent = ({container, closeModal, ...props}) => {
    return <Dialog {...props}>
        <DialogTitle>Container</DialogTitle>
        <DialogContent sx={{
            display: "flex",
            flexDirection: "column",
            gap: (theme) => theme.spacing(1),
            overflow: "visible"
        }}>
            <VectorInfo vector={container.position}/>
            <KeyInfo container={container}/>
            <LockCombinationInfo container={container}/>
            <ContainerContentInfo container={container}/>
        </DialogContent>
        <DialogActions>
            <Button onClick={closeModal} autoFocus>Close</Button>
        </DialogActions>
    </Dialog>
}

export function ShowContainerModal(container) {
    const {showModal} = useModal();

    const showContainerModelCallback = () => {
        const modal = showModal(ContainerModalComponent, {
            container: container, closeModal: () => {
                modal.hide();
            }
        })
    }

    return showContainerModelCallback
}