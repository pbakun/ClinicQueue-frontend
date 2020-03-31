import axios, { AxiosError } from "axios";
import instance from "./axios";
import { RootActions } from "../store/actions";
import { Dispatch } from "redux";

const config = {
    headers: {
        'Content-type': "application/json",
    },
    withCredentials: true
}

export const get = (
    // dispatch: Dispatch<RootActions>,
    url: string,
    callback: (response: any) => void,
    error: (error: any) => void
) => {
    instance
        .get(url, config)
        .then(callback)
        .catch(error);
}

export const post = (
    // dispatch: Dispatch<RootActions>,
    url: string,
    body: any,
    callback: (response: any) => void,
    error: (error: any) => void
) => {
    instance
        .post(url, body, config)
        .then(callback)
        .catch(error);
}

export const put = (
    url: string,
    body: any,
    callback: (response: any) => void,
    error: (error: any) => void
) => {
    instance
        .put(url, body, config)
        .then(callback)
        .catch(error);
}

export const remove = (
    url: string,
    data: any,
    callback: (response: any) => void,
    error: (error: AxiosError) => void
) => {
    instance
        .delete(url, {...config, data: data})
        .then(callback)
        .catch(error);
}
