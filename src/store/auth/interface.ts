import * as type from "../types";


export interface AuthState {
    isLogged: boolean,
    username: string
}

export type AuthAction = LoginAction;

export interface LoginAction {
    type: typeof type.LOGIN;
    payload: AuthState;
}

export interface AuthInput {
    username: string,
    password: string
}