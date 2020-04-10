import React, { useEffect } from 'react';
import styled from 'styled-components';
import './App.css';
import { connect } from "react-redux";
import { ThemeProvider, createMuiTheme, makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { teal, lightBlue } from "@material-ui/core/colors";
import { SnackbarProvider } from "notistack";
import { RootState } from "./store/reducers";
import { RootActions } from "./store/actions";
import { Routes } from "./views/Routes";
import AuthView from './views/AuthView';
import { ThunkDispatch } from 'redux-thunk';
import { checkLoggedIn } from './store/auth/authActions';
import { getToken } from './config/request';

interface IAppProps {
	username?: string,
	token?: string,
	checkLoggedIn: () => void
}

const StyledApp = styled.div`
  overflow-x: hidden;
  height: 100vh;
  background: rgba(248, 248, 248, 0.93);
`;

const theme = createMuiTheme({
	palette: {
		primary: teal,
		secondary: lightBlue,
		background: {
			paper: "#FFF",
			default: "rgba(248, 248, 248, 0.93)"
		}
	}
});

const useStyles = makeStyles((theme: Theme) => createStyles({
	variantInfo: {
		background: teal[600]
	}
}));


function App(props: IAppProps) {
	const { username, token } = props;
	const classes = useStyles(theme);

	return (
		<StyledApp>
			<ThemeProvider theme={theme}>
				<SnackbarProvider
					maxSnack={5}
					classes={{variantInfo: classes.variantInfo}}
					autoHideDuration={5000}
				>
					{!token ? <AuthView /> : <Routes username={username} />}
				</SnackbarProvider>
			</ThemeProvider>
		</StyledApp>
	);
}

const mapStateToProps = (state: RootState) => {
	return {
		username: state.auth.username,
		token: state.auth.token
	}
}

const mapDispatchToProps = (
	dispatch: ThunkDispatch<any, any, RootActions>
) => ({
	checkLoggedIn: () => dispatch(checkLoggedIn()),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
