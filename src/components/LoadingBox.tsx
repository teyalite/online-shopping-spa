import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingBox() {
    return (
        <Box
            sx={{
                flex: 1,
                width: "100%",
                height: "100%",
                minHeight: 390,
            }}
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <CircularProgress />
        </Box>
    );
}
