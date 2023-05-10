import { Edit } from "@mui/icons-material";
import {
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import { ProductCategory } from "../../types";

export default function Category({
    category,
    onEdit,
}: {
    category: ProductCategory;
    onEdit: (category: ProductCategory) => void;
}) {
    const { name, children } = category;

    return (
        <>
            <ListItem sx={{ py: 0 }}>
                <ListItemText
                    sx={{
                        "& :hover": {
                            borderBottom: "0.2px solid rgba(0, 0, 0, 0.12)",
                        },
                    }}
                >
                    <Typography fontWeight="bold">{name}</Typography>
                </ListItemText>
                <ListItemIcon>
                    <IconButton onClick={() => onEdit(category)}>
                        <Edit />
                    </IconButton>
                </ListItemIcon>
            </ListItem>
            <List sx={{ ml: 4 }}>
                {children &&
                    children.length !== 0 &&
                    children.map((child) => (
                        <Category
                            key={child.id}
                            category={child}
                            onEdit={onEdit}
                        />
                    ))}
            </List>
        </>
    );
}
