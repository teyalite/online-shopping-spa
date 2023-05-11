import facebookSvg from "../assets/svg/facebook.svg";
import instagramSvg from "../assets/svg/instagram.svg";
import whatsappSvg from "../assets/svg/whatsapp.svg";
import telegramSvg from "../assets/svg/telegram.svg";
import twitterSvg from "../assets/svg/twitter.svg";

export const ADMIN_TOKEN_KEY = "ADMIN_TOKEN_KEY";
export const PASSWORD_MAX_LENGTH = 60;
export const PASSWORD_MIN_LENGTH = 6;
export const EMAIL_MAX_LENGTH = 324;

export const EMAIL_PLACEHOLDER = "Email address";
export const PASSWORD_PLACEHOLDER = "Password";
export const PASSWORD_ERROR_MESSAGE_PATTERN =
    "The password can only contain ASCII characters";
export const PASSWORD_ERROR_MESSAGE_LENGTH = `Le mot de passe doit être entre ${PASSWORD_MIN_LENGTH} et ${PASSWORD_MAX_LENGTH} caractères`;
export const EMAIL_ERROR_MESSAGE = "Invalid email address";

export const UNEXPECTED_ERROR =
    "An unexpected error has occurred, please try again.";
export const NETWORK_ERROR_TITLE = "Connexion error!";
export const NETWORK_ERROR_HELPER =
    "Please check your internet connection and try again.";
export const NETWORK_ERROR = `${NETWORK_ERROR_TITLE}. ${NETWORK_ERROR_HELPER}`;
export const EMAIL_EXISTS_ERROR = "An account with this email already exists";

export const USER_DOESNT_EXIST_ERROR =
    "No account exists on this email address";

/**
 * Whatsapp number
 */
export const WHATSAPP = "+777777777777";

/**
 * Phone numbers for contact
 */
export const TELEPHONE_CONTACTS = [WHATSAPP, "+777777777777"];

/**
 * Email address for contact
 */
export const EMAIL_CONTACT = "contact@onlineshop.com";

export const ABOUT = { label: "About Online Shop", href: "/about" };

export const HOME = {
    label: "Home",
    href: "/",
};

/**
 *
 */
export const FOOTER_MIDDLE_SECTION: {
    label: string;
    href: string;
    isExternal?: boolean;
}[] = [HOME, ABOUT];

/**
 * Social medias references
 */
export const SOCIALS = [
    {
        alt: "Compte whatsapp de Online Shop",
        src: whatsappSvg,
        link: `https://wa.me/${WHATSAPP.replaceAll(" ", "")}`,
    },
    {
        alt: "Compte facebook de Online Shop",
        src: facebookSvg,
        link: "/",
    },
    {
        alt: "Compte instagram de Online Shop",
        src: instagramSvg,
        link: "/",
    },
    {
        alt: "Compte telegram de Online Shop",
        src: telegramSvg,
        link: "https://t.me/Online Shop",
    },
    {
        alt: "Compte twitter de Online Shop",
        src: twitterSvg,
        link: "/",
    },
];
