import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import CompteIcon from "@mui/icons-material/Person";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MuiBottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Badge from "@mui/material/Badge";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { theme } from "../utils/theme";

export enum Values {
    Home,
    Favorites,
    Profile,
    Catalog,
    Shopcart,
    Unknown,
}

/**
 * Get tab value
 * @param pathname
 * @returns
 */
function getTabValue(pathname: string): Values {
    if (pathname.startsWith("/favorites")) {
        return Values.Favorites;
    }

    if (pathname.startsWith("/profile")) {
        return Values.Profile;
    }

    if (pathname.startsWith("/search")) {
        return Values.Catalog;
    }

    if (pathname.startsWith("/shopcart")) {
        return Values.Shopcart;
    }

    if (pathname === "/") {
        return Values.Home;
    }

    return Values.Unknown;
}

export default function BottomNavigation() {
    const location = useLocation();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const value = getTabValue(location.pathname);
    const navigate = useNavigate();

    const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate(new URL(e.currentTarget.href).pathname);
    };

    if (matches) {
        return null;
    }

    return (
        <Paper sx={styles.paper} elevation={3}>
            <MuiBottomNavigation
                showLabels={false}
                style={styles.bottomNavigation}
                value={value}
            >
                <BottomNavigationAction
                    label="Home"
                    icon={<HomeIcon />}
                    value={Values.Home}
                    onClick={onClick}
                    LinkComponent={"a"}
                    href={"/"}
                    sx={styles.bottomNavigationAction}
                />
                <BottomNavigationAction
                    label="Catalog"
                    icon={<ManageSearchIcon />}
                    value={Values.Catalog}
                    onClick={onClick}
                    LinkComponent={"a"}
                    href={"/search"}
                    sx={styles.bottomNavigationAction}
                />
                <BottomNavigationAction
                    label="Shopcart"
                    icon={
                        <Badge badgeContent={4} color="warning">
                            <ShoppingCartIcon />
                        </Badge>
                    }
                    value={Values.Shopcart}
                    onClick={onClick}
                    LinkComponent={"a"}
                    href={"/shopcart"}
                    sx={styles.bottomNavigationAction}
                />
                <BottomNavigationAction
                    label="Favorites"
                    icon={<FavoriteIcon />}
                    value={Values.Favorites}
                    onClick={onClick}
                    LinkComponent={"a"}
                    href={"/favorites"}
                    sx={styles.bottomNavigationAction}
                />
                <BottomNavigationAction
                    label="Profile"
                    icon={<CompteIcon />}
                    value={Values.Profile}
                    onClick={onClick}
                    LinkComponent={"a"}
                    href={"/profile"}
                    sx={styles.bottomNavigationAction}
                />
            </MuiBottomNavigation>
        </Paper>
    );
}

const styles = {
    paper: {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: theme.zIndex.appBar + 1,
    },
    bottomNavigation: {
        marginBottom: "env(safe-area-inset-bottom)",
    },
    bottomNavigationAction: {
        // todo: change bottom item
        // background: "red",
        // "& .MuiBottomNavigationAction-root": {
        //     background: "gray",
        // },
    },
};
