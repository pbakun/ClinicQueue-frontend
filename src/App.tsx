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
import Spinner from "./components/Spinner/Spinner";

interface IAppProps {
	token?: string,
	isLoading: boolean
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
	const { token, isLoading } = props;
	const classes = useStyles(theme);

	return (
		<StyledApp>
			<ThemeProvider theme={theme}>

				{isLoading && <Spinner />}

				<SnackbarProvider
					maxSnack={5}
					classes={{ variantInfo: classes.variantInfo }}
					autoHideDuration={5000}
				>
					<BrowserRouter>
						<BrowserView style={{height: "100%"}}>
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
		token: state.auth.token,
		isLoading: state.utility.isLoading
	}
}

const mapDispatchToProps = (
	dispatch: ThunkDispatch<any, any, RootActions>
) => ({
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
