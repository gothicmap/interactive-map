import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './App';
import {createTheme, ThemeProvider} from "@mui/material";
import ModalProvider from 'mui-modal-provider';
import {RecoilRoot} from "recoil";
import {CanvasKitProvider, loadCanvasKit} from "./Misc/KitCanvas";
import {HashRouter} from "react-router-dom";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    }
});


loadCanvasKit((CanvasKit) => {
    ReactDOM.render(
        <React.StrictMode>
            <RecoilRoot>
                <HashRouter>
                    <CanvasKitProvider value={CanvasKit}>
                        <ThemeProvider theme={darkTheme}>
                            <ModalProvider>
                                <App/>
                            </ModalProvider>
                        </ThemeProvider>
                    </CanvasKitProvider>
                </HashRouter>
            </RecoilRoot>
        </React.StrictMode>,
        document.getElementById('root')
    );
})