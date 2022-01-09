import React, {useEffect, useRef} from 'react';
import {CellMeasurer, AutoSizer, CellMeasurerCache, List as VList} from 'react-virtualized';
import 'react-virtualized/styles.css'; // only needs to be imported once
// List data as an array of strings

import {
    Box,
    Card,
    CardContent,
    Divider,
    FormGroup,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography
} from "@mui/material";
import {blue} from "@mui/material/colors";


// import items from "./items.json";
import {FormCheckbox} from "../Map/MapSettings";
import {allCategories, itemsSelector, useCategories} from "./DatabaseState";
import {useRecoilValue} from "recoil";

export const DatabaseVirtualized = () => {
    const [checkCategory, setCategory] = useCategories()
    const items = useRecoilValue(itemsSelector)
    const cache = useRef(new CellMeasurerCache({
        defaultHeight: 50,
        fixedWidth: true
    }))

    const vListRef = useRef(null)

    useEffect(() => {
            cache.current.clearAll()
            if(vListRef.current) {
                vListRef.current.recomputeRowHeights()
                vListRef.current.forceUpdate()
            }
        },
        [items]
    )

    const catChangeCallback = (cat) => {
        return (evt) => {
            setCategory(cat, evt.target.checked)
        }
    }

    const rowRenderer = ({index, key, parent, style}) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        // const items = useRecoilValue(itemsSelector)
        const item = items[index]

        return <CellMeasurer
            cache={cache.current}
            columnIndex={0}
            key={key}
            parent={parent}
            rowIndex={index}
        >
            <div key={key} style={{
                ...style,
            }}>
                <Card key={item.item} sx={{
                    marginTop: (theme) => theme.spacing(1),
                    marginLeft: (theme) => theme.spacing(1),
                    marginRight: (theme) => theme.spacing(1)
                }}>
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
                            <List sx={{width: "100%", height: "100"}}>
                                {
                                    item.values.map(([valueText, value]) => {
                                            return <>
                                                <ListItem disablePadding>
                                                    <ListItemText primary={valueText}/>
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
            </div>
        </CellMeasurer>
    }

    return <Box sx={{
        flexGrow: 1000,
        display: "flex",
        flexDirection: "row",
        overflow: "hidden"
    }}>
        <Paper sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: '0px',
            overflowY: "auto"
        }}>
            <FormGroup sx={{pl: 4, flexDirection: "column"}}>
                {
                    allCategories.map((category) => {
                            return <FormCheckbox
                                key={category}
                                label={category}
                                checked={checkCategory(category)}
                                onChange={catChangeCallback(category)}
                            />
                        }
                    )
                }
            </FormGroup>
        </Paper>

        <Box sx={{
            flexGrow: 1,
            overflowY: "hidden"
        }}>
            <AutoSizer>
                {({height, width}) => (
                    <VList
                        ref={vListRef}
                        height={height}
                        rowCount={items.length}
                        deferredMeasurementCache={cache.current}
                        rowHeight={cache.current.rowHeight}
                        rowRenderer={rowRenderer}
                        width={width}
                    />
                )}
            </AutoSizer>
        </Box>
    </Box>
}