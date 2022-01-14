import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Switch} from "@mui/material";
import {VectorInfo} from "../Misc/VectorInfo";
import {usePinVisited} from "../Map/MapState";

export const ItemModalComponent = ({mapId, pin, closeModal, ...props}) => {
    const [visited, setVisited] = usePinVisited(mapId, pin.vobObjectID)
    const handleSetVisited = (evt) => setVisited(evt.target.checked)

    return <Dialog {...props}>
        <DialogTitle>Item</DialogTitle>
        <DialogContent sx={{
            display: "flex",
            flexDirection: "column",
            gap: (theme) => theme.spacing(1),
            overflow: "visible"
        }}>
            <VectorInfo vector={pin.position}/>
        </DialogContent>
        <DialogActions>
            <FormControlLabel control={<Switch checked={visited} onChange={handleSetVisited}/>} label="visited" />
            <Button onClick={closeModal} autoFocus>Close</Button>
        </DialogActions>
    </Dialog>
}