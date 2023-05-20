import { Stack, Typography } from "@mui/material";
import { UNAUTHORIZED } from "http-status";
import {
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/Loading";
import { Admin, AdminAuthContextType } from "../types";
import { getRequest } from "../utils/http";

export const AdminAuthContext = createContext<AdminAuthContextType>({
    admin: null,
    loading: true,
    failed: false,
    onRetry: () => {},
    setAdmin: () => {},
});

export function AdminAuthContextProvider({ children }: PropsWithChildren) {
    const [admin, setUser] = useState<Admin | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [failed, setFailed] = useState<boolean>(false);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        setLoading(true);
        setFailed(false);

        try {
            const admin = await getRequest<Admin>("/admin/auth/");
            setLoading(false);
            setFailed(false);
            setUser(admin);
        } catch (error: any) {
            setFailed(
                !(error.response && error.response.status === UNAUTHORIZED)
            );
            setLoading(false);
        }
    };

    const setAdmin = (admin: Admin | null) => {
        setUser(admin);
    };

    return (
        <AdminAuthContext.Provider
            value={{
                admin,
                loading,
                failed,
                onRetry: fetchUser,
                setAdmin,
            }}
        >
            {children}
        </AdminAuthContext.Provider>
    );
}

/**
 * Protect all routes except auth route
 * @returns
 */
export function ProtectedAdmin() {
    const { admin, loading, failed, onRetry } = useContext(AdminAuthContext);

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
        return <Outlet />;
    }

    return <Navigate to="/admin/login" replace />;
}
