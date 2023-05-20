import { Add, Remove } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import { ProductItem } from "../redux/home/types";

export default function ProductOrd({ product }: { product: ProductItem }) {
    return (
        <Stack
            alignItems="center"
            spacing={1}
            mx={{ xs: 2, sm: 0.5, md: 2 }}
            mt={5}
            sx={{
                width: { xs: "320px", sm: "300px", md: "320px" },
                height: "368px",
            }}
            component={Link}
            to={"/product/" + product.id}
        >
            <img
                src={product.images[0]}
                alt={product.name}
                style={{
                    width: "calc(100% - 10px)",
                    height: "180px",
                    objectFit: "cover",
                }}
            />
            <Stack flexGrow={1} width="100%" sx={{}} p={0.5} spacing={1}>
                <Stack spacing={0.5}>
                    <Typography fontWeight="bold">
                        {product.price + " Φ"}
                    </Typography>
                    <Typography fontWeight="bold">
                        {"Quantity: " + product.quantity}
                    </Typography>
                    <Typography sx={{ height: "48px" }}>
                        {product.name}
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    );
}
