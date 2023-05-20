import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import { Component } from "react";
import { ConnectedProps, connect } from "react-redux";
import Loading from "../../components/Loading";
import Product from "../../components/seller/Product";
import { fetchProductsCreator } from "../../redux/seller/actions";
import { ProductItem } from "../../redux/seller/types";
import { AppState } from "../../redux/store";
import { getRequest, postRequest } from "../../utils/http";
import ProductForm from "../../components/seller/ProductForm";

type Props = {} & PropsFromRedux;

type State = {
    openForm: boolean;
};

class SellerProducts extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            openForm: false,
        };
    }

    componentDidMount(): void {
        if (
            !this.props.store.loading &&
            this.props.store.products.length === 0 &&
            this.props.store.categories.length === 0
        ) {
            this.fetchProducts();
        }
    }

    fetchProducts = async () => {
        const { fetch } = this.props;

        fetch({
            ...this.props.store,
            loading: true,
            failed: false,
        });

        try {
            const data = await getRequest("/seller/product");

            fetch({
                ...this.props.store,
                loading: false,
                failed: false,
                products: Array.isArray(data) ? [] : data.products,
                categories: Array.isArray(data) ? [] : data.categories,
            });
        } catch (error) {
            fetch({
                ...this.props.store,
                loading: false,
                failed: true,
            });
        }
    };

    addProduct = () => {
        this.setState({ openForm: true });
    };

    submit = async (fd: FormData) => {
        try {
            console.log(await postRequest("/seller/product", fd));
        } catch (error) {}
    };

    render() {
        const { products, loading, failed, categories } = this.props.store;

        if (loading || failed) {
            return (
                <Stack width="100%" height="100%" sx={{ background: "white" }}>
                    <Stack alignItems="center" justifyContent="center" pt={10}>
                        <Loading failed={failed} onRetry={this.fetchProducts}>
                            <Typography>Try again</Typography>
                        </Loading>
                    </Stack>
                </Stack>
            );
        }

        return (
            <Stack spacing={3}>
                <ProductForm
                    open={this.state.openForm}
                    onSubmit={this.submit}
                    onClose={() => this.setState({ openForm: false })}
                    loading={false}
                />
                <Stack
                    spacing={2}
                    direction={{ xs: "column", sm: "row" }}
                    alignItems={{ sm: "center", xs: "flex-start" }}
                >
                    <Typography variant="h5">Your products</Typography>
                    <Button
                        startIcon={<Add />}
                        variant="outlined"
                        onClick={this.addProduct}
                    >
                        Add Product
                    </Button>
                </Stack>

                <GridProducts products={products} />
            </Stack>
        );
    }
}

function GridProducts({ products }: { products: ProductItem[] }) {
    const editProduct = (product: ProductItem) => {
        console.log("Edit product");
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                pb: 6,
            }}
        >
            {products.map((product) => (
                <Product
                    product={product}
                    key={product.id}
                    onEdit={editProduct}
                />
            ))}
        </Box>
    );
}

const mapDispatchToProps = {
    fetch: fetchProductsCreator,
};

function mapStateToProps(state: AppState) {
    return {
        store: { ...state.seller.products },
    };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SellerProducts);
