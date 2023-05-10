import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { ChangeEvent, Component, FormEvent } from "react";
import { ProductCategory } from "../../types";
import Input from "./Input";
import Select from "./Select";
import { SelectChangeEvent } from "@mui/material/Select";

type Props = {
    categories: ProductCategory[];
    category: null | ProductCategory;
    loading: boolean;

    onClose: () => void;
    onSubmit: (data: { name: string; parent?: number; id?: number }) => void;
};

const MIN_WIDTH = 400;

type State = {
    name: string;
    parent?: string;

    triggered: boolean;
};

export default class CategoryForm extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            name: props.category === null ? "" : props.category.name,
            parent:
                props.category !== null && props.category.parent
                    ? String(props.category.parent)
                    : undefined,

            triggered: false,
        };
    }

    handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            name: e.currentTarget.value,
        });
    };

    handleParent = (event: SelectChangeEvent) => {
        this.setState({
            parent:
                event.target.value.trim().length === 0
                    ? undefined
                    : event.target.value,
        });
    };

    handleSubmit = () => {
        console.log("Submit");
    };

    render() {
        const { onClose, category, loading, categories } = this.props;
        const { triggered, name, parent } = this.state;

        return (
            <Dialog open onClose={onClose} scroll="paper">
                <Box sx={styles.header}>
                    <DialogTitle>
                        <Typography
                            noWrap
                            sx={{ maxWidth: 350, fontWeight: "bold" }}
                        >
                            {(category === null ? "Create" : "Edit") +
                                " product category"}
                        </Typography>
                    </DialogTitle>

                    <IconButton
                        onClick={onClose}
                        disabled={loading}
                        color="error"
                        sx={styles.closeIconButton}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>

                <DialogContent>
                    <DialogContentText component="div" tabIndex={-1}>
                        <Box sx={styles.form} style={{ minWidth: MIN_WIDTH }}>
                            <Stack
                                spacing={2}
                                component="form"
                                onSubmit={(e: FormEvent<HTMLFormElement>) => {
                                    e.preventDefault();
                                    this.handleSubmit();
                                }}
                                autoComplete="off"
                            >
                                <Input
                                    placeholder="Title"
                                    size="medium"
                                    value={name}
                                    onChange={this.handleChangeName}
                                    error={
                                        triggered && name.trim().length === 0
                                    }
                                    errorMessage="Name is required"
                                    sx={styles.input}
                                />

                                <Select
                                    items={categories.map((cat) => ({
                                        label: cat.name,
                                        value: String(cat.id),
                                    }))}
                                    value={parent ?? ""}
                                    onChange={this.handleParent}
                                    placeholder="Parent category"
                                />
                            </Stack>
                        </Box>
                    </DialogContentText>
                </DialogContent>

                <DialogActions sx={styles.DialogActions}>
                    <Stack direction="row" spacing={5} pb={2} px={2}>
                        {loading ? (
                            <LoadingButton loading variant="outlined" fullWidth>
                                Submit
                            </LoadingButton>
                        ) : (
                            <>
                                <Button
                                    onClick={onClose}
                                    color="error"
                                    variant="contained"
                                    disableElevation
                                >
                                    Cancel
                                </Button>

                                <Button
                                    onClick={this.handleSubmit}
                                    color="success"
                                    variant="contained"
                                    disableElevation
                                >
                                    Submit
                                </Button>
                            </>
                        )}
                    </Stack>
                </DialogActions>
            </Dialog>
        );
    }
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
