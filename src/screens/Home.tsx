import { Box, Container, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Component } from "react";
import { ConnectedProps, connect } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ProductReg from "../components/Product";
import HomeAppBar from "../components/navigation/HomeAppBar";
import { AppState } from "../redux/store";
import { fetchProductsCreator, shopcartCreator } from "../redux/home/actions";
import { getRequest } from "../utils/http";
import { sleep } from "../utils/sleep";
import Loading from "../components/Loading";

type Props = PropsFromRedux;

function Home(props: Props) {
    const [searchParams] = useSearchParams();
    const category = isNaN(Number(searchParams.get("category") ?? undefined))
        ? undefined
        : Number(searchParams.get("category"));

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
                <HomeProducts
                    {...props}
                    category={category}
                    key={category ? String(category) + "home" : "homeee"}
                />
            </Box>
        </Stack>
    );
}

const mapDispatchToProps = {
    fetch: fetchProductsCreator,
    shopcartAdd: shopcartCreator,
};

function mapStateToProps(state: AppState) {
    return {
        store: { ...state.home.products },
        shopcart: { ...state.home.shopcart },
    };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

class HomeProducts extends Component<{ category?: number } & PropsFromRedux> {
    componentDidMount(): void {
        if (
            (!this.props.store.loading &&
                this.props.store.products.length === 0) ||
            this.props.store.category !== this.props.category
        ) {
            this.fetchProducts();
        }
    }

    fetchProducts = async () => {
        const { fetch, category } = this.props;

        fetch({
            ...this.props.store,
            loading: true,
            failed: false,
            category: category === undefined ? null : category,
        });

        let path = "/products";

        if (category !== undefined) {
            path += "?category=" + category;
        }

        try {
            const products = await getRequest(path);

            fetch({
                ...this.props.store,
                loading: false,
                failed: false,
                products: products,
            });
        } catch (error) {
            fetch({
                ...this.props.store,
                loading: false,
                failed: true,
            });
        }
    };

    render() {
        const { loading, failed, products } = this.props.store;

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
                    <Stack alignItems="center" justifyContent="center" pt={10}>
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            textAlign="center"
                        >
                            There is no product for this category
                        </Typography>
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
    }
}

export default connector(Home);
