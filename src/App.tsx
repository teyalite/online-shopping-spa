import { Component } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Protected } from "./config/auth.context";
import AuthLayout from "./components/auth/AuthLayout";
import AuthScreen from "./screens/auth/Auth";
import SigninScreen from "./screens/auth/Signin";
import SignupScreen from "./screens/auth/Signup";
// import SigninScreen from "./screens/auth/Signin";
// import SignupScreen from "./screens/auth/Signup";
// import PasswordRecovery from "./screens/auth/PasswordRecovery";
// import AuthActionScreen from "./screens/auth/Action";
// import NotFound from "./screens/NotFound";
// import Layout from "./components/Layout";
// import Favorites from "./screens/Favorites";
// import Compte from "./screens/compte/Compte";
// import CompteLayout from "./components/compte/CompteLayout";
// import Home from "./screens/Home";
// import Search from "./screens/Search";
// import About from "./screens/About";

// todo: allow auth action even when user is logged in
export default class App extends Component {
    componentDidMount(): void {
        try {
            document.querySelector("#loading")?.remove();
            // todo: dev
            // remove firebase ui emulator
            document.querySelector(".firebase-emulator-warning")?.remove();
        } catch (_err) {}
    }

    render() {
        console.log("App Component Build");

        return (
            <Routes>
                <Route path="/" element={<Outlet />}>
                    <Route index element={<h1>Home</h1>} />
                    <Route path="/profile" element={<Protected />}>
                        <Route index element={<h1>Profile</h1>} />
                    </Route>
                </Route>

                {/* Authentification */}
                <Route path="/auth" element={<AuthLayout />}>
                    <Route index element={<AuthScreen />} />
                    <Route path="signin" element={<SigninScreen />} />
                    <Route path="signup" element={<SignupScreen />} />
                </Route>
            </Routes>
        );
    }
}
