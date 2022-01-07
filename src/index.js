import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createTheme, ThemeProvider} from "@mui/material";
import ModalProvider from 'mui-modal-provider';
import {RecoilRoot} from "recoil";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    }
});

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <ThemeProvider theme={darkTheme}>
                <ModalProvider>
                    <App/>
                </ModalProvider>
            </ThemeProvider>
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById('root')
);
