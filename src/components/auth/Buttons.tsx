import React, { MouseEvent } from "react";
import { Button as MuiButton, ButtonProps, SxProps } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";

const AppleIcon =
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgZmlsbD0iIzAwMDAwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgMzAgMzAiIHdpZHRoPSIzMHB4IiBoZWlnaHQ9IjMwcHgiPgogICAgPHBhdGggZD0iTTI1LjU2NSw5Ljc4NWMtMC4xMjMsMC4wNzctMy4wNTEsMS43MDItMy4wNTEsNS4zMDVjMC4xMzgsNC4xMDksMy42OTUsNS41NSwzLjc1Niw1LjU1IGMtMC4wNjEsMC4wNzctMC41MzcsMS45NjMtMS45NDcsMy45NEMyMy4yMDQsMjYuMjgzLDIxLjk2MiwyOCwyMC4wNzYsMjhjLTEuNzk0LDAtMi40MzgtMS4xMzUtNC41MDgtMS4xMzUgYy0yLjIyMywwLTIuODUyLDEuMTM1LTQuNTU0LDEuMTM1Yy0xLjg4NiwwLTMuMjItMS44MDktNC40LTMuNDk2Yy0xLjUzMy0yLjIwOC0yLjgzNi01LjY3My0yLjg4Mi05IGMtMC4wMzEtMS43NjMsMC4zMDctMy40OTYsMS4xNjUtNC45NjhjMS4yMTEtMi4wNTUsMy4zNzMtMy40NSw1LjczNC0zLjQ5NmMxLjgwOS0wLjA2MSwzLjQxOSwxLjI0Miw0LjUyMywxLjI0MiBjMS4wNTgsMCwzLjAzNi0xLjI0Miw1LjI3NC0xLjI0MkMyMS4zOTQsNy4wNDEsMjMuOTcsNy4zMzIsMjUuNTY1LDkuNzg1eiBNMTUuMDAxLDYuNjg4Yy0wLjMyMi0xLjYxLDAuNTY3LTMuMjIsMS4zOTUtNC4yNDcgYzEuMDU4LTEuMjQyLDIuNzI5LTIuMDg1LDQuMTctMi4wODVjMC4wOTIsMS42MS0wLjQ5MSwzLjE4OS0xLjUzMyw0LjMzOUMxOC4wOTgsNS45MzcsMTYuNDg4LDYuODcyLDE1LjAwMSw2LjY4OHoiIC8+Cjwvc3ZnPg==";

const GoogleIcon = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xNy42NCA5LjIwNWMwLS42MzktLjA1Ny0xLjI1Mi0uMTY0LTEuODQxSDl2My40ODFoNC44NDRhNC4xNCA0LjE0IDAgMCAxLTEuNzk2IDIuNzE2djIuMjU5aDIuOTA4YzEuNzAyLTEuNTY3IDIuNjg0LTMuODc1IDIuNjg0LTYuNjE1eiIgZmlsbD0iIzQyODVGNCIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+PHBhdGggZD0iTTkgMThjMi40MyAwIDQuNDY3LS44MDYgNS45NTYtMi4xOGwtMi45MDgtMi4yNTljLS44MDYuNTQtMS44MzcuODYtMy4wNDguODYtMi4zNDQgMC00LjMyOC0xLjU4NC01LjAzNi0zLjcxMUguOTU3djIuMzMyQTguOTk3IDguOTk3IDAgMCAwIDkgMTh6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD48cGF0aCBkPSJNMy45NjQgMTAuNzFBNS40MSA1LjQxIDAgMCAxIDMuNjgyIDljMC0uNTkzLjEwMi0xLjE3LjI4Mi0xLjcxVjQuOTU4SC45NTdBOC45OTYgOC45OTYgMCAwIDAgMCA5YzAgMS40NTIuMzQ4IDIuODI3Ljk1NyA0LjA0MmwzLjAwNy0yLjMzMnoiIGZpbGw9IiNGQkJDMDUiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPjxwYXRoIGQ9Ik05IDMuNThjMS4zMjEgMCAyLjUwOC40NTQgMy40NCAxLjM0NWwyLjU4Mi0yLjU4QzEzLjQ2My44OTEgMTEuNDI2IDAgOSAwQTguOTk3IDguOTk3IDAgMCAwIC45NTcgNC45NThMMy45NjQgNy4yOUM0LjY3MiA1LjE2MyA2LjY1NiAzLjU4IDkgMy41OHoiIGZpbGw9IiNFQTQzMzUiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPjxwYXRoIGQ9Ik0wIDBoMTh2MThIMHoiPjwvcGF0aD48L2c+PC9zdmc+`;

const Button = ({ sx, children, ...other }: ButtonProps) => (
    <MuiButton
        {...other}
        variant="outlined"
        color="secondary"
        sx={{
            minWidth: 300,
            ...sx,
            color: "black",
            textTransform: "none",
            pr: 2,
            fontWeight: "bold",
            fontSize: 17,
        }}
    >
        <span style={{ marginLeft: 10 }}>{children}</span>
    </MuiButton>
);

export function GoogleButton({ onClick }: ButtonProps) {
    return (
        <Button
            startIcon={
                <img
                    src={GoogleIcon}
                    width={24}
                    height={24}
                    alt="Google logo"
                />
            }
            onClick={onClick}
        >
            Continuer avec Google
        </Button>
    );
}

export function AppleButton({ onClick }: ButtonProps) {
    return (
        <Button
            startIcon={
                <img src={AppleIcon} width={24} height={24} alt="Apple logo" />
            }
            onClick={onClick}
        >
            Continuer avec Apple
        </Button>
    );
}

export function SignupButton() {
    const navigate = useNavigate();
    const link = "/auth/signup";

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate(link);
    };

    return (
        <Button
            startIcon={<PersonIcon style={{ fontSize: 30 }} />}
            sx={{ width: "100%" }}
            LinkComponent={"a"}
            href={link}
            onClick={handleClick}
        >
            Create an Account
        </Button>
    );
}

export function SigninButton() {
    const navigate = useNavigate();
    const link = "/auth/signin";

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate(link);
    };

    return (
        <Button
            LinkComponent={"a"}
            href={link}
            onClick={handleClick}
            startIcon={<LoginIcon style={{ fontSize: 30 }} />}
        >
            Login with email
        </Button>
    );
}

/**
 * Login Button to display in AppBar and Drawer
 * @param param0
 * @returns
 */
export function LoginButton({ sx }: { sx?: SxProps }) {
    const navigate = useNavigate();

    const onClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        navigate("/auth");
    };

    return (
        <MuiButton
            LinkComponent={"a"}
            href="/auth"
            onClick={onClick}
            sx={{
                textTransform: "none",
                fontSize: "large",
                color: "blue",
                borderColor: "blue",
                ...sx,
            }}
            variant="outlined"
            color="secondary"
        >
            Login
        </MuiButton>
    );
}
