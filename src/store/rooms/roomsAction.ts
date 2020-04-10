import { RootActions } from './../actions';
import * as type from "../types";
import { Dispatch } from 'redux';

export const getRooms = () => {
    
    return (dispatch: Dispatch<RootActions>) => {
        setRooms(dispatch, ["12, 13, test"])
    }
 }

 const setRooms = (dispatch: Dispatch<RootActions>, rooms: string[]) => {
    dispatch({
        type: type.SET_AVAILABLE_ROOMS,
        payload: ["12", "13", "14"]
    });
 }