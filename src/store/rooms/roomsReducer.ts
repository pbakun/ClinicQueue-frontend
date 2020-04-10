import { RoomsState, RoomsAction } from "./interface";
import * as type from "../types";

const initialState: RoomsState = {
    availableRooms: []
}

export function roomsReducer(state = initialState, action: RoomsAction): RoomsState {
    switch(action.type) {
        case type.SET_AVAILABLE_ROOMS:
            return {
                ...state,
                availableRooms: action.payload
            }
        default:
            return state;
    }
}