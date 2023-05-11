import React, {
    Component,
    MouseEvent,
    ChangeEventHandler,
    CSSProperties,
} from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { inputStyles } from "../Input";

type Props = {
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    value: string;
    style?: CSSProperties;
    placeholder: string;
    error: boolean;
    errorMessage: string;
    maxLength: number;
};

type State = {
    showPassword: boolean;
};

class PasswordInput extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            showPassword: false,
        };
    }

    showPassword = () =>
        this.setState({ showPassword: !this.state.showPassword });

    handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) =>
        event.preventDefault();

    render() {
        const {
            onChange,
            value,
            style,
            placeholder,
            error,
            errorMessage,
            maxLength,
        } = this.props;
        return (
            <FormControl
                sx={{ ...inputStyles.container, ...style }}
                variant="standard"
            >
                <OutlinedInput
                    size="small"
                    placeholder={placeholder}
                    error={error}
                    type={this.state.showPassword ? "text" : "password"}
                    value={value}
                    inputProps={{
                        autoComplete: "current-password",
                        maxLength: maxLength,
                    }}
                    sx={inputStyles.input}
                    onChange={onChange}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={this.showPassword}
                                onMouseDown={this.handleMouseDownPassword}
                            >
                                {this.state.showPassword ? (
                                    <VisibilityOff />
                                ) : (
                                    <Visibility />
                                )}
                            </IconButton>
                        </InputAdornment>
                    }
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

export default PasswordInput;
