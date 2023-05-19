import { Box, Button, Container, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Component } from "react";
import { ConnectedProps, connect } from "react-redux";
import Loading from "../components/Loading";
import ProductReg from "../components/Product";
import HomeAppBar from "../components/navigation/HomeAppBar";
import { shopcartCreator } from "../redux/home/actions";
import { ProductItem } from "../redux/home/types";
import { AppState } from "../redux/store";
import { Link, Navigate } from "react-router-dom";
import { getRequest, postRequest } from "../utils/http";
import theme from "../utils/theme";

type State = {
    loading: boolean;
    failed: boolean;
    products: ProductItem[];
    red: boolean;
};

class Shopcart extends Component<PropsFromRedux, State> {
    constructor(props: PropsFromRedux) {
        super(props);
        this.state = {
            loading: !true,
            failed: false,
            products: [],
            red: false,
        };
    }

    componentDidMount(): void {
        this.fetchProducts();
    }

    fetchProducts = async () => {
        this.setState({ loading: true, failed: false });

        const ids = Object.keys(this.props.shopcart).filter(
            (x) => this.props.shopcart[Number(x)] > 0
        );

        if (ids.length === 0) {
            return this.setState({ loading: false });
        }

        try {
            const products = await getRequest("/products?ids=" + ids.join(","));

            this.setState({ products, loading: false, failed: false });
        } catch (error) {
            this.setState({ loading: true, failed: true });
        }
    };

    makeOrder = async () => {
        const address = window.prompt("Delivery address")?.trim();

        if (!address || address.length == 0) {
            return;
        }

        this.setState({ loading: true });
        const { products } = this.state;
        const { shopcart, shopcartAdd } = this.props;

        const f_products = products.filter(
            (p) => shopcart[p.id] && shopcart[p.id] > 0
        );

        try {
            await postRequest("/customer/orders", {
                products: f_products.map((p) => ({
                    id: p.id,
                    quantity: shopcart[p.id],
                })),
                address,
            });

            this.setState({ loading: false, red: true });
            shopcartAdd({ key: -1, value: -1 });
        } catch (error) {
            this.setState({ loading: false });
        }
    };

    body = (products: ProductItem[]) => {
        const { loading, failed, red } = this.state;

        if (red) {
            return <Navigate to="/profile#orders" />;
        }

        if (loading || failed) {
            return (
                <Stack sx={{ height: 200, width: 300 }}>
                    <Stack alignItems="center" justifyContent="center" pt={10}>
                        <Loading failed={failed} onRetry={this.fetchProducts}>
                            <Typography>Try again</Typography>
                        </Loading>
                    </Stack>
                </Stack>
            );
        }

        if (products.length === 0) {
            return (
                <Stack sx={{ height: 200, width: 300 }}>
                    <Stack
                        alignItems="center"
                        justifyContent="center"
                        pt={10}
                        spacing={2}
                    >
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            textAlign="center"
                        >
                            There is no product in your shopcart
                        </Typography>
                        <Link to="/">
                            <Button variant="contained" disableElevation>
                                Shop now
                            </Button>
                        </Link>
                    </Stack>
                </Stack>
            );
        }

        return (
            <>
                {products.map((pr) => (
                    <ProductReg
                        product={pr}
                        key={pr.id}
                        shopcart={this.props.shopcart}
                        shopcartAdd={this.props.shopcartAdd}
                    />
                ))}
            </>
        );
    };

    render() {
        const { products } = this.state;
        const { shopcart } = this.props;

        const f_products = products.filter(
            (p) => shopcart[p.id] && shopcart[p.id] > 0
        );

        const sum = f_products.reduce((x, ac) => ac.price + x, 0);

        return (
            <Stack
                component={Container}
                sx={{
                    width: "100%",
                    height: "100%",
                    pt: { xs: 10, md: 6 },
                }}
            >
                <HomeAppBar />
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "center",
                        pb: 6,
                    }}
                >
                    {this.body(f_products)}
                    {f_products.length > 0 && (
                        <Stack
                            sx={{
                                position: "fixed",
                                bottom: { xs: "57px", md: 0 },
                                background: "#33bfff",
                                left: 0,
                                right: 0,
                                py: 2,
                                alignItems: "center",
                                justifyContent: "space-evenly",
                                zIndex: 1000000,
                            }}
                            component={Container}
                            spacing={2}
                            direction="row"
                        >
                            <Typography variant="h5" fontWeight="bold">
                                {"Total: " + sum + " Φ"}
                            </Typography>
                            <Button
                                disableElevation
                                sx={{ alignSelf: "flex-start" }}
                                size="large"
                                variant="contained"
                                onClick={this.makeOrder}
                            >
                                Make the order
                            </Button>
                        </Stack>
                    )}
                </Box>
            </Stack>
        );
    }
}

const mapDispatchToProps = {
    shopcartAdd: shopcartCreator,
};

function mapStateToProps(state: AppState) {
    return {
        shopcart: { ...state.home.shopcart },
    };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Shopcart);
