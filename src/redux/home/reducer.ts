import {
    HomeAction,
    HomeActionType,
    HomeState,
    defaultHomeState,
} from "./types";

function homeReducer(
    state: HomeState = defaultHomeState,
    action: HomeAction
): HomeState {
    switch (action.type) {
        case HomeActionType.FetchDrawer:
            state = {
                ...state,
                drawer: {
                    ...state.drawer,
                    ...action.value,
                },
            };

            return state;

        case HomeActionType.FetchProducts:
            state = {
                ...state,
                products: {
                    ...state.drawer,
                    ...action.value,
                },
            };

            return state;

        default:
            return state;
    }
}

export default homeReducer;
