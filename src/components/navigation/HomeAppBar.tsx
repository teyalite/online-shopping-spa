import { Menu } from "@mui/icons-material";
import { Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";
import theme from "../../utils/theme";
import Drawer from "./Drawer";

export default function HomeAppBar() {
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const [open, setOpen] = React.useState(false);

    const toggle = (val: boolean) => {
        return () => setOpen(val);
    };

    if (matches) {
        return null;
    }

    return (
        <>
            <Drawer
                toggle={toggle}
                open={open}
                sx={{ width: 300, px: 2 }}
                anchor="left"
            />
            <AppBar position="fixed" sx={{ py: 1 }}>
                <Toolbar
                    component={Stack}
                    alignItems="center"
                    direction="row"
                    width="100%"
                >
                    <IconButton sx={{ mr: 2 }} onClick={toggle(true)}>
                        <Menu />
                    </IconButton>
                    <Stack
                        component={Typography}
                        spacing={0.5}
                        direction="row"
                        fontWeight="bold"
                    >
                        <span style={{ color: "#f50057" }}>Online</span>
                        <span>Shop</span>
                    </Stack>
                </Toolbar>
            </AppBar>
        </>
    );
}
