import React from "react";
import { Stack, Typography, Divider as MuiDivider } from "@mui/material";

const Divider = () => (
    <MuiDivider
        orientation="horizontal"
        variant="fullWidth"
        sx={{
            width: "30%",
            height: "1px",
            background: "gray",
        }}
    />
);

export default function Separator() {
    return (
        <Stack
            direction="row"
            spacing={2}
            minWidth={275}
            alignItems="center"
            justifyContent="center"
        >
            <Divider />
            <Typography>OR</Typography>
            <Divider />
        </Stack>
    );
}
