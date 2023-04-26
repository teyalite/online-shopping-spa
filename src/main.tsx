import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./assets/styles.scss";
import { AuthContextProvider } from "./config/auth.context";
import { theme } from "./utils/theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <HelmetProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <AuthContextProvider>
                        <App />
                    </AuthContextProvider>
                </BrowserRouter>
            </ThemeProvider>
        </HelmetProvider>
    </React.StrictMode>
);
