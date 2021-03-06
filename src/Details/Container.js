import React, {forwardRef} from "react";
import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Switch,
    TextField
} from "@mui/material";
import Outline from "../Misc/Outline";
import {VectorInfo} from "../Misc/VectorInfo";
import {usePinVisited} from "../Map/MapState";

const KeyInfo = (props) => {
    return <React.Fragment>
        {props.container.data.locked && props.container.data.key && <Box sx={{
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
                defaultValue={props.container.data.key}
            />
        </Box>
        }
    </React.Fragment>
}

const LockCombinationInfo = (props) => {
    return <React.Fragment>
        {props.container.data.locked && props.container.data.pickLock && <Outline label="combination">
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: (theme) => theme.spacing(1),
            }}>
                {props.container.data.pickLock.split("").map((direction, idx) => (
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


const ContainerContentInfo = forwardRef((props, ref) => {
    return <React.Fragment>
        <Outline ref={ref} label="content">
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: (theme) => theme.spacing(1),
            }}>
                {props.container.data.contains.map((item) => (
                    <Chip
                        key={item.item.item}
                        label={
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: theme => theme.spacing(1)
                                }}
                            >
                                {item.item.name}
                                {
                                    item.item.flags.map(
                                        flag => {
                                            return <Chip label={flag} color="secondary" size="small"/>
                                        }
                                    )
                                }
                            </Box>
                        }
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
});

export const ContainerModalComponent = ({pin, mapId, closeModal, ...props}) => {
    const [visited, setVisited] = usePinVisited(mapId, pin.vobObjectID)
    const handleSetVisited = (evt) => setVisited(evt.target.checked)
    return <Dialog {...props}>
        <DialogTitle>Container</DialogTitle>
        <DialogContent sx={{
            display: "flex",
            flexDirection: "column",
            gap: (theme) => theme.spacing(1),
            overflow: "visible"
        }}>
            <VectorInfo vector={pin.position}/>
            <KeyInfo container={pin}/>
            <LockCombinationInfo container={pin}/>
            <ContainerContentInfo container={pin}/>
        </DialogContent>
        <DialogActions>
            <FormControlLabel control={<Switch checked={visited} onChange={handleSetVisited}/>} label="visited"/>
            <Button onClick={closeModal} autoFocus>Close</Button>
        </DialogActions>
    </Dialog>
}