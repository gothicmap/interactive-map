import * as React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import {
    Box,
    Checkbox,
    Collapse,
    FormControlLabel,
    FormGroup,
    IconButton,
    List,
    ListItemButton,
    Paper
} from "@mui/material";
import {flattendCategories, mapSettingsFamily, useCategories} from "./MapState";
import {useRecoilState, useRecoilValue} from "recoil";
import {Strings} from "../Strings";
import {langAtom} from "../AppState";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {mapPinsCategories} from "../Data/database";


export const FormCheckbox = ({label, ...props}) => {
    return <FormControlLabel control={<Checkbox {...props}/>}
                             label={label}/>
}

export const RenderCategory = ({category, subCategories, ...props}) => {
    const [subOpen, setSubOpen] = React.useState(true);
    const handleSubOpenClick = () => {
        setSubOpen(!subOpen);
    };
    if (subCategories.length !== 0) {
        return <>
            <ListItemButton sx={{
                padding: 0
            }}>
                <FormCheckbox label={category}
                              checked={true}
                    // onChange={groupStates.main.useState}
                />
                <Box sx={{flexGrow: 1}}></Box>
                {subOpen ? <ExpandLess onClick={handleSubOpenClick}/> :
                    <ExpandMore onClick={handleSubOpenClick}/>}
            </ListItemButton>
            <Collapse in={subOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <FormGroup sx={{pl: 4}}>
                        {
                            subCategories.map((category) => {
                                    return <FormCheckbox key={category} label={category}
                                                         checked={true}
                                        // onChange={category.useState}
                                    />
                                }
                            )
                        }
                    </FormGroup>
                </List>
            </Collapse>
        </>
    } else {
        return <ListItemButton sx={{
                padding: 0
            }}>
            <FormCheckbox label={category}
                          checked={true}
                // onChange={groupStates.main.useState}
            />
        </ListItemButton>
    }
}

export const RenderCategories = ({categories, ...props}) => {
    return <>
        {
            Object.entries(categories).map(([categoryName, subCategories]) => {
                return <RenderCategory category={categoryName} subCategories={subCategories}/>
            })
        }
    </>
}

export function RenderContainerSettings({mapId}) {
    // const lang = useRecoilValue(langAtom)
    // const allCategories = flattendCategories
    // const [checkCategory, setCategory] = useCategories(mapId)
    // const catChangeCallback = (cat) => {
    //     return (evt) => {
    //         setCategory(cat, evt.target.checked)
    //     }
    // }
    return <FormGroup sx={{pl: 4, flexDirection: "column", paddingLeft: (theme) => theme.spacing(1)}}>
        <RenderCategories categories={mapPinsCategories}/>
        {/*{*/}
        {/*    allCategories.map((category) => {*/}
        {/*            return <FormCheckbox*/}
        {/*                key={category}*/}
        {/*                label={Strings.getCategory(category, lang)}*/}
        {/*                checked={checkCategory(category)}*/}
        {/*                onChange={catChangeCallback(category)}*/}
        {/*            />*/}
        {/*        }*/}
        {/*    )*/}
        {/*}*/}
    </FormGroup>
}

export default function MapSettings({mapId, ...rest}) {
    const [showMapSettings, setShowMapSettings] = useRecoilState(mapSettingsFamily(mapId))

    const flipShowMapSettings = () => {
        setShowMapSettings(!showMapSettings)
    }

    return (
        <Paper className="MapSettings" {...rest}>
            <IconButton onClick={flipShowMapSettings} color="inherit" size="large" component="span">
                <SettingsIcon/>
            </IconButton>
        </Paper>
    )
}