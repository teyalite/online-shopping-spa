import React, { Component } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/AuthLayout";
import AuthScreen from "./screen/auth/Auth";
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
    render() {
        console.log("class App  BUILD");

        return (
            <Routes>
                <Route path="/" element={<Outlet />}>
                    <Route index element={<h1>Home</h1>} />
                </Route>
                {/* Authentification */}
                {/* <Route path="auth" element={<AuthLayout />}>
                    <Route index element={<AuthScreen />} />
                </Route> */}
            </Routes>
        );
    }
}
