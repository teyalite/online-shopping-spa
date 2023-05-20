import { Box, Paper } from "@mui/material";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Component } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import HomeAppBar from "../components/navigation/HomeAppBar";
import { getRequest } from "../utils/http";
import { ProductItem } from "../redux/home/types";
import ProductReg from "../components/Product";
import ProductOrd from "../components/ProductOrd";

type State = {
    loading: boolean;
    failed: boolean;
    order: any;
};

type Props = { orderId: number };

class OrderComp extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            loading: true,
            failed: false,
            order: {},
        };
    }

    componentDidMount(): void {
        this.fetchOrders();
    }

    fetchOrders = async () => {
        this.setState({ loading: true, failed: false });

        try {
            const order = await getRequest(
                "/customer/orders/" + this.props.orderId
            );

            this.setState({ loading: false, failed: false, order });
        } catch (error) {
            this.setState({ loading: true, failed: true });
        }
    };

    render() {
        const { failed, loading, order } = this.state;

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

        const sum = order.products.reduce(
            (x: number, ac: any) => ac.price * ac.quantity + x,
            0
        );

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
                <Stack direction="column" spacing={3}>
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                    >{`Order number ${order.id} details`}</Typography>
                    <Typography>{"Total: " + sum + " Φ"}</Typography>
                    <Typography>{"Status: " + order.status}</Typography>
                    <Typography>
                        {"Date of order: " + order.created_at.split("T")[0]}
                    </Typography>
                    <Typography>{"Address: " + order.address}</Typography>
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            alignItems: "center",
                            justifyContent: "center",
                            pb: 6,
                        }}
                    >
                        {order.products.map((p: ProductItem) => (
                            <ProductOrd product={p} key={p.id} />
                        ))}
                    </Box>
                </Stack>
            </Stack>
        );
    }
}

export default function Order() {
    const { orderId } = useParams();

    if (isNaN(Number(orderId))) {
        return <Navigate to={"/not-foung"} />;
    }

    return <OrderComp orderId={Number(orderId)} />;
}
