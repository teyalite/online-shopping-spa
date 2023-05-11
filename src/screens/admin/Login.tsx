import React, { Component, useContext } from "react";
import AuthForm from "../../components/auth/AuthForm";
import { postRequest } from "../../utils/http";
import { AdminAuthContext } from "../../config/admin.context";
import { Admin, AdminAuthContextType } from "../../types";
import { ADMIN_TOKEN_KEY } from "../../utils/values";
import Stack from "@mui/material/Stack";
import Loading from "../../components/Loading";
import Typography from "@mui/material/Typography";
import { Navigate } from "react-router-dom";

type Props = {
    setAdmin: (admin: Admin) => void;
};

type State = {
    loading: boolean;
    message: string;
};

class LoginComp extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            loading: false,
            message: "",
        };
    }

    onSubmit = async ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) => {
        this.setState({ loading: true });

        const { setAdmin } = this.props;

        try {
            const fd = new FormData();

            fd.append("username", email);
            fd.append("password", password);

            const admin = await postRequest("/admin/auth/login", fd);
            localStorage.setItem(ADMIN_TOKEN_KEY, admin.access_token);
            setAdmin({ name: admin.name, email: admin.email });
            this.setState({ loading: false, message: "" });
        } catch (error: any) {
            this.setState({
                loading: false,
                message: "Invalid credentials",
            });
        }
    };

    render() {
        const { loading, message } = this.state;

        return (
            <AuthForm
                title="Admin Login"
                isLoading={loading}
                message={message}
                onSubmit={this.onSubmit}
                buttonText="Login"
            ></AuthForm>
        );
    }
}

export default function Login() {
    const { admin, loading, failed, onRetry, setAdmin } =
        useContext(AdminAuthContext);

    if (loading || failed) {
        return (
            <Stack width="100%" height="100%" sx={{ background: "white" }}>
                <Stack alignItems="center" justifyContent="center" pt={10}>
                    <Loading failed={failed} onRetry={onRetry}>
                        <Typography>Try again</Typography>
                    </Loading>
                </Stack>
            </Stack>
        );
    }

    if (admin) {
        return <Navigate to="/admin" replace />;
    }

    return <LoginComp setAdmin={setAdmin} />;
}
