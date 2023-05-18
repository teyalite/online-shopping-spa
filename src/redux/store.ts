import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./admin/reducer";
import { AdminState } from "./admin/types";
import sellerReducer from "./seller/reducer";
import { SellerState } from "./seller/types";
import { HomeState } from "./home/types";
import homeReducer from "./home/reducer";

interface State {
    admin: AdminState;
    seller: SellerState;
    home: HomeState;
}

export const store = configureStore<State, any>({
    reducer: {
        admin: adminReducer,
        seller: sellerReducer,
        home: homeReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
