import React, {useEffect, useRef, useState} from 'react';
import {CellMeasurer, AutoSizer, CellMeasurerCache, List as VList} from 'react-virtualized';
import 'react-virtualized/styles.css';
import {
    Box,
    Card,
    CardContent,
    Divider,
    FormGroup, IconButton, InputBase,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography
} from "@mui/material";
import {blue} from "@mui/material/colors";

import {FormCheckbox} from "../Map/MapSettings";
import {
    categoriesSelector, databaseSearchTerm,
    itemsSelector,
    useCategories
} from "./DatabaseState";
import {useRecoilState, useRecoilValue} from "recoil";
import ClearIcon from "@mui/icons-material/Clear";
import useDebounce from "@rooks/use-debounce";


export const DatabaseSearchInput = () => {
    const [searchTerm, setSearchTerm] = useRecoilState(databaseSearchTerm)
    const setSearchTermDebounced = useDebounce(setSearchTerm, 500)

    const [internal, setInternal] = useState(searchTerm)

    useEffect(() => {
        setSearchTermDebounced(internal)
    }, [internal])

    useEffect(() => {
        setInternal(searchTerm)
    }, [searchTerm])

    return <Paper sx={{
        flexDirection: "row",
        display: "flex"
    }}>
        <InputBase sx={{ml: 1, flex: 1}} placeholder="search"
                   value={internal}
                   onChange={(evt) => setInternal(evt.target.value)}
        />
        <Divider sx={{height: 28, m: 0.5}} orientation="vertical"/>
        <IconButton color="inherit" size="large"
                    onClick={() => setInternal("")}
        >
            <ClearIcon/>
        </IconButton>
    </Paper>
}

export const DatabaseVirtualized = () => {
    const allCategories = useRecoilValue(categoriesSelector)
    const [checkCategory, setCategory] = useCategories()
    const items = useRecoilValue(itemsSelector)
    const cache = useRef(new CellMeasurerCache({
        defaultHeight: 50,
        fixedWidth: true
    }))

    const vListRef = useRef(null)

    useEffect(() => {
            cache.current.clearAll()
            if (vListRef.current) {
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
                    marginTop: (theme) => index === 0 ? 0 : theme.spacing(1)
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
            flexDirection: "column",
            display: "flex",
            flexGrow: 1000,
            gap: (theme) => theme.spacing(1),
            padding: (theme) => theme.spacing(1)
        }}>
            <DatabaseSearchInput/>
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
    </Box>
}