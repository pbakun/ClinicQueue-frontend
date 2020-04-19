import { RootActions } from './../actions';
import * as type from "../types";
import { Dispatch } from 'redux';

export const setLoader = (dispatch: Dispatch<RootActions>, isLoading: boolean) => {
    dispatch({
        type: type.SET_LOADING,
        payload: isLoading
    });
 }
