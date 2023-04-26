import {
    PASSWORD_ERROR_MESSAGE_LENGTH,
    PASSWORD_ERROR_MESSAGE_PATTERN,
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
} from "./values";
import isAscii from "validator/lib/isAscii";

/**
 * Validate a password by sending error message
 * @param password password to validate
 * @returns
 */
export function passwordValidator(password: string): string {
    if (
        password.length > PASSWORD_MAX_LENGTH ||
        password.length < PASSWORD_MIN_LENGTH
    ) {
        return PASSWORD_ERROR_MESSAGE_LENGTH;
    }

    if (!isAscii(password)) {
        return PASSWORD_ERROR_MESSAGE_PATTERN;
    }

    return "";
}
