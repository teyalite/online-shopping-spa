import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import "./assets/styles.scss";
import { theme } from "./utils/theme";
import { AuthContextProvider } from "./config/auth.context";

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
