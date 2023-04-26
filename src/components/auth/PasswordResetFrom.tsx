import React, { Component, ChangeEvent, FormEvent } from "react";
// import { AuthErrorCodes, confirmPasswordReset } from "firebase/auth";
// import { auth } from "../../config/firebase";
import {
    NETWORK_ERROR,
    PASSWORD_MAX_LENGTH,
    UNEXPECTED_ERROR,
} from "../../utils/values";
import { passwordValidator } from "../../utils/validators";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import LoadingButton from "@mui/lab/LoadingButton";
import PasswordInput from "./PasswordInput";
import { authFormButtonStyle } from "./AuthForm";
import { Link } from "react-router-dom";
import { sleep } from "../../utils/sleep";
import { theme } from "../../utils/theme";

type Props = {
    actionCode: string;
    email: string;
    setInvalid: () => void; // Parent status to invalid action code
};

type State = {
    isLoading: boolean;
    message: string;
    password: string;
    passwordError: boolean;
    passwordErrorMessage: string;
    success: boolean;
    triggered: boolean;
};

export default class PasswordResetFrom extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isLoading: false,
            message: "",
            password: "",
            passwordError: true,
            passwordErrorMessage: passwordValidator(""),
            success: false,
            triggered: false,
        };
    }

    /**
     * Executed when password value changes
     * @param event event
     */
    onChangePassword = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const errorMessage = passwordValidator(event.target.value);

        this.setState({
            password: event.target.value,
            passwordError: Boolean(errorMessage),
            passwordErrorMessage: errorMessage,
        });
    };

    /**
     * Submit form
     * @param event event
     */
    onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        // event.preventDefault();
        // const { actionCode, setInvalid } = this.props;
        // const { password } = this.state;
        // if (this.state.passwordError) {
        //     return this.setState({ triggered: true });
        // }
        // this.setState({ isLoading: true });
        // // todo: dev
        // await sleep(0.5);
        // try {
        //     await confirmPasswordReset(auth, actionCode, password);
        //     this.setState({
        //         isLoading: false,
        //         success: true,
        //         message: "",
        //     });
        // } catch (error: any) {
        //     if (error.code === AuthErrorCodes.INVALID_OOB_CODE) {
        //         // this can happen if a valid action code is used in another window while already opened in anohter window
        //         return setInvalid();
        //     }
        //     let message;
        //     if (error.code === AuthErrorCodes.NETWORK_REQUEST_FAILED) {
        //         message = NETWORK_ERROR;
        //     } else {
        //         message = UNEXPECTED_ERROR;
        //     }
        //     return this.setState({ isLoading: false, message });
        // }
    };

    render() {
        const { email } = this.props;

        const {
            isLoading,
            message,
            success,
            passwordErrorMessage,
            password,
            passwordError,
            triggered,
        } = this.state;

        const passwordErr = passwordError && triggered;

        if (success) {
            /**
             * Action code is valid and the password has been reset successfully
             */
            return (
                <Stack spacing={3} textAlign="center">
                    <Typography
                        fontSize={{ xs: "1.25rem", md: "1.5rem" }}
                        fontWeight="bold"
                    >
                        Le mot de passe a bien été modifié
                    </Typography>
                    <Typography fontSize={{ xs: "1rem", md: "1.25rem" }}>
                        Vous pouvez maintenant vous connecter avec votre nouveau
                        mot de passe
                    </Typography>
                    <Link to="/auth/signin">
                        <Button
                            variant="outlined"
                            sx={{ alignSelf: "center", px: 3 }}
                        >
                            Aller à la page de connexion
                        </Button>
                    </Link>
                </Stack>
            );
        }

        /**
         * Action code is valid but password not reset
         */
        return (
            <Stack spacing={3} textAlign="center">
                <Typography
                    fontSize={{ xs: "1.25rem", md: "1.5rem" }}
                    fontWeight="bold"
                >
                    Réinitialiser votre mot de passe
                </Typography>
                <Typography fontSize={{ xs: "1rem", md: "1.25rem" }}>
                    Pour {` ${email}`}
                </Typography>
                {message.length !== 0 && (
                    <Typography
                        variant="body1"
                        sx={{
                            color: theme.palette.error.main,
                            textAlign: "center",
                        }}
                    >
                        {message}
                    </Typography>
                )}
                <Stack
                    component="form"
                    autoComplete="off"
                    onSubmit={this.onSubmit}
                    spacing={3}
                >
                    <PasswordInput
                        placeholder="Nouveau mot de passe"
                        value={password}
                        error={passwordErr}
                        onChange={this.onChangePassword}
                        errorMessage={passwordErrorMessage}
                        maxLength={PASSWORD_MAX_LENGTH}
                    />
                    <LoadingButton
                        loading={isLoading}
                        variant="contained"
                        disableElevation
                        type="submit"
                        sx={authFormButtonStyle}
                    >
                        Réinitialiser
                    </LoadingButton>
                </Stack>
            </Stack>
        );
    }
}
