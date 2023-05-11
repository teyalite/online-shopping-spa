import { SxProps } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import MuiSelect, { SelectChangeEvent } from "@mui/material/Select";
import { ReactNode } from "react";

type Props = {
    placeholder: ReactNode;
    items: { label: string; value: string }[];
    helperText?: string;
    errorMessage?: string;
    value?: string;
    error?: boolean;
    size?: "small" | "medium";
    label?: string;
    sx?: SxProps;
    onChange: (event: SelectChangeEvent) => void;
};

export default function Select({
    items,
    placeholder,
    value,
    size,
    errorMessage,
    error = false,
    helperText,
    sx,
    onChange,
}: Props) {
    return (
        <FormControl sx={sx} size={size} error={error}>
            <MuiSelect
                value={value}
                onChange={onChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
            >
                <MenuItem value="">
                    {typeof placeholder === "string" ? (
                        <span style={{ color: "#828282" }}>{placeholder}</span>
                    ) : (
                        placeholder
                    )}
                </MenuItem>
                {items.map(({ label, value }) => (
                    <MenuItem value={value} key={value}>
                        {label}
                    </MenuItem>
                ))}
            </MuiSelect>
            {error && <FormHelperText>{errorMessage}</FormHelperText>}
            {helperText && (
                <FormHelperText style={{ color: "rgba(0, 0, 0, 0.6)" }}>
                    {helperText}
                </FormHelperText>
            )}
        </FormControl>
    );
}
