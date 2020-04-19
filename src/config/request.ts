import { AxiosError } from "axios";
import instance from "./axios";
import { identityToken } from "../utils/staticData";

const config = {
    headers: {
        'Content-Type': "application/json",
        'Authorization': ""
    }
}

export const getToken = () => {
    let token = sessionStorage.getItem(identityToken);
    if(!token)
        return "";
    return token;
}

export const setToken = (token: string) => {
    sessionStorage.setItem(identityToken, token);
}

export const removeToken = () => {
    return sessionStorage.removeItem(identityToken);
}

export const setUsername = (username: string) => {
    sessionStorage.setItem("username", username);
}

export const getUsername = () => {
    let token = sessionStorage.getItem("username");
    if(!token)
        return "";
    return token;
}

export const removeUsername = () => {
    return sessionStorage.removeItem("username");
}

const setConfig = () => {
    let token = getToken();
    config.headers.Authorization = "Bearer " + token;
    return config;
}

export const get = (
    url: string,
    callback: (response: any) => void,
    errorCallback: (error: any) => void
) => {
    instance
        .get(url, setConfig())
        .then(callback)
        .catch((error: any ) => {
            try {
                if(error.response.status === 401) {
                    removeToken();
                    window.location.reload();
                }
            }
            catch {
            }
            finally{
                errorCallback(error);
            }
        });
}

export const post = (
    url: string,
    body: any,
    callback: (response: any) => void,
    errorCallback: (error: any) => void
) => {
    instance
        .post(url, body, setConfig())
        .then(callback)
        .catch((error: any ) => {
            if(error.response && error.response.status === 401) {
                removeToken();
                window.location.reload();
            }
            errorCallback(error);
        });
}

export const put = (
    url: string,
    body: any,
    callback: (response: any) => void,
    errorCallback: (error: any) => void
) => {
    instance
        .put(url, body, setConfig())
        .then(callback)
        .catch((error: any ) => {
            if(error.response && error.response.status === 401) {
                removeToken();
                window.location.reload();
            }
            errorCallback(error);
        });
}

export const remove = (
    url: string,
    data: any,
    callback: (response: any) => void,
    errorCallback: (error: AxiosError) => void
) => {
    instance
        .delete(url, {...setConfig(), data: data})
        .then(callback)
        .catch((error: any ) => {
            if(error.response && error.response.status === 401) {
                removeToken();
                window.location.reload();
            }
            errorCallback(error);
        });
}
