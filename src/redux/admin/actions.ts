import { Dispatch } from "redux";
import { ProductCategory } from "../../types";
import {
    AddCategory,
    AdminActionType,
    AdminCategoriesState,
    AdminUsersState,
    FetchCategories,
    FetchUsers,
    UpdateCategory,
} from "./types";

export const fetchUsersCreator = (payload: AdminUsersState) => {
    return (dispatch: Dispatch<FetchUsers>) => {
        dispatch({
            value: payload,
            type: AdminActionType.FetchUsers,
        });
    };
};

export const fetchCategoriesCreator = (payload: AdminCategoriesState) => {
    return (dispatch: Dispatch<FetchCategories>) => {
        dispatch({
            value: payload,
            type: AdminActionType.FetchCategories,
        });
    };
};

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
