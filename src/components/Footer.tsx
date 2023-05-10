import React from "react";

export default function Footer() {
    return <div>Footer</div>;
}

// import React from "react";
// import {
//     Container,
//     Stack,
//     Typography,
//     SxProps,
//     Link as MuiLink,
//     IconButton,
//     Divider,
//     Box,
// } from "@mui/material";
// import Logo from "./Logo";
// import {
//     SOCIALS,
//     TELEPHONE_CONTACTS,
//     EMAIL_CONTACT,
//     FOOTER_MIDDLE_SECTION,
// } from "../res/values";
// import { Link } from "react-router-dom";
// import appstore from "../res/assets/appstore.svg";
// import playstore from "../res/assets/playstore.png";

// export default function Footer() {
//     let displayStores = true;

//     // App is installed
//     if (window.matchMedia("(display-mode: standalone)").matches) {
//         displayStores = false;
//     }

//     return (
//         <Box component="footer" sx={styles.container}>
//             <Container>
//                 {displayStores && (
//                     <Stack spacing={1} mb={3}>
//                         <Typography variant="h5" fontWeight="bold">
//                             Téléchargez notre application
//                         </Typography>
//                         <Stack
//                             direction={{ xs: "column", sm: "row" }}
//                             spacing={{ xs: 0, sm: 10 }}
//                             alignItems={{ sm: "center", xs: "flex-start" }}
//                         >
//                             <a href="/">
//                                 <Box
//                                     component={"img"}
//                                     src={playstore}
//                                     sx={styles.playstore}
//                                     alt="Télécharger sur Google Play Store"
//                                 />
//                             </a>
//                             <a href="/">
//                                 <Box
//                                     component={"img"}
//                                     src={appstore}
//                                     sx={styles.appstore}
//                                     alt="Télécharger sur l'App Store"
//                                 />
//                             </a>
//                         </Stack>
//                     </Stack>
//                 )}
//                 <Divider sx={styles.divider1} />
//                 <Stack spacing={7} flex={1} justifyContent="space-between">
//                     <Stack
//                         direction={{ xs: "column", md: "row" }}
//                         spacing={{ xs: 3, md: 6 }}
//                     >
//                         <Stack flex={2} spacing={3}>
//                             <Stack spacing={1.5}>
//                                 <Logo
//                                     width={{ xs: "150px", sm: "180px" }}
//                                     height={{ xs: "35px", sm: "40px" }}
//                                 />
//                                 <Typography maxWidth={370}>
//                                     Vendre, Acheter et Louer des{" "}
//                                     <strong>Véhicules & Motos</strong>.
//                                 </Typography>
//                             </Stack>
//                         </Stack>
//                         <Stack flex={1} spacing={{ xs: 1.5, md: 1 }}>
//                             {FOOTER_MIDDLE_SECTION.map(
//                                 ({ label, href, isExternal }, index) => {
//                                     return (
//                                         <MuiLink
//                                             key={index}
//                                             component={Link}
//                                             to={href}
//                                             sx={{
//                                                 "&:hover": {
//                                                     color: theme.palette.primary
//                                                         .main,
//                                                 },
//                                             }}
//                                             underline="hover"
//                                             color="inherit"
//                                             fontWeight="bold"
//                                             alignSelf="flex-start"
//                                         >
//                                             {label}
//                                         </MuiLink>
//                                     );
//                                 }
//                             )}
//                         </Stack>
//                         <Stack id="contacts" spacing={1} flex={2}>
//                             <Typography fontWeight="bold">Contacts</Typography>
//                             <Stack direction="row" spacing={1}>
//                                 <strong>Tel:</strong>
//                                 <Stack spacing={1}>
//                                     {TELEPHONE_CONTACTS.map((tel, index) => (
//                                         <MuiLink
//                                             key={index}
//                                             href={`tel:${tel}`}
//                                             underline="hover"
//                                             color="inherit"
//                                             target="_blank"
//                                             rel="noreferrer"
//                                             sx={{
//                                                 "&:hover": {
//                                                     color: theme.palette.primary
//                                                         .main,
//                                                     fontWeight: "bold",
//                                                 },
//                                             }}
//                                         >
//                                             {tel}
//                                         </MuiLink>
//                                     ))}
//                                 </Stack>
//                             </Stack>
//                             <Stack direction="row" spacing={1}>
//                                 <strong>Email:</strong>
//                                 <MuiLink
//                                     href={`mailto:${EMAIL_CONTACT}`}
//                                     color="inherit"
//                                     underline="hover"
//                                     target="_blank"
//                                     rel="noreferrer"
//                                     sx={{
//                                         "&:hover": {
//                                             color: theme.palette.primary.main,
//                                             fontWeight: "bold",
//                                         },
//                                     }}
//                                 >
//                                     {EMAIL_CONTACT}
//                                 </MuiLink>
//                             </Stack>
//                             <Stack direction="row" spacing={1}>
//                                 {SOCIALS.map((social, index) => (
//                                     <MuiLink
//                                         key={index}
//                                         target="_blank"
//                                         rel="noreferrer"
//                                         href={social.link}
//                                         component={IconButton}
//                                         title={social.alt}
//                                     >
//                                         <img
//                                             src={social.src}
//                                             width={34}
//                                             height={34}
//                                             alt={social.alt}
//                                         />
//                                     </MuiLink>
//                                 ))}
//                             </Stack>
//                         </Stack>
//                     </Stack>
//                     <Stack pb={{ xs: 12, md: 0 }}>
//                         <Divider sx={styles.divider2} />
//                         <Typography
//                             variant="body2"
//                             color="text.secondary"
//                             align="center"
//                         >
//                             Copyright © CherifAuto 2022
//                         </Typography>
//                     </Stack>
//                 </Stack>
//             </Container>
//         </Box>
//     );
// }

// const styles: { [key: string]: SxProps } = {
//     container: {
//         pt: 4,
//         pb: 2,
//         display: "flex",
//         flexDirection: "column",
//         flex: 1,
//     },
//     divider1: {
//         mb: 4,
//     },
//     divider2: {
//         mb: 2,
//     },
//     playstore: {
//         width: { xs: "248px", md: "259px" },
//         height: { xs: "96px", md: "100px" },
//     },
//     appstore: {
//         borderRadius: "13px",
//         width: "250px",
//         height: "83px",
//     },
// };
