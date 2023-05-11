import { Stack, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { SigninButton, SignupButton } from "../../components/auth/Buttons";
import Separator from "../../components/auth/Separator";

export default function AuthScreen() {
    return (
        <Stack spacing={3}>
            <Helmet></Helmet>
            <Typography
                component="h2"
                sx={{ fontSize: { xs: "x-large", md: "xx-large" }, pb: 2 }}
            >
                Welcome to Online Shop!
            </Typography>
            <Stack spacing={2.5}>
                <SigninButton />
            </Stack>
            <Separator />
            <SignupButton />
        </Stack>
    );
}
