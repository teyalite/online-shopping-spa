import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./admin/reducer";
import { AdminState } from "./admin/types";

interface State {
    admin: AdminState;
}

export const store = configureStore<State, any>({
    reducer: {
        admin: adminReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
