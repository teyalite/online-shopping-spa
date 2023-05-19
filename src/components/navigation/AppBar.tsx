import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import CompteIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MuiAppBar from "@mui/material/AppBar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { SxProps } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/system/Stack";
import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { theme } from "../../utils/theme";
import Logo from "../Logo";
import Search from "../Search";
import { Values } from "../BottomNavigation";
import Drawer from "./Drawer";
import CloseIcon from "@mui/icons-material/Close";

/**
 * Get tab value
 * @param pathname
 * @returns
 */
function getBarValue(pathname: string): Values {
    if (pathname.startsWith("/favorites")) {
        return Values.Favorites;
    }

    if (pathname.startsWith("/profile")) {
        return Values.Profile;
    }

    if (pathname.startsWith("/shopcart")) {
        return Values.Shopcart;
    }

    if (pathname === "/") {
        return Values.Home;
    }

    return Values.Unknown;
}

export default function AppBar({ count }: { count: number }) {
    const matches = useMediaQuery(theme.breakpoints.down("md"));
    const [open, setOpen] = useState(false);
    const location = useLocation();

    const barValue = getBarValue(location.pathname);

    const toggle = (val: boolean) => {
        return () => setOpen(val);
    };

    if (matches) {
        return null;
    }

    return (
        <>
            <Drawer
                toggle={toggle}
                open={open}
                sx={{ pt: 10, px: 5 }}
                anchor="top"
            />
            <MuiAppBar position="static" sx={styles.appBar} elevation={0}>
                <Container>
                    <Toolbar
                        disableGutters
                        component={Stack}
                        direction="row"
                        alignItems="center"
                        spacing={{ xs: 0, md: 2, lg: 5 }}
                    >
                        <Logo />
                        <Button
                            startIcon={open ? <CloseIcon /> : <MenuIcon />}
                            variant="contained"
                            size="large"
                            sx={styles.addButton}
                            disableElevation
                            onClick={toggle(!open)}
                        >
                            Catalog
                        </Button>
                        <Search />
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={{ xs: 1, lg: 3.5 }}
                        >
                            <Item
                                icon={<HomeIcon />}
                                label="Home"
                                href="/"
                                selected={barValue === Values.Home}
                            />
                            <Item
                                icon={<FavoriteIcon />}
                                label="Favorites"
                                href="/favorites"
                                selected={barValue === Values.Favorites}
                            />
                            <Item
                                icon={
                                    <Badge badgeContent={count} color="warning">
                                        <ShoppingCartIcon />
                                    </Badge>
                                }
                                label="Shopcart"
                                href="/shopcart"
                                selected={barValue === Values.Shopcart}
                            />
                            <Item
                                icon={<CompteIcon />}
                                label="Profile"
                                href="/profile"
                                selected={barValue === Values.Profile}
                            />
                        </Stack>
                    </Toolbar>
                </Container>
            </MuiAppBar>
        </>
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
