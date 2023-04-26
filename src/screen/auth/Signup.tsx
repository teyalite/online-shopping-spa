import React, { Component } from "react";
import AuthForm from "../../components/auth/AuthForm";
import {
    AppleButton,
    GoogleButton,
    SigninButton,
} from "../../components/auth/Buttons";
import Separator from "../../components/auth/Separator";
// import { FirebaseError } from "firebase/app";
// import { AuthErrorCodes, createUserWithEmailAndPassword } from "firebase/auth";
import { EMAIL_EXISTS_ERROR, UNEXPECTED_ERROR } from "../../utils/values";
// import { auth } from "../../config/firebase";

type Props = {};

type State = {
    isLoading: boolean;
    message: string;
};

export default class SignupScreen extends Component<Props, State> {
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
        // if (
        //     error instanceof FirebaseError &&
        //     (error as FirebaseError).code === AuthErrorCodes.EMAIL_EXISTS
        // ) {
        //     return EMAIL_EXISTS_ERROR;
        // }

        return UNEXPECTED_ERROR;
    }

    onSubmit = async ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) => {
        // this.setState({ isLoading: true });
        // try {
        //     await createUserWithEmailAndPassword(auth, email, password);
        //     this.setState({ isLoading: false, message: "" });
        // } catch (error: any) {
        //     console.log(error);
        //     this.setState({
        //         isLoading: false,
        //         message: this.getErrorMessage(error),
        //     });
        // }
    };

    render() {
        const { message } = this.state;

        return (
            <AuthForm
                title="Sign up with your email address"
                isLoading={false}
                message={message}
                onSubmit={this.onSubmit}
                buttonText="Create an account"
            >
                <Separator />
                <SigninButton />
            </AuthForm>
        );
    }
}
