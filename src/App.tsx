import { Component } from "react";
import { Route, Routes } from "react-router-dom";
import AppBarLayout from "./components/AppBarLayout";
import AdminLayout from "./components/admin/Layout";
import AuthLayout from "./components/auth/AuthLayout";
import SellerLayout, { CheckSeller } from "./components/seller/Layout";
import { ProtectedAdmin } from "./config/admin.context";
import { Protected, SellerProtected } from "./config/auth.context";
import NotFound from "./screens/NotFound";
import Categories from "./screens/admin/Categories";
import AdminHome from "./screens/admin/Home";
import AdminLogin from "./screens/admin/Login";
import AdminSeller from "./screens/admin/Sellers";
import Users from "./screens/admin/Users";
import AuthScreen from "./screens/auth/Auth";
import SigninScreen from "./screens/auth/Signin";
import SignupScreen from "./screens/auth/Signup";
import SellerHome from "./screens/seller/Home";
import SellerOrders from "./screens/seller/Orders";
import SellerProducts from "./screens/seller/Products";
import Home from "./screens/Home";
import Shopcart from "./screens/Shopcart";
import Profile from "./screens/Profile";
import Order from "./screens/Order";
import ProdDetails from "./screens/ProdDetails";
import Search from "./screens/Search";
import Shop from "./screens/Shop";

// todo: seller create store
// todo: seller add product
// todo: seller edit product

export default class App extends Component {
    componentDidMount(): void {
        try {
            document.querySelector("#loading")?.remove();
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
                        <Route index element={<SellerHome />} />
                        <Route path="products" element={<SellerProducts />} />
                        <Route path="orders" element={<SellerOrders />} />
                    </Route>
                </Route>

                <Route path="/" element={<AppBarLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/search/:text" element={<Search />} />
                    <Route path="/shopcart" element={<Protected />}>
                        <Route index element={<Shopcart />} />
                    </Route>
                    <Route path="/profile" element={<Protected />}>
                        <Route index element={<Profile />} />
                    </Route>
                    <Route path="/orders/:orderId" element={<Order />} />
                    <Route
                        path="/product/:productId"
                        element={<ProdDetails />}
                    />
                    <Route path="/store/:shopId" element={<Shop />} />
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
