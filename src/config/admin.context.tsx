import {
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Admin, AdminAuthContextType } from "../types";
import { getRequest } from "../utils/http";
import { UNAUTHORIZED } from "http-status";
import { sleep } from "../utils/sleep";

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
            // todo:dev
            await sleep(0.5);
            setLoading(false);
            setFailed(false);
            setUser(admin);
        } catch (error: any) {
            // todo:dev
            console.log(error);

            setFailed(
                !(error.response && error.response.status === UNAUTHORIZED)
            );

            setLoading(false);
        }
    };

    const setAdmin = (admin: Admin) => {
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
        return <h1>Loading or failed</h1>;
        // return (
        //     <Stack width="100%" height="100%" sx={{ background: "white" }}>
        //         <SimpleAppBar />
        //         <Stack alignItems="center" justifyContent="center" pt={20}>
        //             <Loading failed={failed} onRetry={onRetry} />
        //         </Stack>
        //     </Stack>
        // );
    }

    if (admin) {
        return <Outlet />;
    }

    return <Navigate to="/admin/login" replace />;
}
