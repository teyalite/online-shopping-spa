import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./assets/styles.scss";
import { AuthContextProvider } from "./config/auth.context";
import { store } from "./redux/store";
import { theme } from "./utils/theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
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
        </Provider>
    </React.StrictMode>
);
