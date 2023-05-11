import { ProductCategory } from "../../types";

export interface AdminCategoriesState {
    loading: boolean;
    failed: boolean;
    categories: ProductCategory[];
    allCategories: ProductCategory[];
}

export interface AdminState {
    categories: AdminCategoriesState;
}

export interface FetchCategories {
    type: AdminActionType.FetchCategories;
    value: AdminCategoriesState;
}

export interface AddCategory {
    type: AdminActionType.AddCategory;
    value: ProductCategory;
}

export interface UpdateCategory {}

export interface UpdateCategory {
    type: AdminActionType.UpdateCategory;
    value: ProductCategory;
}

export enum AdminActionType {
    AddCategory = "AddCategory",
    UpdateCategory = "UpdateCategory",
    FetchCategories = "FetchCategories",
}

export type AdminAction = AddCategory | UpdateCategory | FetchCategories;

export const defaultAdminState: AdminState = {
    categories: {
        loading: false,
        failed: false,
        categories: [],
        allCategories: [],
    },
};
