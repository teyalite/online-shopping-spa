import { Button, IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { MouseEvent } from "react";
import { Link } from "react-router-dom";
import { ProductItem } from "../redux/home/types";
import { Add, Remove } from "@mui/icons-material";

export default function ProductReg({
    product,
    shopcart,
    shopcartAdd,
}: {
    product: ProductItem;
    shopcart: { [key: number]: number };
    shopcartAdd: (d: { key: number; value: number }) => void;
}) {
    const addCart = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        shopcartAdd({ key: product.id, value: 1 });
    };

    const plus = (e: MouseEvent<HTMLButtonElement>) => {
        if (shopcart[product.id] < product.quantity) {
            shopcartAdd({ key: product.id, value: shopcart[product.id] + 1 });
        }
    };

    const minus = (e: MouseEvent<HTMLButtonElement>) => {
        if (shopcart[product.id] > 0) {
            shopcartAdd({ key: product.id, value: shopcart[product.id] - 1 });
        }
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
                {shopcart[product.id] ? (
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        spacing={2}
                        fontSize="large"
                        onClick={(e) => e.preventDefault()}
                    >
                        <IconButton onClick={plus}>
                            <Add />
                        </IconButton>
                        <Typography>{shopcart[product.id]}</Typography>
                        <IconButton onClick={minus}>
                            <Remove />
                        </IconButton>
                    </Stack>
                ) : (
                    <Button
                        variant="contained"
                        disableElevation
                        sx={{ fontWeight: "bold" }}
                        onClick={addCart}
                    >
                        Add to cart
                    </Button>
                )}
            </Stack>
        </Stack>
    );
}
