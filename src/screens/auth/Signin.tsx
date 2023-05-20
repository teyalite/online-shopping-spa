import { Typography } from "@mui/material";
import { FirebaseError } from "firebase/app";
import { AuthErrorCodes, signInWithEmailAndPassword } from "firebase/auth";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthForm, { linkStyle } from "../../components/auth/AuthForm";
import { SignupButton } from "../../components/auth/Buttons";
import Separator from "../../components/auth/Separator";
import { auth } from "../../config/firebase";
import { UNEXPECTED_ERROR, USER_DOESNT_EXIST_ERROR } from "../../utils/values";

type Props = {};

type State = {
    isLoading: boolean;
    message: string;
};

export default class SigninScreen extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isLoading: false,
            message: "",
        };
    }

    componentDidMount(): void {
        window.scrollTo(0, 0);
    }

    getErrorMessage(error: any): string {
        if (error instanceof FirebaseError) {
            switch ((error as FirebaseError).code) {
                case AuthErrorCodes.INVALID_PASSWORD:
                    return "Mot de passe incorrect";
                case AuthErrorCodes.USER_DELETED:
                    return USER_DOESNT_EXIST_ERROR;
                default:
                    break;
            }
        }

        return UNEXPECTED_ERROR;
    }

    onSubmit = async ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) => {
        this.setState({ isLoading: true });
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // this.setState({ isLoading: false, message: "" });
        } catch (error: any) {
            console.log(error);
            this.setState({
                isLoading: false,
                message: this.getErrorMessage(error),
            });
        }
    };

    render(): React.ReactNode {
        const { isLoading, message } = this.state;

        return (
            <AuthForm
                title="Log in with your email address"
                isLoading={isLoading}
                message={message}
                onSubmit={this.onSubmit}
                buttonText="Login"
            >
                {/* <Link
                    to="/auth/pwd-recov"
                    style={{ ...linkStyle, alignSelf: "center" }}
                >
                    <Typography
                        sx={{
                            "&:hover": { textDecoration: "underline" },
                        }}
                    >
                        Forgot your password ?
                    </Typography>
                </Link> */}
                <Separator />
                <SignupButton />
            </AuthForm>
        );
    }
}
