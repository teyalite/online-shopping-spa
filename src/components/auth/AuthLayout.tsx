/**
 * This component is the main layout for authorization
 */
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useContext } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/online-shop-logo.png";
import { AuthContext } from "../../config/auth.context";
import LoadingBox from "../LoadingBox";

/**
 * noRedirect indicates whether to redirect when not logged in or not
 * When true there is not redirect
 * @param param0
 * @returns
 */
export default function AuthLayout({
    noRedirect = false,
}: {
    noRedirect?: boolean;
}) {
    const location = useLocation(); // location used to check if navigate from another screen or not.
    const navigate = useNavigate(); // navigation used to programmatically navigate
    const { user, loading } = useContext(AuthContext); // auth context

    /**
     * Go back when auth isn't first shown
     * @returns
     */
    const onBack = () => {
        if (location.key === "default") {
            return navigate("/", { replace: true });
        }

        navigate(-1);
    };

    /**
     * Redirect when use is logged In with replace
     */
    if (user && !noRedirect) {
        return <Navigate to="/compte" replace />;
    }

    return (
        <Stack
            component={Container}
            height="100%"
            width="100%"
            pb={4}
            pt={2}
            spacing={5}
        >
            <Stack>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={onBack}
                    sx={{ ml: 1, alignSelf: "flex-start" }}
                >
                    <ArrowBackIcon />
                </IconButton>
            </Stack>
            <Box
                component={"a"}
                href="/"
                alignSelf="center"
                width={{ sm: "200px", xs: "100px" }}
                height={{ sm: "108px", xs: "54px" }}
            >
                <img
                    src={Logo}
                    style={{ width: "100%", height: "100%" }}
                    alt="Logo"
                />
            </Box>
            <Stack spacing={4} alignItems="center" flexGrow={1}>
                {loading ? (
                    <Box sx={{ width: "100px" }}>
                        <LoadingBox />
                    </Box>
                ) : (
                    <Outlet />
                )}
            </Stack>
            <small
                style={{
                    alignSelf: "center",
                    marginTop: 40,
                    paddingBottom: 20,
                    textAlign: "center",
                }}
            >
                © Copyright Blabla
            </small>
        </Stack>
    );
}
