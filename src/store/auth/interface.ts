import * as type from "../types";


export interface AuthState {
    isLogged: boolean,
    token?: string | undefined,
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