import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Component, PropsWithChildren } from "react";
import { AuthContext } from "../../config/auth.context";
import SellerForm from "./SellerForm";
import { AuthContextType } from "../../types";
import { getRequest } from "../../utils/http";
import Loading from "../Loading";
import AppBar from "./AppBar";
import BottomNavigation from "./BottomNavigation";
import { Outlet } from "react-router-dom";
import SellerHome from "../../screens/seller/Home";

type Props = {};

type State = {
    localLoading: boolean;
    formLoading: boolean;
    formMessage: string;
    failed: boolean;
    showForm: boolean;
};

export class CheckSeller extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            localLoading: true,
            failed: false,
            formMessage: "",
            formLoading: false,

            showForm: false,
        };
    }

    componentDidMount(): void {
        const { shop } = (this.context as AuthContextType).user!;

        if (shop !== undefined) {
            return this.setState({ localLoading: false });
        }

        this.sellerCheck();
    }

    sellerCheck = async () => {
        const { setUser, user } = this.context as AuthContextType;
        const usr = user!;

        this.setState({ localLoading: true, failed: false });

        try {
            const store = await getRequest("/seller");

            if (!store) {
                setUser({ ...usr, shop: null });
            } else {
                setUser({ ...usr, shop: store });
            }

            this.setState({ localLoading: false });
        } catch (error) {
            console.log(error);
        }
    };

    submitSellerForm = async (fd: FormData) => {};

    static contextType = AuthContext;

    render() {
        const { loading, user } = this.context as AuthContextType;
        const { shop } = user!;
        const { failed, localLoading, formLoading, showForm } = this.state;

        if (loading || failed || localLoading) {
            return (
                <Stack width="100%" height="100%" sx={{ background: "white" }}>
                    <Stack alignItems="center" justifyContent="center" pt={10}>
                        <Loading failed={failed} onRetry={this.sellerCheck}>
                            <Typography>Try again</Typography>
                        </Loading>
                    </Stack>
                </Stack>
            );
        }

        if (shop === null) {
            return (
                <Stack
                    width="100%"
                    height="100%"
                    sx={{
                        background: "white",
                        justifyContent: { xs: "normal", sm: "space-between" },
                    }}
                    spacing={3}
                    direction={{ xs: "column", sm: "row" }}
                >
                    <Stack spacing={2}>
                        <Typography variant="h4" fontWeight="bold">
                            Beginners are lucky on Online Shopping
                        </Typography>
                        <Typography variant="h6">
                            Have you ever sold on the marketplace? <br />
                            Or maybe you never sold at all?
                        </Typography>
                        <Typography fontWeight="bold">
                            Register for free
                        </Typography>
                    </Stack>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                alignSelf: "center",
                                px: 3,
                                fontWeight: "bold",
                                fontSize: "large",
                            }}
                            size="large"
                            disableElevation
                            onClick={() => this.setState({ showForm: true })}
                        >
                            Register now
                        </Button>
                    </div>
                    <SellerForm
                        open={showForm}
                        loading={formLoading}
                        onSubmit={this.submitSellerForm}
                        shop={null}
                        onClose={() => this.setState({ showForm: false })}
                    />
                </Stack>
            );
        }

        const store = shop!;

        if (store.approved) {
            return <Outlet />;
        }

        return <SellerHome />;
    }
}

export default function SellerLayout({ children }: PropsWithChildren) {
    return (
        <Box
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
            }}
        >
            <AppBar />
            <Stack
                sx={{ paddingTop: 3, pb: 10, width: "100%" }}
                direction="column"
                component={Container}
            >
                {children}
            </Stack>
            <BottomNavigation />
        </Box>
    );
}
