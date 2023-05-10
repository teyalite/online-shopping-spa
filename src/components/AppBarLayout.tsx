import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Outlet } from "react-router-dom";
import AppBar from "./navigation/AppBar";
import BottomNavigation from "./BottomNavigation";

export default function AppBarLayout() {
    return (
        <Box
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
            }}
        >
            <AppBar />
            <Stack
                sx={{ paddingTop: 12, pb: 10, width: "100%" }}
                direction="column"
                alignItems="center"
            >
                <Outlet />
            </Stack>
            <BottomNavigation />
        </Box>
    );
}
