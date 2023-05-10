import { ProductCategory } from "../../types";

export interface AdminState {
    categories: {
        loading: boolean;
        failed: boolean;
        categories: ProductCategory[];
    };
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
}

export type AdminAction = AddCategory | UpdateCategory;

export const defaultAdminState: AdminState = {
    categories: {
        loading: false,
        failed: false,
        categories: [],
    },
};
