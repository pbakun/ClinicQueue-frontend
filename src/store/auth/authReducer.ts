import * as type from "../types";
import { AuthState, AuthAction } from "./interface";
import { getToken, getUsername } from "../../config/request";

const initialState: AuthState = {
    isLogged: false,
    token: getToken(),
    username: getUsername()
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
