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
        case AdminActionType.AddCategory:
            return state;

        default:
            return state;
    }
}

export default adminReducer;
