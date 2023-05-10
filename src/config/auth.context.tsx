import Stack from "@mui/material/Stack";
import { onAuthStateChanged } from "firebase/auth";
import {
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { Navigate, Outlet } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import { AuthContextType, UserType } from "../types";
import { sleep } from "../utils/sleep";
import { auth } from "./firebase";

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
});

export function AuthContextProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<UserType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            await sleep(3);
            console.log(user);

            if (user) {
                setUser(user);
            } else {
                // setUser({} as UserType);
                setUser(null);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * Protect all routes except auth route
 * @returns
 */
export function Protected() {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <Stack
                width="100%"
                height="100%"
                pb={15}
                alignItems="center"
                justifyContent="center"
            >
                <LoadingBox />
            </Stack>
        );
    }

    if (user) {
        return <Outlet />;
    }

    return <Navigate to="/auth" replace />;
}
