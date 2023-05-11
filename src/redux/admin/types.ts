import { ProductCategory } from "../../types";

export interface AdminCategoriesState {
    loading: boolean;
    failed: boolean;
    categories: ProductCategory[];
    allCategories: ProductCategory[];
}

export interface AdminUsersState {
    loading: boolean;
    failed: boolean;
    users: { email: string; uid: string }[];
}

export interface AdminState {
    categories: AdminCategoriesState;
    users: AdminUsersState;
}

export interface FetchUsers {
    type: AdminActionType.FetchUsers;
    value: AdminUsersState;
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
    FetchUsers = "FetchUsers",
}

export type AdminAction =
    | AddCategory
    | UpdateCategory
    | FetchCategories
    | FetchUsers;

export const defaultAdminState: AdminState = {
    categories: {
        loading: false,
        failed: false,
        categories: [],
        allCategories: [],
    },
    users: {
        loading: false,
        failed: false,
        users: [],
    },
};
