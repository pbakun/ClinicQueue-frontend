import * as type from "../types";
import { AuthState, AuthAction } from "./interface";

const initialState: AuthState = {
    isLogged: false,
    token: undefined,
    username: ""
}

export function authReducer(state = initialState, action: AuthAction): AuthState {
    switch (action.type) {
        case type.LOGIN:
            return {
                ...state,
                isLogged: action.payload.isLogged,
                username: action.payload.username,
                token: action.payload.token
            }

        default:
            return state;
    }
}
