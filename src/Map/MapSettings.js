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
import {categoryFamily, mapSettingsFamily} from "./MapState";
import {useRecoilState} from "recoil";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {mapPinsCategories} from "../Data/database";


export const FormCheckbox = ({label, ...props}) => {
    return <FormControlLabel control={<Checkbox {...props}/>}
                             label={label}/>
}

export const RenderCategory = ({mapId, category, subCategories, ...props}) => {
    const [subOpen, setSubOpen] = useRecoilState(categoryFamily(`${mapId}-${category}-sub-open`));

    const handleSubOpenClick = () => {
        setSubOpen(!subOpen);
    };

    const [categoryChecked, setCategoryChecked] = useRecoilState(categoryFamily(`${mapId}-${category}`))

    const handleCatChange = (event) => {
        setCategoryChecked(event.target.checked);
    };

    if (subCategories.length !== 0) {
        return <>
            <ListItemButton sx={{
                padding: 0
            }}>
                <FormCheckbox label={category}
                              checked={categoryChecked}
                              onChange={handleCatChange}
                />
                <Box sx={{flexGrow: 1}}/>
                {subOpen ? <ExpandLess onClick={handleSubOpenClick}/> :
                    <ExpandMore onClick={handleSubOpenClick}/>}
            </ListItemButton>
            <Collapse in={subOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <FormGroup sx={{pl: 4}}>
                        {
                            subCategories.map((subCat) => {
                                    // eslint-disable-next-line react-hooks/rules-of-hooks
                                    const [subCatChecked, setSubCatChecked] = useRecoilState(categoryFamily(`${mapId}-${category}-${subCat}`))
                                    const handleSubCatChange = (event) => {
                                        setSubCatChecked(event.target.checked);
                                    };
                                    return <FormCheckbox key={subCat} label={subCat}
                                                         checked={subCatChecked}
                                                         onChange={handleSubCatChange}
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
                          checked={categoryChecked}
                          onChange={handleCatChange}
            />
        </ListItemButton>
    }
}

export const RenderCategories = ({mapId, categories, ...props}) => {
    return <>
        {
            Object.entries(categories).map(([categoryName, subCategories]) => {
                return <RenderCategory mapId={mapId} category={categoryName} subCategories={subCategories}/>
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
        <RenderCategories mapId={mapId} categories={mapPinsCategories}/>
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