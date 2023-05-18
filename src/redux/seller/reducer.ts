import {
    defaultSellerState,
    SellerState,
    SellerActionType,
    SellerAction,
} from "./types";

function sellerReducer(
    state: SellerState = defaultSellerState,
    action: SellerAction
): SellerState {
    switch (action.type) {
        case SellerActionType.FetchProducts:
            state = {
                ...state,
                products: {
                    ...state.products,
                    ...action.value,
                },
            };

            return state;

        default:
            return state;
    }
}

export default sellerReducer;
