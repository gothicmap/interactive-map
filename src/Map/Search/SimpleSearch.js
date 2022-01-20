import {InputBase} from "@mui/material";
import {useRecoilState} from "recoil";
import {searchSimpleExpression} from "./SearchState";

export const SimpleSearch = ({mapId}) => {
    const [searchTerm, setSearchTerm] = useRecoilState(searchSimpleExpression(mapId))
    return <InputBase sx={{ml: 1, flex: 1}} placeholder="enter part of name..." value={searchTerm}
                      onChange={(evt) => setSearchTerm(evt.target.value)}/>
}