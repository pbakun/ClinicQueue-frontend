import * as type from "../types";

export interface RoomsState {
    availableRooms: string[]
}

export type RoomsAction = AvailableRooms;

interface AvailableRooms {
    type: typeof type.SET_AVAILABLE_ROOMS;
    payload: string[]
}