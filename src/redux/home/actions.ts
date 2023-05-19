import { Dispatch } from "redux";
import {
    FetchDrawer,
    HomeDrawerState,
    HomeActionType,
    HomeProductsState,
    FetchProducts,
    Shopcart,
} from "./types";

export const fetchDrawerCreator = (payload: HomeDrawerState) => {
    return (dispatch: Dispatch<FetchDrawer>) => {
        dispatch({
            value: payload,
            type: HomeActionType.FetchDrawer,
        });
    };
};

export const fetchProductsCreator = (payload: HomeProductsState) => {
    return (dispatch: Dispatch<FetchProducts>) => {
        dispatch({
            value: payload,
            type: HomeActionType.FetchProducts,
        });
    };
};

export const shopcartCreator = (payload: { key: number; value: number }) => {
    return (dispatch: Dispatch<Shopcart>) => {
        dispatch({
            value: payload,
            type: HomeActionType.Shopcart,
        });
    };
};
