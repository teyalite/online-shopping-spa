import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Component } from "react";
import { Navigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import HomeAppBar from "../components/navigation/HomeAppBar";
import { AuthContext } from "../config/auth.context";
import { AuthContextType } from "../types";
import { getRequest } from "../utils/http";

type State = {
    loading: boolean;
    failed: boolean;
    shop: any;
};

type Props = { shopId: number };

class ShopComp extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            loading: true,
            failed: false,
            shop: {},
        };
    }

    componentDidMount(): void {
        this.fetchShop();
    }

    fetchShop = async () => {
        this.setState({ loading: true, failed: false });

        try {
            const shop = await getRequest("/store/" + this.props.shopId);

            this.setState({ loading: false, failed: false, shop });
        } catch (error) {
            this.setState({ loading: true, failed: true });
        }
    };

    static contextType = AuthContext;

    render() {
        const user = (this.context as AuthContextType).user;

        const { failed, loading, shop } = this.state;

        if (loading || failed) {
            return (
                <Stack sx={{ height: 200, width: 300 }}>
                    <Stack alignItems="center" justifyContent="center" pt={10}>
                        <Loading failed={failed} onRetry={this.fetchShop}>
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
                        {shop.name}
                    </Typography>
                    <Typography>
                        Description: {" " + shop.description}
                    </Typography>
                    <Stack spacing={2}>
                        <Typography>Shop cover:</Typography>
                        <img
                            src={shop.image}
                            alt={shop.name}
                            style={{ width: 300, objectFit: "cover" }}
                        />
                    </Stack>
                </Stack>
            </Stack>
        );
    }
}

export default function Shop() {
    const { shopId } = useParams();

    if (isNaN(Number(shopId))) {
        return <Navigate to={"/not-foung"} />;
    }

    return <ShopComp shopId={Number(shopId)} />;
}
