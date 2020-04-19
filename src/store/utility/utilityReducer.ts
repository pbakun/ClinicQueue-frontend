import { UtilityState, UtilityAction } from "./interface";
import * as type from "../types";

const initialState: UtilityState = {
    isLoading: false
}

export function utilityReducer(state = initialState, action: UtilityAction): UtilityState {
    switch(action.type) {
        case type.SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        default:
            return state;
    }
}