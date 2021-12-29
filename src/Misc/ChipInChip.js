import {Box, Chip} from "@mui/material";
import React from "react";

export function ChipInChip({label, secondaryLabel, color = "primary"}) {
    return <Chip label={
        <>
            <Box sx={{
              display: "flex",
              flexDirection: "row",
              gap: (theme) => theme.spacing(1)
            }}>
                <Chip label={secondaryLabel} sx={{
                    height: (theme) => `calc(100% - ${theme.spacing(1)})`
                }} color="secondary" size="small"/>
                {label}
            </Box>

        </>
    } color={color} size="small"/>
}