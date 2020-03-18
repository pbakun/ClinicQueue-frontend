import React from 'react';
import styled from 'styled-components';
import './App.css';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { teal, lightBlue } from "@material-ui/core/colors"
import { Patient } from "./components/Patient";
import { Routes } from "./views/Routes";
import AuthView from './views/AuthView';

interface IAppProps {
  // token: string
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


function App(props: IAppProps) {
  // const { token } = props; 
  const token = null;


  return (
    <StyledApp>
      <ThemeProvider theme={theme}>
        {!token ? <AuthView /> : <Routes token="lala" />}
      </ThemeProvider>
    </StyledApp>
  );
}

export default App;
