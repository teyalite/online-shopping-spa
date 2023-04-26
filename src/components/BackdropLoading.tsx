import React, { Component } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

class BackdropLoading extends Component {
    render() {
        return (
            <Backdrop sx={{ color: "#fff", zIndex: 50000 }} open={true}>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }
}

export default BackdropLoading;
