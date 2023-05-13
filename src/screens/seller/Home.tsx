import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { AuthContext, AuthContextProvider } from "../../config/auth.context";
import Button from "@mui/material/Button";
import { Add } from "@mui/icons-material";
import Alert from "@mui/material/Alert";

export default function SellerHome() {
    const { shop } = useContext(AuthContext).user!;
    const store = shop!;

    const editStore = () => {
        console.log("editStore");
    };

    return (
        <Stack spacing={3}>
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
