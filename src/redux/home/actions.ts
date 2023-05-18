import { Dispatch } from "redux";
import {
    FetchDrawer,
    HomeDrawerState,
    HomeActionType,
    HomeProductsState,
    FetchProducts,
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
