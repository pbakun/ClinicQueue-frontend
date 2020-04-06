import React from 'react';
import AppBar from "../components/Navigation/AppBar";
import DoctorView from './DoctorView';
import HubContextProvider from '../contexts/hub/HubContext';
import { getToken } from '../config/request';

interface Props {
    username?: string
}

export const Routes: React.FC<Props> = props => {
    return (
        <React.Fragment>
            <HubContextProvider>
                <AppBar />
                <DoctorView />
            </HubContextProvider>
        </React.Fragment>
    );
}
