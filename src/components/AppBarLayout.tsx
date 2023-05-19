import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Outlet } from "react-router-dom";
import AppBar from "./navigation/AppBar";
import BottomNavigation from "./BottomNavigation";
import Footer from "./Footer";
import { AppState } from "../redux/store";
import { ConnectedProps, connect } from "react-redux";

function AppBarLayout(props: PropsFromRedux) {
    const count = Object.keys(props.shopcart).filter(
        (x) => props.shopcart[Number(x)] > 0
    ).length;

    return (
        <Box
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
            }}
        >
            <AppBar count={count} />
            <Stack
                sx={{
                    paddingTop: { xs: 0, md: 0 },
                    pb: 10,
                    flexGrow: 1,
                }}
                direction="column"
                alignItems="center"
            >
                <Outlet />
            </Stack>
            <Footer />
            <BottomNavigation count={count} />
        </Box>
    );
}

const mapDispatchToProps = {};

function mapStateToProps(state: AppState) {
    return {
        shopcart: { ...state.home.shopcart },
    };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AppBarLayout);
