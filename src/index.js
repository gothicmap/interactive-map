import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createTheme, ThemeProvider} from "@mui/material";
import ModalProvider from 'mui-modal-provider';
import {RecoilRoot} from "recoil";
import {loadCanvasKit, CanvasKitProvider} from "./Misc/KitCanvas";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    }
});


loadCanvasKit((CanvasKit) => {
    ReactDOM.render(
        <React.StrictMode>
            <CanvasKitProvider value={CanvasKit}>
                <RecoilRoot>
                    <ThemeProvider theme={darkTheme}>
                        <ModalProvider>
                            <App/>
                        </ModalProvider>
                    </ThemeProvider>
                </RecoilRoot>
            </CanvasKitProvider>
        </React.StrictMode>,
        document.getElementById('root')
    );
})