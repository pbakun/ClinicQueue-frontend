import React from 'react';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import {Index as PatientView}  from "./Patient/Index";

const theme = createMuiTheme({
  
});

export const Patient: React.FC = () => {

    return (
        <ThemeProvider theme={theme}>
            <PatientView roomNo="12" />
        </ThemeProvider>
    );
}