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
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {useModal} from "mui-modal-provider";

const ContainerModalComponent = ({container, closeModal, ...props}) => {
    // parse content
    const content = [];
    const items = container.content.split(",");
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
        content.push({
            consoleId: consoleId.trim(),
            count: count.trim()
        })
    })

    return <Dialog {...props}>
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
                    defaultValue={container.position.x}
                />
                <TextField
                    label="y (height)"
                    InputProps={{
                        readOnly: true,
                    }}
                    size="small"
                    defaultValue={container.position.y}
                />
                <TextField
                    label="z"
                    InputProps={{
                        readOnly: true,
                    }}
                    size="small"
                    defaultValue={container.position.z}
                />
                <CopyToClipboard
                    text={`goto vob ${container.position.x} ${container.position.y} ${container.position.z}`}>
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
                {content.map((row, idx) => (
                    <Chip
                        key={idx}
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