import { RootActions } from './../actions';
import * as type from "../types";
import { Dispatch } from 'redux';
import { get } from '../../config/request';

export const getRooms = () => {
    return (dispatch: Dispatch<RootActions>) => {
        get(
            "home",
            response => {
                setRooms(dispatch, response.data);
            },
            error => { }
        )
    }
 }

 const setRooms = (dispatch: Dispatch<RootActions>, rooms: string[]) => {
    dispatch({
        type: type.SET_AVAILABLE_ROOMS,
        payload: rooms
    });
 }