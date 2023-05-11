import React from "react";
import Stack from "@mui/system/Stack";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingIndicator() {
    return (
        <Stack spacing={8} alignItems="center">
            <CircularProgress />
        </Stack>
    );
}
