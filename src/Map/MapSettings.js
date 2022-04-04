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
import {PinColorsAtom} from "./Pins/PinColors";


export const FormCheckbox = ({label, ...props}) => {
    return <FormControlLabel control={<Checkbox {...props}/>}
                             label={label}/>
}

const CategoryColorPicker = ({category, ...props}) => {
    const [pinColors, setPinColors] = useRecoilState(PinColorsAtom)

    const handleColorChange = (evt) => {
        const newColors = {...pinColors}
        newColors[category] = evt.target.value
        setPinColors(newColors)
    }

    return <label style={{
        backgroundColor: pinColors[category],
        width: 20,
        height: 20,
        marginLeft: 2,
        marginRight: 5,
        background: pinColors[category],
        display: "flex",
        borderRadius: 20
    }}>
        <input
            type={"color"}
            value={pinColors[category]}
            style={{
                display: "block",
                opacity: 0,
                width: "100%",
                height: "100%"
            }}
            onChange={handleColorChange}
        />
    </label>
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
                <CategoryColorPicker category={category}/>
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
            <Box sx={{flexGrow: 1}}/>
            <CategoryColorPicker category={category}/>
        </ListItemButton>
    }
}

export const RenderCategories = ({mapId, categories, ...props}) => {
    return <>
        {
            Object.entries(categories).map(([categoryName, subCategories]) => {
                return <RenderCategory key={categoryName} mapId={mapId} category={categoryName} subCategories={subCategories}/>
            })
        }
    </>
}

export function RenderContainerSettings({mapId}) {
    return <FormGroup sx={{
        pl: 4,
        flexDirection: "column",
        paddingLeft: (theme) => theme.spacing(1)
    }}>
        <RenderCategories mapId={mapId} categories={mapPinsCategories}/>
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