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

export interface HomeState {
    drawer: HomeDrawerState;
    products: HomeProductsState;
}

export interface FetchDrawer {
    type: HomeActionType.FetchDrawer;
    value: HomeDrawerState;
}

export interface FetchProducts {
    type: HomeActionType.FetchProducts;
    value: HomeProductsState;
}

export enum HomeActionType {
    FetchDrawer = "HomeFetchDrawer",
    FetchProducts = "HomeFetchProducts",
}

export type HomeAction = FetchDrawer | FetchProducts;

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
        products: [
            // {
            //     price: 10,
            //     id: 12,
            //     images: [
            //         "http://localhost:8080/static/products/eddf40b6-32b6-4ca9-944a-3ed35eaa3d44128logo.png",
            //         "http://localhost:8080/static/products/6c4b20fb-1f9f-4dfc-bd3f-fcf46df6a518hackbio.png",
            //     ],
            //     name: "Product name",
            //     quantity: 1,
            //     description: "Product name",
            //     store,
            // },
            // {
            //     price: 200,
            //     id: 15,
            //     images: [
            //         "http://localhost:8080/static/products/e2044aef-4bdb-40b4-bec5-8775e9f7e2a0128logo.png",
            //         "http://localhost:8080/static/products/65960c91-fc96-4694-8316-9064e36635dfhackbio.png",
            //     ],
            //     name: "Product name",
            //     quantity: 1,
            //     description: "des",
            //     store,
            // },
            // {
            //     price: 10,
            //     id: 3,
            //     images: [
            //         "http://localhost:8080/static/products/2d2b5259-0f78-4034-8efe-b938076329cd128logo.png",
            //         "http://localhost:8080/static/products/6ad97b1f-0c54-4f28-a851-202b5353cb8ehackbio.png",
            //     ],
            //     name: "Product name",
            //     quantity: 1,
            //     description: "Product name",
            //     store,
            // },
            // {
            //     price: 10,
            //     id: 7,
            //     images: [
            //         "http://localhost:8080/static/products/c61822cb-86d5-4e61-9f0a-1dcfcddc23e3128logo.png",
            //         "http://localhost:8080/static/products/9d0f8be5-7f35-4bbe-9e10-7a7ece557539hackbio.png",
            //     ],
            //     name: "Product name",
            //     quantity: 1,
            //     description: "Product name",
            //     store,
            // },
            // {
            //     price: 10,
            //     id: 9,
            //     images: [
            //         "http://localhost:8080/static/products/76bd93d6-269f-4b67-b859-04e45282b25d128logo.png",
            //         "http://localhost:8080/static/products/78af48e9-38e4-45be-9253-9a12476a8719hackbio.png",
            //     ],
            //     name: "Product name",
            //     quantity: 1,
            //     description: "Product name",
            //     store,
            // },
            // {
            //     price: 10,
            //     id: 11,
            //     images: [
            //         "http://localhost:8080/static/products/96160b92-f8bc-4dc3-9045-04034bd18dd2128logo.png",
            //         "http://localhost:8080/static/products/d7c3c7e0-aecd-49ef-884a-dcc001ff6412hackbio.png",
            //     ],
            //     name: "Product name",
            //     quantity: 1,
            //     description: "Product name",
            //     store,
            // },
        ],
    },
};
