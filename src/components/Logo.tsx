import { Box, SxProps } from "@mui/material";
import logo from "../assets/images/online-shop-logo.png";
import { Link } from "react-router-dom";

export default function Logo({
    sx = { width: "100px", height: "54px" },
    disabled = false,
}: {
    sx?: SxProps;
    disabled?: boolean;
}) {
    if (disabled) {
        return <Box sx={sx} src={logo} alt="" component="img" />;
    }

    return (
        <Link to="/">
            <Box sx={sx} src={logo} alt="" component="img" />
        </Link>
    );
}
