import { Button, Paper, Stack, Typography } from "@mui/material";
import React, { Component } from "react";
import Loading from "../../components/Loading";
import { getRequest, postRequest } from "../../utils/http";
import { Link } from "react-router-dom";

type State = {
    loading: boolean;
    failed: boolean;
    orders: any[];

    ssLoading: boolean;
};

type Props = {};

export default class Home extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            loading: true,
            failed: false,
            orders: [],

            ssLoading: false,
        };
    }

    componentDidMount(): void {
        this.fetchOrders();
    }

    fetchOrders = async () => {
        this.setState({ loading: true, failed: false });

        try {
            const orders = await getRequest("/admin/orders");

            this.setState({ loading: false, failed: false, orders });
        } catch (error) {
            this.setState({ loading: true, failed: true });
        }
    };

    changeStatus = async (id: any) => {
        const status = window.prompt("New order status");

        if (!status || status.trim().length === 0) {
            return;
        }

        this.setState({ ssLoading: true });

        try {
            const order = await postRequest("/admin/orders/" + id, { status });
            const orders = [...this.state.orders];
            const index = orders.findIndex((or) => or.id === id);
            orders[index] = { ...orders[index], status };
            this.setState({ ssLoading: false, orders });
        } catch (error) {
            this.setState({ ssLoading: false });
        }
    };

    render() {
        const { loading, failed, orders } = this.state;

        if (loading || failed) {
            return (
                <Stack width="100%" height="100%" sx={{ background: "white" }}>
                    <Stack alignItems="center" justifyContent="center" pt={10}>
                        <Loading failed={failed} onRetry={this.fetchOrders}>
                            <Typography>Try again</Typography>
                        </Loading>
                    </Stack>
                </Stack>
            );
        }

        return (
            <Stack spacing={3}>
                <h3>Welcome to admin dashboard, here you process orders</h3>
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
                                <Button
                                    variant="outlined"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        this.changeStatus(or.id);
                                    }}
                                    sx={{ alignSelf: "flex-start", mt: 2 }}
                                    disabled={this.state.ssLoading}
                                >
                                    Change Status
                                </Button>
                            </Stack>
                        </Link>
                    ))}
                </Stack>
            </Stack>
        );
    }
}
