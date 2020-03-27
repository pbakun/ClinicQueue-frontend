import axios from "axios";
import instance from "./axios";
import { RootActions } from "../store/actions";
import { Dispatch } from "redux";

const config = {
    headers: {
        'Content-type': "application/json",
    },
    withCredentials: true
}

export const post = (
        dispatch: Dispatch<RootActions>,
        url: string,
        body: any,
        callback: (response: any) => void,
        error: (error: any) => void
    ) => {
        instance
            .post(url, body, config)
            .then((response: any) => callback)
            .catch((error: any) => error);
    }