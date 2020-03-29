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

interface IAppProps {
	isLogged: boolean,
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
	const { isLogged } = props;
	const token = null;
	const classes = useStyles(theme);
	useEffect(() => {
		props.checkLoggedIn();
	}, [])

	return (
		<StyledApp>
			<ThemeProvider theme={theme}>
				<SnackbarProvider
					maxSnack={5}
					classes={{variantInfo: classes.variantInfo}}
					autoHideDuration={5000}
				>
					{!isLogged ? <AuthView /> : <Routes />}
				</SnackbarProvider>
			</ThemeProvider>
		</StyledApp>
	);
}

const mapStateToProps = (state: RootState) => {
	return {
		isLogged: state.auth.isLogged
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
