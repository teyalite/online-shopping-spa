import React, { Component, ChangeEventHandler, CSSProperties } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { theme } from "../utils/theme";

type Props = {
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    value: string;
    style?: CSSProperties;
    placeholder: string;
    error: boolean;
    errorMessage: string;
    maxLength: number;
    autoComplete?: any;
};

type State = {
    showPassword: boolean;
};

class Input extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            showPassword: false,
        };
    }

    render() {
        const {
            onChange,
            value,
            style,
            placeholder,
            error,
            errorMessage,
            maxLength,
            autoComplete,
        } = this.props;
        return (
            <FormControl
                sx={{ ...inputStyles.container, ...style }}
                variant="standard"
            >
                <OutlinedInput
                    inputProps={{
                        maxLength: maxLength,
                        autoCapitalize: "none",
                    }}
                    sx={inputStyles.input}
                    size="small"
                    placeholder={placeholder}
                    error={error}
                    type={"text"}
                    value={value}
                    autoCapitalize="none"
                    autoComplete={autoComplete}
                    onChange={onChange}
                />
                {error && (
                    <FormHelperText sx={inputStyles.helper}>
                        {errorMessage}
                    </FormHelperText>
                )}
            </FormControl>
        );
    }
}

export const inputStyles = {
    container: {
        minWidth: 320,
        width: "100%",
        marginTop: 1.5,
    },
    helper: {
        marginRight: 0.7,
        marginLeft: 0.7,
        color: theme.palette.error.main,
    },
    input: {
        backgroundColor: "white",
    },
};

export default Input;
