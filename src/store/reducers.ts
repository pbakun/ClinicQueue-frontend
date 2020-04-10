import { combineReducers } from "redux";
import {authReducer} from "./auth/authReducer";
import { roomsReducer } from "./rooms/roomsReducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    rooms: roomsReducer
});

export type RootState = ReturnType<typeof rootReducer>