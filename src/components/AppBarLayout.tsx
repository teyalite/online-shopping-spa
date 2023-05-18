import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Outlet } from "react-router-dom";
import AppBar from "./navigation/AppBar";
import BottomNavigation from "./BottomNavigation";
import Footer from "./Footer";

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
                sx={{
                    paddingTop: { xs: 0, md: 0 },
                    pb: 10,
                    flexGrow: 1,
                }}
                direction="column"
                alignItems="center"
            >
                <Outlet />
            </Stack>
            <Footer />
            <BottomNavigation />
        </Box>
    );
}
