import React from "react";
import {
    Container,
    Stack,
    Typography,
    SxProps,
    Link as MuiLink,
    IconButton,
    Divider,
    Box,
} from "@mui/material";
import Logo from "./Logo";
import theme from "../utils/theme";
import { Link } from "react-router-dom";
import Facebook from "../assets/svg/facebook.svg";
import Instagram from "../assets/svg/instagram.svg";
import Twitter from "../assets/svg/twitter.svg";

const socials = [
    {
        alt: "facebook account of Online Shop",
        src: Facebook,
        link: "https://www.facebook.com/teyalite/",
    },
    {
        alt: "instagram account of Online Shop",
        src: Instagram,
        link: "https://www.instagram.com/teyalite/",
    },
    {
        alt: "twitter account of Online Shop",
        src: Twitter,
        link: "https://twitter.com/teyalite",
    },
];

const TELEPHONE_CONTACTS = ["+99 99 999 99 99"];

const EMAIL_CONTACT = "whatever@whatever.whatever";

const HOME = {
    label: "Home",
    href: "/",
};

const FAVORITES = {
    label: "Favorites",
    href: "/favorites",
};

const SELLER = {
    label: "Seller",
    href: "/seller",
};

const ADMIN = {
    label: "Admin",
    href: "/admin",
};

const FOOTER_MIDDLE_SECTION: {
    label: string;
    href: string;
    isExternal?: boolean;
}[] = [HOME, FAVORITES, SELLER, ADMIN];

export default function Footer() {
    return (
        <Box component="footer" sx={styles.container}>
            <Container>
                <Divider sx={styles.divider1} />
                <Stack spacing={7} flex={1} justifyContent="space-between">
                    <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={{ xs: 3, md: 6 }}
                    >
                        <Stack flex={2} spacing={1}>
                            <Logo />
                            <Typography maxWidth={350}>
                                {`Online Shop is an online marketplace`}
                            </Typography>
                        </Stack>
                        <Stack flex={1} spacing={{ xs: 1.5, md: 1 }}>
                            {FOOTER_MIDDLE_SECTION.map(
                                ({ label, href, isExternal }, index) => {
                                    if (isExternal) {
                                        return (
                                            <MuiLink
                                                key={index}
                                                href={href}
                                                underline="hover"
                                                color="black"
                                                target="_blank"
                                                rel="noreferrer"
                                                fontWeight="bold"
                                                title={label}
                                            >
                                                {label}
                                            </MuiLink>
                                        );
                                    }

                                    return (
                                        <MuiLink
                                            key={index}
                                            component={Link}
                                            to={href}
                                            sx={{
                                                "&:hover": {
                                                    color: theme.palette.primary
                                                        .main,
                                                },
                                            }}
                                            underline="hover"
                                            color="inherit"
                                            fontWeight="bold"
                                            alignSelf="flex-start"
                                        >
                                            {label}
                                        </MuiLink>
                                    );
                                }
                            )}
                        </Stack>
                        <Stack id="contacts" spacing={1} flex={2}>
                            <Typography fontWeight="bold">Contacts</Typography>
                            <Stack direction="row" spacing={1}>
                                <strong>Tel:</strong>
                                <Stack spacing={1}>
                                    {TELEPHONE_CONTACTS.map((tel, index) => (
                                        <MuiLink
                                            key={index}
                                            href={`tel:${tel}`}
                                            underline="hover"
                                            color="inherit"
                                            target="_blank"
                                            rel="noreferrer"
                                            sx={{
                                                "&:hover": {
                                                    color: theme.palette.primary
                                                        .main,
                                                    fontWeight: "bold",
                                                },
                                            }}
                                        >
                                            {tel}
                                        </MuiLink>
                                    ))}
                                </Stack>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                <strong>Email:</strong>
                                <MuiLink
                                    href={`mailto:${EMAIL_CONTACT}`}
                                    color="inherit"
                                    underline="hover"
                                    target="_blank"
                                    rel="noreferrer"
                                    sx={{
                                        "&:hover": {
                                            color: theme.palette.primary.main,
                                            fontWeight: "bold",
                                        },
                                    }}
                                >
                                    {EMAIL_CONTACT}
                                </MuiLink>
                            </Stack>
                            <Stack direction="row" spacing={1}>
                                {socials.map((social, index) => (
                                    <MuiLink
                                        key={index}
                                        target="_blank"
                                        rel="noreferrer"
                                        href={social.link}
                                        component={IconButton}
                                        title={social.alt}
                                    >
                                        <img
                                            src={social.src}
                                            width={34}
                                            height={34}
                                            alt={social.alt}
                                        />
                                    </MuiLink>
                                ))}
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack>
                        <Divider sx={styles.divider2} />
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            align="center"
                        >
                            Copyright © Online Shop 2022
                        </Typography>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
}

const styles: { [key: string]: SxProps } = {
    container: {
        pt: 4,
        pb: 2,
        display: "flex",
        flexDirection: "column",
        flex: 1,
    },
    divider1: {
        mb: 4,
    },
    divider2: {
        mb: 2,
    },
};
