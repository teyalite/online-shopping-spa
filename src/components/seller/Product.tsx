import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { ProductItem } from "../../redux/seller/types";

export default function Product({
    product,
    onEdit,
}: {
    product: ProductItem;
    onEdit: (p: ProductItem) => void;
}) {
    const editProduct = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onEdit(product);
    };

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
            to=""
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
                <Button
                    variant="contained"
                    disableElevation
                    sx={{ fontWeight: "bold" }}
                    onClick={editProduct}
                >
                    Edit product
                </Button>
            </Stack>
        </Stack>
    );
}
