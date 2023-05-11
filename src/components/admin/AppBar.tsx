import { Logout } from "@mui/icons-material";
import CategoryIcon from "@mui/icons-material/Category";
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
import { ReactNode, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AdminAuthContext } from "../../config/admin.context";
import { theme } from "../../utils/theme";
import Logo from "../Logo";
import { Values } from "./BottomNavigation";
import { ADMIN_TOKEN_KEY } from "../../utils/values";

/**
 * Get tab value
 * @param pathname
 * @returns
 */
function getBarValue(pathname: string): Values {
    if (pathname.startsWith("/admin/categories")) {
        return Values.Categories;
    }

    if (pathname.startsWith("/admin/sellers")) {
        return Values.Sellers;
    }

    if (pathname.startsWith("/admin/users")) {
        return Values.Users;
    }

    if (["/admin", "/admin/"].includes(pathname)) {
        return Values.Home;
    }

    return Values.Unknown;
}

export default function AppBar() {
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    const location = useLocation();
    const { loading, failed, admin, setAdmin } = useContext(AdminAuthContext);
    const notLogged = loading || failed || !admin;
    const barValue = getBarValue(location.pathname);

    const logout = () => {
        try {
            localStorage.removeItem(ADMIN_TOKEN_KEY);
        } catch (error) {
            console.log(error);
        }
        setAdmin(null);
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
                        <Logo disabled={notLogged} />
                        <Typography fontWeight="bold">Adminstrators</Typography>
                    </Stack>

                    {!notLogged && (
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={{ xs: 1, lg: 3.5 }}
                        >
                            {!matches && (
                                <>
                                    <Item
                                        icon={<HomeIcon />}
                                        label="Home"
                                        href="/admin"
                                        selected={barValue === Values.Home}
                                    />
                                    <Item
                                        icon={<CategoryIcon />}
                                        label="Categories"
                                        href="/admin/categories"
                                        selected={
                                            barValue === Values.Categories
                                        }
                                    />
                                    <Item
                                        icon={<StoreIcon />}
                                        label="Sellers"
                                        href="/admin/sellers"
                                        selected={barValue === Values.Sellers}
                                    />
                                    <Item
                                        icon={<GroupIcon />}
                                        label="Users"
                                        href="/admin/users"
                                        selected={barValue === Values.Users}
                                    />
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
