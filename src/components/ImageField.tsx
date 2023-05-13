import React, {
    Component,
    CSSProperties,
    createRef,
    RefObject,
    ChangeEvent,
} from "react";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";

export function fileExtension(filename: string): string {
    const extension = filename.split(".");
    return "." + extension[extension.length - 1].toLowerCase();
}

type Props = {
    placeholder: string;
    error: boolean;
    errorMessage?: string; // Error message to display when an error occurs
    helperMessage?: string; // Helper message to display as hints or guidance
    imageSrc?: string | undefined;

    // Call this once an image is selected and processed
    onChange: (data: {
        imageSrc: string | undefined;
        error: boolean;
        imageFile: undefined | File;
    }) => void;

    // Error message when image processing fails
    imageProcessFailMessage: string;

    // imageStyle: CSSProperties;

    // File type and MimeTypes
    allowedTypes: string[];
    allowedMimeTypes: string[];
    invalidTypeMessage: string;
    // When file size exceeds
    sizeLimit: number;
    sizeLimitMessage: string;

    imageStyle?: CSSProperties;
};

// todo: helper text left margin

export default class ImageField extends Component<Props, any> {
    private input: RefObject<HTMLInputElement>; // reference to the input element
    private mounted: boolean;

    constructor(props: Props) {
        super(props);
        this.state = {};
        this.input = createRef();
        this.mounted = false;
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    // When clicked on image select
    onSelectButtonClick = () => {
        if (this.input !== null && this.input.current) {
            this.input.current.click();
        }
    };

    // Handle Input File process
    // handle only one file selection
    handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
        const {
            imageProcessFailMessage,
            allowedTypes,
            sizeLimit,
            sizeLimitMessage,
            invalidTypeMessage,
            allowedMimeTypes,
        } = this.props;

        if (!event.target.files || event.target.files.length < 1) {
            return;
        }

        const file = event.target.files[0];

        if (
            !allowedTypes.includes(fileExtension(file.name)) ||
            !allowedMimeTypes.includes(file.type)
        ) {
            window.alert(invalidTypeMessage);
            return;
        }

        if (file.size > sizeLimit) {
            window.alert(sizeLimitMessage);
            return;
        }

        const reader = new FileReader();

        // When successfylly loaded
        reader.onload = (event: ProgressEvent<FileReader>) => {
            if (!this.mounted) return;

            this.props.onChange({
                imageSrc: reader.result as string,
                error: false,
                imageFile: file,
            });
        };

        // When error occurs
        reader.onerror = (event: ProgressEvent<FileReader>) => {
            if (!this.mounted) return;

            this.props.onChange({
                imageSrc: undefined,
                error: true,
                imageFile: undefined,
            });

            window.alert(imageProcessFailMessage);
        };

        reader.readAsDataURL(file);
    };

    render() {
        const {
            placeholder,
            error,
            helperMessage,
            errorMessage,
            imageSrc,
            imageStyle,
        } = this.props;

        return (
            <Stack>
                <input
                    type="file"
                    ref={this.input}
                    hidden
                    onChange={this.handleFileInput}
                />
                {imageSrc === undefined && (
                    <Stack>
                        {/* Button to click in order to trigger select input */}
                        <Button
                            variant="outlined"
                            height="56px"
                            color={error ? "error" : "primary"}
                            onClick={this.onSelectButtonClick}
                            spacing={2}
                            component={Stack}
                            direction="row"
                        >
                            <FileUploadIcon />
                            <Typography>{placeholder}</Typography>
                        </Button>
                    </Stack>
                )}
                {imageSrc && (
                    <Button
                        onClick={this.onSelectButtonClick}
                        sx={{ alignSelf: "center" }}
                    >
                        <img
                            src={imageSrc}
                            alt={placeholder}
                            style={imageStyle}
                        />
                    </Button>
                )}
                {/* If error is true or when a helper text is provided */}
                {(error || helperMessage) && (
                    <FormHelperText error={error} sx={{ textAlign: "center" }}>
                        {error ? errorMessage : helperMessage}
                    </FormHelperText>
                )}
            </Stack>
        );
    }
}
