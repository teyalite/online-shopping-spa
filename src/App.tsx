import { Component } from "react";
import { Route, Routes } from "react-router-dom";
import AppBarLayout from "./components/AppBarLayout";
import AuthLayout from "./components/auth/AuthLayout";
import { ProtectedAdmin } from "./config/admin.context";
import { Protected, SellerProtected } from "./config/auth.context";
import NotFound from "./screens/NotFound";
import AdminLayout from "./components/admin/Layout";
import AdminLogin from "./screens/admin/Login";
import AuthScreen from "./screens/auth/Auth";
import SigninScreen from "./screens/auth/Signin";
import SignupScreen from "./screens/auth/Signup";
import Categories from "./screens/admin/Categories";
import Users from "./screens/admin/Users";
import SellerLayout, { CheckSeller } from "./components/seller/Layout";
import AdminSeller from "./screens/admin/Sellers";
import AdminHome from "./screens/admin/Home";

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
        return (
            <Routes>
                {/* Authentification */}
                <Route path="/auth" element={<AuthLayout />}>
                    <Route index element={<AuthScreen />} />
                    <Route path="signin" element={<SigninScreen />} />
                    <Route path="signup" element={<SignupScreen />} />
                </Route>

                <Route
                    path="/seller"
                    element={<SellerLayout children={<SellerProtected />} />}
                >
                    <Route path="" element={<CheckSeller />}>
                        <Route index element={<h1>Seller home</h1>} />
                    </Route>
                </Route>

                <Route path="/" element={<AppBarLayout />}>
                    <Route index element={<h1>Home</h1>} />
                    <Route path="search" element={<h1>Search</h1>} />
                    <Route path="favorites" element={<h1>Favorites</h1>} />
                    <Route path="shopcart" element={<h1>Shopcart</h1>} />
                    <Route path="/profile" element={<Protected />}>
                        <Route index element={<h1>Profile</h1>} />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Route>

                <Route path="/admin" element={<AdminLayout />}>
                    <Route path="login" element={<AdminLogin />} />
                    <Route path="" element={<ProtectedAdmin />}>
                        <Route index element={<AdminHome />} />
                        <Route path="sellers" element={<AdminSeller />} />
                        <Route path="categories" element={<Categories />} />
                        <Route path="users" element={<Users />} />
                    </Route>
                </Route>
            </Routes>
        );
    }
}
