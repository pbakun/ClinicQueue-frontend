import * as type from "../types";

export interface UtilityState {
    isLoading: boolean;
}

export type UtilityAction = LoaderAction;

interface LoaderAction {
    type: typeof type.SET_LOADING;
    payload: boolean
}