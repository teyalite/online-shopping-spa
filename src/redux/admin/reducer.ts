import {
    defaultAdminState,
    AdminState,
    AdminActionType,
    AdminAction,
} from "./types";

function adminReducer(
    state: AdminState = defaultAdminState,
    action: AdminAction
): AdminState {
    switch (action.type) {
        case AdminActionType.FetchUsers:
            state = {
                ...state,
                users: {
                    ...state.users,
                    ...action.value,
                },
            };

            return state;

        case AdminActionType.FetchCategories:
            state = {
                ...state,
                categories: {
                    ...state.categories,
                    ...action.value,
                },
            };

            return state;

        case AdminActionType.AddCategory: {
            return state;
        }

        default:
            return state;
    }
}

export default adminReducer;
