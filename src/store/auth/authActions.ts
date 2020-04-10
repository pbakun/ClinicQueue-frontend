import { setToken, getToken, removeToken, setUsername, removeUsername, post } from './../../config/request';
import { useSnackbar } from 'notistack';
import { RootState } from './../reducers';
import { RootActions } from "./../actions";
import { AuthState } from "./interface";
import { Dispatch } from "redux";
import * as type from "../types";
import instance from "../../config/axios";
import { serverErrorMessage } from "../../utils/staticData";

const config = {
	headers: {
		"Content-Type": "application/json",
		"Authorization": ""
	}
};

export const login = (dispatch: Dispatch<RootActions>, username: string, token: string) => {
	let data: AuthState = {
		isLogged: true,
		username: username,
		token: token
	};
	setToken(token);
	setUsername(username);
		dispatch({
			type: type.LOGIN,
			payload: data
		});
};

export const logout = () => {
	let data: AuthState = {
		isLogged: false,
		username: "",
		token: undefined
	};
	let token = getToken();
	config.headers.Authorization = "Bearer " + token;
	removeToken();
	removeUsername();
	return (dispatch: Dispatch<RootActions>, getState: () => RootState) => {
		instance
			.post(
				"auth/logout",
				{ },
				config
			)
			.then(response => {
				dispatch({
					type: type.LOGIN,
					payload: data
				})
			})
			.catch(err => console.error(err))
			// .finally(() => window.location.reload());
	};
};

export const auth = (username: string, password: string) => {

	let token = getToken();
	config.headers.Authorization = "Bearer " + token;
	return (dispatch: Dispatch<RootActions>) => {
		instance
			.post(
				"auth/login",
				{ username: username, password: password },
				config
			)
			.then(response => {
				login(dispatch, response.data.firstName, response.data.token);
			})
			.catch(err => console.error(err));
	};
};

export const forgotPassword = (email: string) => {
	let body = {
		email: email
	}
	return (dispatch: Dispatch<RootActions>) => {
		post(
			"auth/forgotpassword",
			body,
			response => {
				alert("Sprawdź email w celu zresetowania hasła!");
			},
			error => { }
		)
	}
}