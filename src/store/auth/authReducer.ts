import * as type from "../types";
import { AuthState, AuthAction } from "./interface";

const initialState: AuthState = {
    isLogged: false,
    username: ""
}

export function authReducer(state = initialState, action: AuthAction): AuthState {
    console.log('action', action)
    switch (action.type) {
        case type.LOGIN:
            return {
                ...state,
                isLogged: action.payload.isLogged,
                username: action.payload.username
            }

        default:
            return state;
    }
}
