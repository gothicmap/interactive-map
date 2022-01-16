import React, {useEffect, useState} from 'react';
import {Box, Divider, FormGroup, IconButton, InputBase, Paper} from "@mui/material";
import DataTable from "react-data-table-component"
import {FormCheckbox} from "../Map/MapSettings";
import {
    categoriesSelector,
    databaseSearchTerm,
    itemsColumnsSelector,
    itemsSelector,
    useCategories
} from "./DatabaseState";
import {useRecoilState, useRecoilValue} from "recoil";
import ClearIcon from "@mui/icons-material/Clear";
import useDebounce from "@rooks/use-debounce";
import {Strings} from "../Strings";
import {langAtom} from "../AppState";
import darkScrollbar from "@mui/material/darkScrollbar";
import {ArrowDownward} from "@mui/icons-material";

const customSort = (rows, selector, direction) => {
    return rows.sort((rowA, rowB) => {
        const a = selector(rowA)
        const b = selector(rowB)

        let comparison = 0

        if (a > b || (a && !b)) {
            comparison = 1
            if(!b && direction === 'asc') {
                comparison *= -1
            }
        }

        if (b > a || (b && !a)) {
            comparison = -1
            if(!a && direction === 'asc') {
                comparison *= -1
            }
        }


        return direction === 'desc' ? comparison * -1 : comparison;
    })
}

const customStyles = {
    headCells: {
        style: {
               position: "sticky",
                    left: 0,
                    "z-index": 1,
                    backgroundColor: "inherit"
        },
    },
}

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
    const lang = useRecoilValue(langAtom)
    const allCategories = useRecoilValue(categoriesSelector)
    const [checkCategory, setCategory] = useCategories()
    const catChangeCallback = (cat) => {
        return (evt) => {
            setCategory(cat, evt.target.checked)
        }
    }

    const columns = useRecoilValue(itemsColumnsSelector)
    const rows = useRecoilValue(itemsSelector)

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
            overflowY: "auto",
            ...darkScrollbar()
        }}>
            <FormGroup sx={{pl: 4, flexDirection: "column"}}>
                {
                    allCategories.map((category) => {
                            return <FormCheckbox
                                key={category}
                                label={Strings.getItemCategory(category, lang)}
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
            overflow: "hidden",
            flexShrink: 10000,
            flexGrow: 1,
            gap: (theme) => theme.spacing(1),
            padding: (theme) => theme.spacing(1)
        }}>
            <DatabaseSearchInput/>
            <Paper
                sx={{
                    display: "flex",
                    overflow: "hidden",
                    flexDirection: "column",
                    flexGrow: 1,
                    "& > div:first-child": {
                        overflow: "auto",
                        flexGrow: 1,
                        ...darkScrollbar()
                    },
                    "& .rdt_TableHeadRow .rdt_TableCol:first-child": {
                        position: "sticky",
                        left: 0,
                        zIndex: "100",
                    }
                }}>
                <DataTable
                    data={rows}
                    columns={columns}
                    pagination={true}
                    responsive={true}
                    theme={"dark"}
                    sortFunction={customSort}
                    sortIcon={<ArrowDownward />}
                    highlightOnHover
                />
            </Paper>
        </Box>
    </Box>
}