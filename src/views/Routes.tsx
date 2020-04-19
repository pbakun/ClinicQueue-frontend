import React from 'react';
import AppBar from "../components/Navigation/AppBar";
import { Switch, Route } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";
import DoctorView from './DoctorView';
import HomeView from './HomeView';
import HubContextProvider from '../contexts/hub/HubContext';
import PatientView from './PatientView';
import MobileAppBar from "../components/Navigation/Mobile/AppBar"

interface Props {
    username?: string
}

export const Routes: React.FC<Props> = props => {
    return (
        <React.Fragment>
            <Switch>
                <Route
                    exact
                    path="/"
                >
                    <BrowserView>
                        <AppBar />
                        <HubContextProvider>
                            <DoctorView />
                        </HubContextProvider>
                    </BrowserView>
                    <MobileView>
                        <MobileAppBar />
                        <HomeView />
                    </MobileView>
                </Route>
                <Route
                    path="/patient/:roomNo"
                >
                    <MobileView>
                        <MobileAppBar />
                    </MobileView>
                    <HubContextProvider>
                        <PatientView />
                    </HubContextProvider>
                </Route>
            </Switch>
        </React.Fragment>
    );
}
