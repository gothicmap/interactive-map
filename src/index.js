import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import {createTheme, ThemeProvider} from "@mui/material";
import ModalProvider from 'mui-modal-provider';
import {RecoilRoot} from "recoil";
import {loadCanvasKit, CanvasKitProvider} from "./Misc/KitCanvas";
import {BrowserRouter} from "react-router-dom";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    }
});


loadCanvasKit((CanvasKit) => {
    ReactDOM.render(
        <React.StrictMode>
            <RecoilRoot>
                <BrowserRouter>
                    <CanvasKitProvider value={CanvasKit}>

                        <ThemeProvider theme={darkTheme}>
                            <ModalProvider>
                                <App/>
                            </ModalProvider>
                        </ThemeProvider>

                    </CanvasKitProvider>
                </BrowserRouter>
            </RecoilRoot>
        </React.StrictMode>,
        document.getElementById('root')
    );
})