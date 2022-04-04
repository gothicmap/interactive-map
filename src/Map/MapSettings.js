import * as React from 'react';
import {useState} from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import {
    Box,
    Checkbox,
    Collapse,
    Divider,
    FormControlLabel,
    FormGroup,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Paper
} from "@mui/material";
import {categoryFamily, mapSettingsFamily} from "./MapState";
import {useRecoilState} from "recoil";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {mapPinsCategories} from "../Data/database";
import {HighlightColorAtom, PinColorsAtom, VisitedColorAtom} from "./Pins/PinColors";


export const FormCheckbox = ({label, ...props}) => {
    return <FormControlLabel control={<Checkbox {...props}/>}
                             label={label}/>
}


const RoundColorPicker = ({value, onColorApply, ...props}) => {
    const [currentColor, setCurrentColor] = useState(value)

    const handleColorChange = (evt) => {
        setCurrentColor(evt.target.value)
    }

    const handleBlur = (evt) => {
        onColorApply(currentColor)
    }

    return <label style={{
        backgroundColor: value,
        width: 20,
        height: 20,
        marginLeft: 2,
        marginRight: 5,
        background: value,
        display: "flex",
        borderRadius: 20
    }}>
        <input
            type={"color"}
            value={value}
            style={{
                display: "block",
                opacity: 0,
                width: "100%",
                height: "100%"
            }}
            onChange={handleColorChange}
            onBlur={handleBlur}
        />
    </label>
}

const CategoryColorPicker = ({category, ...props}) => {
    const [pinColors, setPinColors] = useRecoilState(PinColorsAtom)

    const applyColor = (currentColor) => {
        const newColors = {...pinColors}
        newColors[category] = currentColor
        setPinColors(newColors)
    }

    return <RoundColorPicker value={pinColors[category]} onColorApply={applyColor}/>
}

export const RenderCategory = ({mapId, category, subCategories, ...props}) => {
    const [subCollapsed, setSubCollapsed] = useRecoilState(categoryFamily(`${mapId}-${category}-sub-collapsed`));


    const handleSubOpenClick = () => {
        setSubCollapsed(!subCollapsed);
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
                {!subCollapsed ? <ExpandLess onClick={handleSubOpenClick}/> :
                    <ExpandMore onClick={handleSubOpenClick}/>}
                <CategoryColorPicker category={category}/>
            </ListItemButton>
            <Collapse in={!subCollapsed} timeout="auto" unmountOnExit>
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
                return <RenderCategory key={categoryName} mapId={mapId} category={categoryName}
                                       subCategories={subCategories}/>
            })
        }
    </>
}


const ByAtomColorSetting = ({atom, label, ...props}) => {
    const [color, setColor] = useRecoilState(atom)

    const applyColor = (currentColor) => {
        setColor(currentColor)
    }

    return <ListItemButton sx={{
        padding: 0
    }}>
        <ListItemText primary={label}/>
        <Box sx={{flexGrow: 1111}}/>
        <RoundColorPicker value={color} onColorApply={applyColor}/>
    </ListItemButton>
}


export function RenderContainerSettings({mapId}) {
    return <FormGroup sx={{
        pl: 4,
        flexDirection: "column",
        paddingLeft: (theme) => theme.spacing(1)
    }}>
        <ByAtomColorSetting atom={HighlightColorAtom} label={"highlight"}/>
        <ByAtomColorSetting atom={VisitedColorAtom} label={"visited"}/>
        <Divider/>
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