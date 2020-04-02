import axios, { AxiosError } from "axios";
import instance from "./axios";
import { RootActions } from "../store/actions";
import { Dispatch } from "redux";
import { identityToken } from "../utils/staticData";

const config = {
    headers: {
        'Content-Type': "application/json",
        'Authorization': ""
    }
}

export const getToken = () => {
    return localStorage.getItem(identityToken);
}

const setConfig = () => {
    let token = getToken();
    config.headers.Authorization = "Bearer " + token;
    return config;
}

export const get = (
    // dispatch: Dispatch<RootActions>,
    url: string,
    callback: (response: any) => void,
    error: (error: any) => void
) => {
    instance
        .get(url, setConfig())
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
        .post(url, body, setConfig())
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
        .put(url, body, setConfig())
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
        .delete(url, {...setConfig(), data: data})
        .then(callback)
        .catch(error);
}
