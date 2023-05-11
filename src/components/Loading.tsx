import RefreshIcon from "@mui/icons-material/Refresh";
import { IconButton, Stack, Typography } from "@mui/material";
import { NETWORK_ERROR_TITLE } from "../utils/values";
import LoadingIndicator from "./LoadingIndicator";
import { PropsWithChildren } from "react";

type Props = {
    failed?: boolean;
    onRetry?: () => void;
};

export default function Loading({
    failed = false,
    onRetry,
    children,
}: Props & PropsWithChildren) {
    if (failed) {
        return (
            <Stack
                textAlign="center"
                spacing={3}
                alignItems="center"
                justifyContent="center"
            >
                <IconButton size="large" onClick={onRetry}>
                    <RefreshIcon sx={{ fontSize: 50 }} />
                </IconButton>
                <Typography>{NETWORK_ERROR_TITLE}</Typography>
                {children}
            </Stack>
        );
    }

    return <LoadingIndicator />;
}
