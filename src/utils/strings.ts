import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from "./values";

export const NETWORK_ERROR_TITLE = "Connexion error!";
export const NETWORK_ERROR_HELPER =
    "Please check your internet connection and try again.";

const AUTH_STRINGS = {
    emailPlaceholder: "Email address",
    passwordPlaceholder: "Password",
    passwordErrorMessagePattern:
        "The password can only contain ASCII characters",
    passwordErrorMessageLength: `Le mot de passe doit être entre ${PASSWORD_MIN_LENGTH} et ${PASSWORD_MAX_LENGTH} caractères`,
    emailErrorMessage: "Invalid email address",
    unexpectedError: "An unexpected error has occurred, please try again.",
    networkErrorTitle: NETWORK_ERROR_TITLE,
    networkErrorHelper: NETWORK_ERROR_HELPER,
    networkError: `${NETWORK_ERROR_TITLE}. ${NETWORK_ERROR_HELPER}`,
    emailExistsError: "An account with this email already exists",
    userDoesntExistError: "No account exists on this email address",
};

const TEXT_STRINGS = {
    auth: AUTH_STRINGS,
};

export default TEXT_STRINGS;
