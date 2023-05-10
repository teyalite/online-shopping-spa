import { Box, Container, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import { AdminAuthContextProvider } from "../../config/admin.context";
import BottomNavigation from "./BottomNavigation";
import AppBar from "./AppBar";

export default function AdminLayout() {
    return (
        <AdminAuthContextProvider>
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
                    sx={{ paddingTop: 3, pb: 10, width: "100%" }}
                    direction="column"
                    component={Container}
                >
                    <Outlet />
                </Stack>
                <BottomNavigation />
            </Box>
        </AdminAuthContextProvider>
    );
}
