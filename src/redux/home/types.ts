import { ProductCategory } from "../../types";
import { Store } from "../admin/types";

const store: any = {};

export interface ProductItem {
    id: number;
    quantity: number;
    images: string[];
    name: string;
    price: number;
    description: string;
    store: Store;
}

export interface HomeDrawerState {
    loading: boolean;
    failed: boolean;
    categories: ProductCategory[];
}

export interface HomeProductsState {
    loading: boolean;
    failed: boolean;
    products: ProductItem[];
    category: number | null;
}

export interface HomeShopcartState {}

export interface HomeState {
    drawer: HomeDrawerState;
    products: HomeProductsState;
    shopcart: { [key: number]: number };
}

export interface FetchDrawer {
    type: HomeActionType.FetchDrawer;
    value: HomeDrawerState;
}

export interface FetchProducts {
    type: HomeActionType.FetchProducts;
    value: HomeProductsState;
}

export interface Shopcart {
    type: HomeActionType.Shopcart;
    value: { key: number; value: number };
}

export enum HomeActionType {
    FetchDrawer = "HomeFetchDrawer",
    FetchProducts = "HomeFetchProducts",
    Shopcart = "HomeShopcart",
}

export type HomeAction = FetchDrawer | FetchProducts | Shopcart;

export const defaultHomeState: HomeState = {
    drawer: {
        loading: false,
        failed: false,
        categories: [],
    },
    products: {
        category: null,
        loading: false,
        failed: false,
        products: [],
    },
    shopcart: {},
};
