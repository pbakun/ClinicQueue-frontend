import { combineReducers } from "redux";
import {authReducer} from "./auth/authReducer";
import { roomsReducer } from "./rooms/roomsReducer";
import { utilityReducer } from "./utility/utilityReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    rooms: roomsReducer,
    utility: utilityReducer
});

export type RootState = ReturnType<typeof rootReducer>