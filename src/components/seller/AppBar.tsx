import { Logout } from "@mui/icons-material";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { SxProps } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/system/Stack";
import { signOut } from "firebase/auth";
import { ReactNode, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../config/auth.context";
import { auth } from "../../config/firebase";
import { theme } from "../../utils/theme";
import Logo from "../Logo";
import { Values, getTabValue } from "./BottomNavigation";

export default function AppBar() {
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    const location = useLocation();
    const { loading, user } = useContext(AuthContext);
    const barValue = getTabValue(location.pathname);

    const logout = () => {
        signOut(auth)
            .then(() => {
                window.location.reload();
            })
            .catch((error: any) => {
                console.log(error);
            });
    };

    return (
        <MuiAppBar position="static" sx={styles.appBar} elevation={0}>
            <Container>
                <Toolbar
                    disableGutters
                    component={Stack}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={{ xs: 0, md: 2, lg: 5 }}
                >
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Logo disabled={loading} />
                        <Typography fontWeight="bold">Seller</Typography>
                    </Stack>

                    {!loading && (
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={{ xs: 1, lg: 3.5 }}
                        >
                            {!matches && user?.shop?.approved && (
                                <>
                                    <Item
                                        icon={<HomeIcon />}
                                        label="Home"
                                        href="/seller"
                                        selected={barValue === Values.Home}
                                    />
                                    <Item
                                        icon={<StoreIcon />}
                                        label="Products"
                                        href="/seller/products"
                                        selected={barValue === Values.Products}
                                    />
                                    {/* <Item
                                        icon={<GroupIcon />}
                                        label="Orders"
                                        href="/seller/orders"
                                        selected={barValue === Values.Orders}
                                    /> */}
                                </>
                            )}
                            <Button
                                startIcon={<Logout />}
                                color="warning"
                                variant="outlined"
                                onClick={logout}
                                disableElevation
                            >
                                Logout
                            </Button>
                        </Stack>
                    )}
                </Toolbar>
            </Container>
        </MuiAppBar>
    );
}

type ItemProps = {
    selected?: boolean;
    icon: ReactNode;
    label: string;
    href: string;
};

function Item({ selected, icon, label, href }: ItemProps) {
    return (
        <Box component={Link} to={href} sx={styles.itemContainer}>
            <Button size="large" sx={selected ? undefined : styles.itemButton}>
                <Stack sx={styles.item}>
                    {icon}
                    <Typography fontSize={14}>{label}</Typography>
                </Stack>
            </Button>
        </Box>
    );
}

const styles: { [key: string]: SxProps } = {
    appBar: {
        background: "#ffffff",
        py: 1,
        zIndex: theme.zIndex.drawer + 100,
    },
    itemContainer: {
        "& :hover": {
            color: theme.palette.primary.dark,
        },
    },
    itemButton: {
        flex: 1,
        color: "rgba(0, 0, 0, 0.7)",
    },
    item: {
        alignItems: "center",
    },
    addButton: {
        fontWeight: "bold",
    },
};
