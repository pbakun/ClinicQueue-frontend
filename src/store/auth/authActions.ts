import { RootActions } from "./../actions";
import { AuthState } from "./interface";
import { Dispatch } from "redux";
import * as type from "../types";
import instance from "../../config/axios";

const config = {
	headers: {
		"Content-type": "application/json"
	},
	withCredentials: true
};

export const login = (dispatch: Dispatch<RootActions>, username: string) => {
	let data: AuthState = {
		isLogged: true,
		username: username
	};
		dispatch({
			type: type.LOGIN,
			payload: data
		});
};

export const logout = () => {
	let data: AuthState = {
		isLogged: false,
		username: ""
	};
	return (dispatch: Dispatch<RootActions>) => {
		dispatch({
			type: type.LOGIN,
			payload: data
		});
	};
};

export const auth = (username: string, password: string) => {
	return (dispatch: Dispatch<RootActions>) => {
		instance
			.post(
				"auth/login",
				{ username: username, password: password },
				config
			)
			.then(response => {
				login(dispatch, response.data.username);
			})
			.catch(err => console.error(err));
	};
};

export const checkLoggedIn = () => {
	return (dispatch: Dispatch<RootActions>) => {
		instance
			.get(
				"auth/status",
				config
			)
			.then(response => {
				login(dispatch, response.data.username);
			})
			.catch(err => console.error(err));

	};
}