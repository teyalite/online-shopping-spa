import GroupIcon from "@mui/icons-material/Group";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import MuiBottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MouseEvent, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../config/auth.context";
import { theme } from "../../utils/theme";

export enum Values {
    Home,
    Products,
    Orders,
    Unknown,
}

/**
 * Get tab value
 * @param pathname
 * @returns
 */
export function getTabValue(pathname: string): Values {
    if (pathname.startsWith("/seller/products")) {
        return Values.Products;
    }

    if (pathname.startsWith("/seller/orders")) {
        return Values.Orders;
    }

    if (["/seller", "/seller/"].includes(pathname)) {
        return Values.Home;
    }

    return Values.Unknown;
}

export default function BottomNavigation() {
    const location = useLocation();
    const matches = useMediaQuery(theme.breakpoints.up("md"));
    const value = getTabValue(location.pathname);
    const { loading, user } = useContext(AuthContext);
    const block = loading || !user?.shop?.approved;
    const navigate = useNavigate();

    const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        navigate(new URL(e.currentTarget.href).pathname);
    };

    if (matches || block) {
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
                    href={"/seller/"}
                    sx={styles.bottomNavigationAction}
                />
                <BottomNavigationAction
                    label="Products"
                    icon={<StoreIcon />}
                    value={Values.Products}
                    onClick={onClick}
                    LinkComponent={"a"}
                    href={"/seller/products"}
                    sx={styles.bottomNavigationAction}
                />
                {/* <BottomNavigationAction
                    label="Orders"
                    icon={<GroupIcon />}
                    value={Values.Orders}
                    onClick={onClick}
                    LinkComponent={"a"}
                    href={"/seller/orders"}
                    sx={styles.bottomNavigationAction}
                /> */}
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
