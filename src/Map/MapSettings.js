import * as React from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import {Checkbox, FormControlLabel, FormGroup, IconButton, Paper} from "@mui/material";
import {categoriesSelector, mapSettingsFamily, useCategories} from "./MapState";
import {useRecoilState, useRecoilValue} from "recoil";
import {Strings} from "../Strings";
import {langAtom} from "../AppState";


export const FormCheckbox = ({label, ...props}) => {
    return <FormControlLabel control={<Checkbox {...props}/>}
                             label={label}/>
}

export function RenderContainerSettings({mapId}) {
    const lang = useRecoilValue(langAtom)
    const allCategories = useRecoilValue(categoriesSelector)
    const [checkCategory, setCategory] = useCategories(mapId)
    const catChangeCallback = (cat) => {
        return (evt) => {
            setCategory(cat, evt.target.checked)
        }
    }
    return <FormGroup sx={{pl: 4, flexDirection: "column"}}>
        {
            allCategories.map((category) => {
                    return <FormCheckbox
                        key={category}
                        label={Strings.getCategory(category, lang)}
                        checked={checkCategory(category)}
                        onChange={catChangeCallback(category)}
                    />
                }
            )
        }
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