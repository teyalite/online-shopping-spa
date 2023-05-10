import React from "react";
import { SxProps } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";

type Props = {
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    placeholder: string;
    errorMessage?: string;
    error?: boolean;
    size?: "small" | "medium";
    label?: string;
    sx?: SxProps;
    type?: string;
    helperText?: string;
    multiline?: boolean;
    onBlur?: () => void;
    autoFocus?: boolean;
    minRows?: number;
};

export default function Input({
    placeholder,
    value,
    sx,
    size,
    onChange,
    errorMessage,
    error = false,
    type = "text",
    helperText,
    multiline = false,
    autoFocus,
    onBlur,
    minRows = 1,
}: Props) {
    return (
        <FormControl
            sx={sx}
            size={size}
            variant="outlined"
            color="info"
            error={error}
        >
            <OutlinedInput
                placeholder={placeholder}
                value={value}
                minRows={minRows}
                onChange={onChange}
                multiline={multiline}
                type={type}
                onBlur={onBlur}
                autoFocus={autoFocus}
            />
            {error && <FormHelperText>{errorMessage}</FormHelperText>}
            {helperText && (
                <FormHelperText style={{ color: "rgba(0, 0, 0, 0.6)" }}>
                    {helperText}
                </FormHelperText>
            )}
        </FormControl>
    );
}
