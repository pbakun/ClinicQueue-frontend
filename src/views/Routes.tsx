import React from 'react';
import AppBar from "../components/Navigation/AppBar";
import DoctorView from './DoctorView';

interface Props {
    token: String;
}

export const Routes: React.FC<Props> = props => {

    return (
        <React.Fragment>
            <AppBar />
            <DoctorView />
        </React.Fragment>
    );
}
