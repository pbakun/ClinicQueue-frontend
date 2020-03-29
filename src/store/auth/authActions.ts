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
		"Content-type": "application/json"
	},
	withCredentials: true
};

export const login = (dispatch: Dispatch<RootActions>, username: string, token: string) => {
	let data: AuthState = {
		isLogged: true,
		username: username,
		token: token
	};
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
			.catch(err => console.error(err));
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
				login(dispatch, response.data.username, response.data.token);
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
				console.log('response', response)
				login(dispatch, response.data.username, response.data.token);
			})
			.catch(err => {
				console.log('err', err)
			}
		)
	};
}