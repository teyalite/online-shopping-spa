import { Button, Stack, Typography } from "@mui/material";
import { ChangeEvent, Component, FormEvent, PropsWithChildren } from "react";
import isEmail from "validator/lib/isEmail";
import TEXT_STRINGS from "../../utils/strings";
import { theme } from "../../utils/theme";
import { passwordValidator } from "../../utils/validators";
import { EMAIL_MAX_LENGTH, PASSWORD_MAX_LENGTH } from "../../utils/values";
import BackdropLoading from "../BackdropLoading";
import Input from "../Input";
import PasswordInput from "./PasswordInput";

type Props = PropsWithChildren & {
    title: string;
    buttonText: string;
    isLoading: boolean;
    message: string;
    onSubmit: (credentials: { email: string; password: string }) => void;
};

type State = {
    email: string;
    emailError: boolean;
    password: string;
    passwordError: boolean;
    passwordErrorMessage: string;
    triggered: boolean;
};

export default class AuthForm extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            email: "",
            emailError: true,
            password: "",
            passwordError: true,
            passwordErrorMessage: passwordValidator(""),
            triggered: false,
        };
    }

    /**
     * Executed when email value changes
     * @param event event
     */
    onChangeEmail = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        this.setState({
            email: event.target.value,
            emailError: !isEmail(event.target.value),
        });
    };

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
    onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!this.state.emailError && !this.state.passwordError) {
            this.props.onSubmit({
                email: this.state.email,
                password: this.state.password,
            });
        } else {
            this.setState({ triggered: true });
        }
    };

    render() {
        const { isLoading, message, buttonText, children, title } = this.props;
        const passwordErr = this.state.passwordError && this.state.triggered;
        const emailErr = this.state.emailError && this.state.triggered;

        return (
            <Stack alignItems="center" spacing={2}>
                <Typography variant="h6" pb={0.5}>
                    {title}
                </Typography>
                {isLoading && <BackdropLoading />}
                {message.length !== 0 && (
                    <Typography variant="body1" sx={styles.message}>
                        {message}
                    </Typography>
                )}
                <Stack
                    sx={styles.form}
                    component="form"
                    autoComplete="off"
                    onSubmit={this.onSubmit}
                    spacing={3}
                >
                    <Input
                        onChange={this.onChangeEmail}
                        value={this.state.email}
                        error={emailErr}
                        errorMessage={TEXT_STRINGS.auth.emailErrorMessage}
                        placeholder={TEXT_STRINGS.auth.emailPlaceholder}
                        maxLength={EMAIL_MAX_LENGTH}
                    />
                    <PasswordInput
                        onChange={this.onChangePassword}
                        value={this.state.password}
                        error={passwordErr}
                        errorMessage={this.state.passwordErrorMessage}
                        placeholder={TEXT_STRINGS.auth.passwordPlaceholder}
                        maxLength={PASSWORD_MAX_LENGTH}
                    />
                    <Button
                        sx={authFormButtonStyle}
                        variant="contained"
                        disableElevation
                        type="submit"
                    >
                        {buttonText}
                    </Button>
                </Stack>
                <Stack spacing={3} alignItems="center">
                    {children}
                </Stack>
            </Stack>
        );
    }
}

export const linkStyle = {
    textDecoration: "none",
    color: "blue",
};

const styles = {
    container: {
        paddingTop: 8,
        paddingBottom: 80,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    message: {
        marginBottom: 1,
        color: theme.palette.error.main,
        textAlign: "center",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 2,
        marginBottom: 2,
    },
    link: linkStyle,
};

export const authFormButtonStyle = {
    textTransform: "none",
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    width: "100%",
    marginTop: 2,
    marginBottom: 2,
};
