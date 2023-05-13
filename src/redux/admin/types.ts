import { ProductCategory } from "../../types";

export interface Store {
    id: number;
    description: string;
    approved: boolean;
    owner_id: string;
    name: string;
    image: string;
    created_at: string;
    email: string;
}

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

export interface AdminSellersState {
    loading: boolean;
    failed: boolean;
    stores: Store[];
}

export interface AdminState {
    categories: AdminCategoriesState;
    users: AdminUsersState;
    sellers: AdminSellersState;
}

export interface FetchUsers {
    type: AdminActionType.FetchUsers;
    value: AdminUsersState;
}

export interface FetchSellers {
    type: AdminActionType.FetchSellers;
    value: AdminSellersState;
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
    FetchSellers = "FetchSellers",
}

export type AdminAction =
    | AddCategory
    | UpdateCategory
    | FetchCategories
    | FetchUsers
    | FetchSellers;

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
    sellers: {
        loading: false,
        failed: false,
        stores: [],
    },
};
