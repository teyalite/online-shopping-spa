import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { CSSProperties, ChangeEvent, Component, FormEvent } from "react";
import Input from "../admin/Input";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import ImageField from "../ImageField";

export const IMAGE_SIZE_LIMIT = 1024 * 1024 * 10;

export const FILE_SIZE_UNIT = ["Bytes", "KB", "MB", "GB"];

export const IMAGE_ALLOWED_TYPES = [
    ".jpg",
    ".jpeg",
    ".jpe",
    ".png",
    ".gif",
    ".webp",
    ".svg",
];

export const IMAGE_ALLOWED_MIME_TYPES = [
    "image/jpeg",
    "image/gif",
    "image/png",
    "image/webp",
    "image/svg+xml",
];

const MIN_WIDTH = 400;

type Props = {
    shop: {} | null;
    open?: boolean;
    loading: boolean;
    onSubmit: (fd: FormData) => void;
    onClose: () => void;
};

type State = {
    name: string;
    description: string;

    imageSrc: string | undefined;
    imageFile: File | undefined;

    triggered: boolean;
};

export default class SellerForm extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            name: "",
            description: "",

            imageSrc: undefined,
            imageFile: undefined,

            triggered: false,
        };
    }

    handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            name: e.currentTarget.value,
        });
    };

    handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            description: e.currentTarget.value,
        });
    };

    handleImageChange = ({
        imageFile,
        imageSrc,
    }: {
        imageSrc: string | undefined;
        error: boolean;
        imageFile: undefined | File;
    }) => {
        this.setState({
            imageFile,
            imageSrc,
        });
    };

    handleSubmit = () => {};

    render() {
        const { loading, shop, onClose, open } = this.props;
        const { name, triggered, description, imageSrc } = this.state;

        return (
            <Dialog open={Boolean(open)} onClose={onClose} scroll="paper">
                <Box sx={styles.header}>
                    <DialogTitle>
                        <Typography
                            noWrap
                            sx={{ maxWidth: 500, fontWeight: "bold" }}
                        >
                            {(shop === null ? "Create" : "Edit") + " shop"}
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
                                <Input
                                    placeholder="Description"
                                    size="medium"
                                    multiline
                                    value={description}
                                    onChange={this.handleChangeDescription}
                                    error={
                                        triggered &&
                                        description.trim().length === 0
                                    }
                                    errorMessage="Description is required"
                                    sx={styles.input}
                                />
                                <ImageField
                                    placeholder="Upload shop image"
                                    onChange={this.handleImageChange}
                                    imageSrc={imageSrc}
                                    error={imageSrc === undefined && triggered}
                                    errorMessage={"Image is required"}
                                    allowedTypes={IMAGE_ALLOWED_TYPES}
                                    allowedMimeTypes={IMAGE_ALLOWED_MIME_TYPES}
                                    sizeLimit={IMAGE_SIZE_LIMIT}
                                    invalidTypeMessage="Invalid image type"
                                    sizeLimitMessage="Image size too large"
                                    helperMessage={
                                        imageSrc !== undefined
                                            ? "Click the image to change it"
                                            : ""
                                    }
                                    imageProcessFailMessage="Image processing failed"
                                    imageStyle={styles.imageStyle}
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
    imageStyle: {
        width: "300px",
        height: "300px",
    } as CSSProperties,
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
