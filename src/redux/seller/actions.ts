import { Dispatch } from "redux";
import { FetchProducts, SellerActionType, SellerProductState } from "./types";

export const fetchProductsCreator = (payload: SellerProductState) => {
    return (dispatch: Dispatch<FetchProducts>) => {
        dispatch({
            value: payload,
            type: SellerActionType.FetchProducts,
        });
    };
};
