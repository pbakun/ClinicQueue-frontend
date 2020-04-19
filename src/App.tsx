import React from 'react';
import styled from 'styled-components';
import './App.css';
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import { ThemeProvider, createMuiTheme, makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { teal, lightBlue } from "@material-ui/core/colors";
import { SnackbarProvider } from "notistack";
import { BrowserView, MobileView } from "react-device-detect";
import { RootState } from "./store/reducers";
import { RootActions } from "./store/actions";
import { Routes } from "./views/Routes";
import AuthView from './views/AuthView';
import { ThunkDispatch } from 'redux-thunk';
import { checkLoggedIn } from './store/auth/authActions';
import { getToken } from './config/request';
import HomeView from './views/HomeView';

interface IAppProps {
	username?: string
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
	const { username } = props;
	const classes = useStyles(theme);
	const token = getToken();

	return (
		<StyledApp>
			<ThemeProvider theme={theme}>
				<SnackbarProvider
					maxSnack={5}
					classes={{ variantInfo: classes.variantInfo }}
					autoHideDuration={5000}
				>
					<BrowserRouter>
						<BrowserView>
							{!token ? <AuthView /> : <Routes />}
						</BrowserView>
						<MobileView>
							<Routes />
						</MobileView>
					</BrowserRouter>
				</SnackbarProvider>
			</ThemeProvider>
		</StyledApp>
	);
}

const mapStateToProps = (state: RootState) => {
	return {
		username: state.auth.username
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
