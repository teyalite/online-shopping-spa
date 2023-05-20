import React, { Component } from "react";
import HomeAppBar from "../components/navigation/HomeAppBar";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import { AuthContext } from "../config/auth.context";
import { AuthContextType } from "../types";
import Typography from "@mui/material/Typography";
import Loading from "../components/Loading";
import { getRequest } from "../utils/http";
import { Paper } from "@mui/material";
import { Link } from "react-router-dom";

type State = {
    loading: boolean;
    failed: boolean;
    orders: any[];
};

export default class Profile extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            loading: true,
            failed: false,
            orders: [],
        };
    }

    componentDidMount(): void {
        this.fetchOrders();
    }

    static contextType = AuthContext;

    fetchOrders = async () => {
        this.setState({ loading: true, failed: false });

        try {
            const orders = await getRequest("/customer/orders");

            this.setState({ loading: false, failed: false, orders });
        } catch (error) {
            this.setState({ loading: true, failed: true });
        }
    };

    render() {
        const user = (this.context as AuthContextType).user!;
        const { failed, loading, orders } = this.state;

        if (loading || failed) {
            return (
                <Stack sx={{ height: 200, width: 300 }}>
                    <Stack alignItems="center" justifyContent="center" pt={10}>
                        <Loading failed={failed} onRetry={this.fetchOrders}>
                            <Typography>Try again</Typography>
                        </Loading>
                    </Stack>
                </Stack>
            );
        }

        return (
            <Stack
                component={Container}
                sx={{
                    width: "100%",
                    height: "100%",
                    pt: { xs: 11, md: 6 },
                }}
            >
                <HomeAppBar />
                <Typography variant="h5" sx={{ mb: 3 }}>
                    Hello {user.email?.split("@")[0]}, your orders appear here
                </Typography>
                <Stack direction="column" spacing={3}>
                    {orders.map((or) => (
                        <Link to={"/orders/" + or.id} key={or.id}>
                            <Stack component={Paper} elevation={3} p={2}>
                                <Typography>
                                    {"Order number: " + or.id}
                                </Typography>
                                <Typography>
                                    {"Date of order: " +
                                        or.created_at.split("T")[0]}
                                </Typography>
                                <Typography>
                                    {"Address: " + or.address}
                                </Typography>
                                <Typography>
                                    {"Status: " + or.status}
                                </Typography>
                            </Stack>
                        </Link>
                    ))}
                </Stack>
            </Stack>
        );
    }
}
