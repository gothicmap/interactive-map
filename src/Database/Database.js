import {Box, Card, CardActions, CardContent, Divider, ListItem, ListItemText, Typography} from "@mui/material";

import items from "./items.json";
import {blue} from "@mui/material/colors";
import * as React from "react";
import List from "@mui/material/List";

export const Database = () => {
    return <Box sx={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        overflow: "scroll",
        gap: (theme) => theme.spacing(1),
        padding: (theme) => theme.spacing(1)
    }}>
        {
            items.items.map(
                (item) => {
                    return <Card key={item.item} sx={{minWidth: 275}}>
                        <CardContent>
                            <Typography sx={{fontSize: 14, color: blue[400]}} gutterBottom>
                                {item.category}
                            </Typography>
                            <Typography variant="h5" component="div">
                                {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{
                                whiteSpace: "pre-wrap"
                            }}>
                                {item.description}
                            </Typography>
                            {item.values.length > 0 && <>
                                <Divider variant="middle">properties</Divider>
                                <List>
                                    {
                                        item.values.map(([valueText, value]) => {
                                                return <>
                                                    <ListItem disablePadding>
                                                        <ListItemText primary={valueText} />
                                                        <ListItemText primary={value} sx={{
                                                            textAlign: "end",
                                                            paddingLeft: (theme) => theme.spacing(1)
                                                        }}/>
                                                    </ListItem>
                                                </>
                                            }
                                        )
                                    }
                                </List>
                            </>}
                        </CardContent>
                    </Card>
                }
            )
        }
    </Box>
}