import CategoryIcon from "@mui/icons-material/Category";
import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import MuiBottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MouseEvent, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { theme } from "../../utils/theme";
import { AdminAuthContext } from "../../config/admin.context";

export enum Values {
    Home,
    Categories,
    Sellers,
    Users,
    Unknown,
}

/**
 * Get tab value
 * @param pathname
 * @returns
 */
function getTabValue(pathname: string): Values {
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

export default function BottomNavigation() {
    const location = useLocation();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const value = getTabValue(location.pathname);
    const { loading, failed, admin } = useContext(AdminAuthContext);
    const notLogged = loading || failed || !admin;
    const navigate = useNavigate();

    const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate(new URL(e.currentTarget.href).pathname);
    };

    if (matches || notLogged) {
        return null;
    }

    return (
        <Paper sx={styles.paper} elevation={3}>
            <MuiBottomNavigation
                showLabels={true}
                style={styles.bottomNavigation}
                value={value}
            >
                <BottomNavigationAction
                    label="Home"
                    icon={<HomeIcon />}
                    value={Values.Home}
                    onClick={onClick}
                    LinkComponent={"a"}
                    href={"/admin/"}
                    sx={styles.bottomNavigationAction}
                />
                <BottomNavigationAction
                    label="Categories"
                    icon={<CategoryIcon />}
                    value={Values.Categories}
                    onClick={onClick}
                    LinkComponent={"a"}
                    href={"/admin/categories"}
                    sx={styles.bottomNavigationAction}
                />
                <BottomNavigationAction
                    label="Sellers"
                    icon={<StoreIcon />}
                    value={Values.Sellers}
                    onClick={onClick}
                    LinkComponent={"a"}
                    href={"/admin/sellers"}
                    sx={styles.bottomNavigationAction}
                />
                <BottomNavigationAction
                    label="Users"
                    icon={<GroupIcon />}
                    value={Values.Users}
                    onClick={onClick}
                    LinkComponent={"a"}
                    href={"/admin/users"}
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
    bottomNavigationAction: {},
};
