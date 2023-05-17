import { Add } from "@mui/icons-material";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import SellerForm from "../../components/seller/SellerForm";
import { AuthContext } from "../../config/auth.context";
import { patchRequest } from "../../utils/http";

export default function SellerHome() {
    const context = useContext(AuthContext);

    const { shop } = context.user!;
    const store = shop!;
    const [formState, setFormState] = useState({ show: false, loading: false });

    const submitSellerForm = async (fd: FormData) => {
        setFormState({ ...formState, loading: true });

        try {
            const shop = await patchRequest("/seller/" + store.id, fd);
            context.setUser({ ...context.user!, shop });
            setFormState({ show: false, loading: false });
        } catch (error: any) {
            setFormState({ ...formState, loading: false });
        }
    };

    const editStore = () => {
        setFormState({ ...formState, show: true });
    };

    return (
        <Stack spacing={3}>
            <SellerForm
                open={formState.show}
                loading={formState.loading}
                onSubmit={submitSellerForm}
                shop={{
                    name: store.name,
                    description: store.description,
                }}
                onClose={() => setFormState({ ...formState, show: false })}
            />

            <Stack
                spacing={2}
                direction={{ xs: "column", sm: "row" }}
                alignItems={{ sm: "center", xs: "flex-start" }}
            >
                <Typography variant="h5">Shop details</Typography>
                <Button
                    startIcon={<Add />}
                    variant="outlined"
                    onClick={editStore}
                >
                    Edit shop
                </Button>
            </Stack>

            {!store.approved && (
                <Alert severity="info" sx={{ fontSize: "large" }}>
                    Your seller status hasn't been approved yet
                </Alert>
            )}
            <Stack
                spacing={3}
                direction={{ xs: "column", sm: "row" }}
                justifyContent={{ xs: "normal", sm: "space-around" }}
            >
                <Stack spacing={3}>
                    <Typography>
                        Shop name: <strong>{store.name}</strong>
                    </Typography>

                    <Typography>
                        Shop description: <strong>{store.description}</strong>
                    </Typography>
                </Stack>
                <Stack spacing={2}>
                    <Typography>Shop cover:</Typography>
                    <img
                        src={store.image}
                        alt={store.name}
                        style={{ width: 300, objectFit: "cover" }}
                    />
                </Stack>
            </Stack>
        </Stack>
    );
}
