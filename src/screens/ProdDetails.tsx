import { Box, Button, Paper } from "@mui/material";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ChangeEvent, Component } from "react";
import { Navigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import ProductOrd from "../components/ProductOrd";
import HomeAppBar from "../components/navigation/HomeAppBar";
import { ProductItem } from "../redux/home/types";
import { getRequest, postRequest } from "../utils/http";
import { sleep } from "../utils/sleep";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Input from "../components/admin/Input";
import { AuthContext } from "../config/auth.context";
import { AuthContextType } from "../types";

type State = {
    loading: boolean;
    failed: boolean;
    product: any;
    ssloading: boolean;
    review: string;
};

type Props = { productId: number };

class ProdDetailsComp extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            loading: true,
            failed: false,
            product: {},
            ssloading: false,

            review: "",
        };
    }

    componentDidMount(): void {
        this.fetchProducts();
    }

    fetchProducts = async () => {
        this.setState({ loading: true, failed: false });

        try {
            const product = await getRequest(
                "/product/" + this.props.productId
            );

            this.setState({ loading: false, failed: false, product });
        } catch (error) {
            this.setState({ loading: true, failed: true });
        }
    };

    handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            review: e.currentTarget.value,
        });
    };

    submit = async () => {
        if (this.state.review.trim().length === 0) {
            return;
        }

        this.setState({ ssloading: true });

        try {
            const review = await postRequest("/customer/review", {
                id: this.props.productId,
                review: this.state.review,
            });

            this.setState({
                ssloading: false,
                product: {
                    ...this.state.product,
                    reviews: [...this.state.product.reviews, review],
                },
                review: "",
            });
        } catch (error) {
            this.setState({ ssloading: false });
        }
    };

    static contextType = AuthContext;

    render() {
        const user = (this.context as AuthContextType).user;

        const { failed, loading, product } = this.state;

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
                    <Typography variant="h6" fontWeight="bold">
                        {product.product.name}
                    </Typography>
                    <Typography>
                        Description: {" " + product.product.description}
                    </Typography>
                    <Typography>
                        Quantity: {" " + product.product.quantity}
                    </Typography>
                    <Typography>
                        Price: {" " + product.product.price + " Φ"}
                    </Typography>
                    <Typography>
                        Category: {" " + product.product.product_category.name}
                    </Typography>
                    <ImageList sx={{ width: "100%", height: "auto" }}>
                        {product.product.images.map((item: string) => (
                            <ImageListItem
                                key={item}
                                style={{
                                    width: "200px",
                                    height: "200px",
                                }}
                            >
                                <img
                                    src={item}
                                    alt={"Hello"}
                                    style={{
                                        width: "200px",
                                        height: "200px",
                                    }}
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                    <Stack direction="column" spacing={3}>
                        <Typography variant="h5">Anonymous reviews</Typography>
                        {product.reviews.map((re: any) => (
                            <Stack
                                component={Paper}
                                elevation={3}
                                spacing={2}
                                key={re.id}
                                p={2}
                            >
                                <Typography fontWeight="bold">
                                    {re.user}
                                </Typography>
                                <Typography>{re.review}</Typography>
                            </Stack>
                        ))}

                        {user && (
                            <Stack
                                direction={"column"}
                                alignItems="center"
                                justifyContent={"center"}
                                spacing={2}
                            >
                                <Input
                                    placeholder="Review"
                                    size="medium"
                                    value={this.state.review}
                                    onChange={this.handleChangeName}
                                    helperText="Review is required"
                                    sx={styles.input}
                                />
                                <Button
                                    variant="contained"
                                    disableElevation
                                    onClick={this.submit}
                                    disabled={this.state.ssloading}
                                >
                                    Submit Review
                                </Button>
                            </Stack>
                        )}
                    </Stack>
                </Stack>
            </Stack>
        );
    }
}

export default function ProdDetails() {
    const { productId } = useParams();

    if (isNaN(Number(productId))) {
        return <Navigate to={"/not-foung"} />;
    }

    return <ProdDetailsComp productId={Number(productId)} />;
}

const styles = {
    input: {
        maxWidth: "500px",
        alignSelf: "center",
        width: "100%",
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        py: 2,
        backgroundColor: "rgba(47, 128, 237, 0.2)",
    },
    closeIconButton: {
        textTransform: "none",
        marginRight: 3,
    },
    form: {
        marginBottom: 1,
    },
    DialogActions: {},
};
