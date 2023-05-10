import { Dispatch } from "redux";
import { ProductCategory } from "../../types";
import { AddCategory, AdminActionType, UpdateCategory } from "./types";

export const addCategoryCreator = (payload: ProductCategory) => {
    return (dispatch: Dispatch<AddCategory>) => {
        dispatch({
            value: payload,
            type: AdminActionType.AddCategory,
        });
    };
};

export const updateCategoryCreator = (payload: ProductCategory) => {
    return (dispatch: Dispatch<UpdateCategory>) => {
        dispatch({
            value: payload,
            type: AdminActionType.UpdateCategory,
        });
    };
};
