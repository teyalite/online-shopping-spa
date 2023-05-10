import { createTheme } from "@mui/material";

export const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                },
            },
        },
        // MuiBottomNavigationAction: {
        //     // todo
        //     styleOverrides: {
        //         iconOnly: {
        //             background: "yellow",
        //             width: "20%",
        //             padding: 0,
        //         },
        //         label: {
        //             background: "silver",
        //         },
        //         root: {
        //             background: "blue",
        //             height: "100%",
        //             maxWidth: "20%",
        //             padding: 0,
        //         },
        //     },
        // },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    background: "#ffffff",
                    color: "#000000",
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                },
            },
        },
        MuiFab: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                },
            },
        },
    },
});

export default theme;
