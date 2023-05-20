import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Component } from "react";
import { ConnectedProps, connect } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import ProductReg from "../components/Product";
import HomeAppBar from "../components/navigation/HomeAppBar";
import { AuthContext } from "../config/auth.context";
import { shopcartCreator } from "../redux/home/actions";
import { ProductItem } from "../redux/home/types";
import { AppState } from "../redux/store";
import { AuthContextType } from "../types";
import SearchBar from "../components/Search";
import { getRequest } from "../utils/http";

type State = {
    loading: boolean;
    failed: boolean;
    products: ProductItem[];
};

type Props = { text: string } & PropsF;

class SearchComp extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            loading: true,
            failed: false,
            products: [],
        };
    }

    componentDidMount(): void {
        this.fetchProducts();
    }

    fetchProducts = async () => {
        this.setState({ loading: true, failed: false });

        try {
            const products = await getRequest(
                "/search?search=" + this.props.text
            );

            this.setState({ loading: false, failed: false, products });
        } catch (error) {
            this.setState({ loading: true, failed: true });
        }
    };

    static contextType = AuthContext;

    render() {
        const user = (this.context as AuthContextType).user;

        const { failed, loading, products } = this.state;

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
                <Box
                    sx={{
                        display: { xs: "block", md: "none" },
                        marginBottom: 3,
                    }}
                >
                    <SearchBar />
                </Box>
                <Typography
                    variant="h6"
                    sx={{ width: "100%" }}
                    textAlign="center"
                >
                    Search text is "{this.props.text}"
                </Typography>
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
                    {products.length <= 0 && (
                        <Typography>No product for this search text</Typography>
                    )}
                    {products.length > 0 &&
                        products.map((pr) => (
                            <ProductReg
                                product={pr}
                                key={pr.id}
                                shopcart={this.props.shopcart}
                                shopcartAdd={this.props.shopcartAdd}
                            />
                        ))}
                </Box>
            </Stack>
        );
    }
}

function Search(props: PropsF) {
    const { text } = useParams();

    return <SearchComp text={text!} key={text} {...props} />;
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

const mapDispatchToProps = {
    shopcartAdd: shopcartCreator,
};

function mapStateToProps(state: AppState) {
    return {
        shopcart: { ...state.home.shopcart },
    };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsF = ConnectedProps<typeof connector>;

export default connector(Search);
