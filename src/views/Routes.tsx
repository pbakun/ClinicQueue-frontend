import React from 'react';
import AppBar from "../components/Navigation/AppBar";
import DoctorView from './DoctorView';

interface Props {
}

export const Routes: React.FC<Props> = props => {

    return (
        <React.Fragment>
            <AppBar />
            <DoctorView />
        </React.Fragment>
    );
}
