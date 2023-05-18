import { ProductCategory } from "../../types";

export interface ProductItem {
    id: number;
    quantity: number;
    images: string[];
    name: string;
    price: number;
}

export interface SellerProductState {
    loading: boolean;
    failed: boolean;
    products: ProductItem[];
    categories: ProductCategory[];
}

export interface SellerState {
    products: SellerProductState;
}

export interface FetchProducts {
    type: SellerActionType.FetchProducts;
    value: SellerProductState;
}

export enum SellerActionType {
    FetchProducts = "SellerFetchProducts",
}

export type SellerAction = FetchProducts;

export const defaultSellerState: SellerState = {
    products: {
        loading: false,
        failed: false,
        products: [],
        categories: [],
    },
};
