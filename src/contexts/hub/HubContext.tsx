import React, { createContext, Component } from 'react';
import * as signalR from "@microsoft/signalr";
import { withSnackbar } from 'notistack';
import * as routes from "./routes";
import { IQueueContext } from './IQueueContext';
import { queueHubConnectionErrorMessage, defaultErrorMessage } from '../../utils/staticData';
import { getToken } from '../../config/request';

const initialContext: IQueueContext = {
    doctorName: "",
    queueMessage: "",
    additionalInfo: "",
    registerDoctor: () => { },
    registerPatient: () => { },
    disconnect: () => { },
    connectionStop: () => { },
    nextNo: () => { },
    prevNo: () => { },
    newNo: () => { },
    newAdditionalInfo: () => { },
    newRoomNo: () => { }
}

export const HubContext = createContext<IQueueContext>(initialContext);

class HubContextProvider extends Component<any> {
    private _connection: signalR.HubConnection;
    private _manualDisconnected: boolean = false;
    private _token: string = getToken();
    state = {
        doctorName: "",
        queueMessage: "",
        additionalInfo: "",
        errorCount: 0,
    }

    constructor(props: any) {
        super(props);
        this._connection = new signalR.HubConnectionBuilder()
                        .withUrl(routes.hubUrl, { accessTokenFactory: () => this._token })
                        .build();
        this.setUpReceiveQueueNo();
        this.setUpReceiveAdditionalInfo();
        this.setUpReceiveDoctorFullName();
        this.setUpCloseConnectionEvent = this.setUpCloseConnectionEvent.bind(this);
    }

    notifyError = () => {
        this.props.enqueueSnackbar(queueHubConnectionErrorMessage, { variant: "error" });
    }

    notifyWarning = () => {
        this.props.enqueueSnackbar(defaultErrorMessage, { variant: "warning" });
    }

    connect = (callback?: () => void) => {
        this._connection.start()
            .then(() => {
                if (callback) {
                    this.setUpCloseConnectionEvent(callback);
                    callback();
                }
                else this.setUpCloseConnectionEvent();
                this.setState({ errorCount: 0 });
            })
            .catch((error: any) => {
                console.error("hub connect error", error);
                this.state.errorCount > 3 && this.notifyError();
                setTimeout(() => this.connect(callback), 5000);
                this.setState((prevState: any) => {
                    return {
                        ...prevState,
                        errorCount: prevState.errorCount + 1
                    }
                });
            });

    }

    disconnect = () => {
        this._manualDisconnected = true;
        this._connection.invoke(routes.sendUserDisconnect)
            .then(() => {
                console.info("User Disconnected");
                this._connection.stop();
        });
    }

    connectionStop = () => {
        this._manualDisconnected = true;
        this._connection.stop().then(() => console.info("Connection stopped"));
    }

    registerDoctor = (id: string, roomNo: string) => {
        this._connection.invoke(routes.sendRegisterDoctorRoute, id, roomNo)
            .then(() => console.info("Doctor registered"))
            .catch((error) => {
                console.error(error)
                this.notifyWarning();
            });
    }

    handleRegisterDoctor(id: string, roomNo: string) {
        this.connect(() => this.registerDoctor(id, roomNo));
    }

    registerPatient = (roomNo: string) => {
        this._connection.invoke(routes.sendRegisterPatientRoute, roomNo)
            .then(() => console.info("View Registered"))
            .catch(this.notifyWarning);
    }

    handleRegisterPatient(roomNo: string) {
        this.connect(() => this.registerPatient(roomNo));
    }

    handleNextNo = (id: string, roomNo: string) => {
        this._connection.invoke(routes.sendNextNoRoute, id, roomNo)
            .catch(this.notifyWarning);
    }

    handlePrevNo = (id: string, roomNo: string) => {
        this._connection.invoke(routes.sendPrevNoRoute, id, roomNo)
            .catch(this.notifyWarning);
    }

    handleNewNo = (id: string, queueNo: number, roomNo: string) => {
        this._connection.invoke(routes.sendNewNoRoute, id, queueNo, roomNo)
            .catch(this.notifyWarning);
    }

    handleNewAdditionalInfo = (id: string, roomNo: string, message: string) => {
        this._connection.invoke(routes.sendAdditionalInfoRoute, id, roomNo, message)
            .catch(this.notifyWarning);
    }

    handleChangeRoomNo = (id: string, newRoomNo: string) => {
        this._connection.invoke(routes.sendUserDisconnect)
            .then(() => this.registerDoctor(id, newRoomNo))
            .catch(this.notifyError);
    }

    setUpReceiveQueueNo = () => {
        this._connection.on(routes.receiveQueueNoRoute, (id: any, msg: string) => {
            this.setState({ queueMessage: msg });
        });
    }

    setUpReceiveAdditionalInfo = () => {
        this._connection.on(routes.receiveAdditionalInfoRoute, (id: any, msg: string) => {
            this.setState({ additionalInfo: msg });
        });
    }

    setUpReceiveDoctorFullName = () => {
        this._connection.on(routes.receiveDoctorFullName, (id: any, msg: string) => {
            this.setState({doctorName: msg});
        });
    }

    setUpCloseConnectionEvent = (callback?: () => void) => {
        this._connection.onclose(() => {
            if(!this._manualDisconnected)
                this.connect(callback);
        });
    }




    render() {
        return (
            <HubContext.Provider value={{
                doctorName: this.state.doctorName,
                queueMessage: this.state.queueMessage,
                additionalInfo: this.state.additionalInfo,
                registerDoctor: this.handleRegisterDoctor.bind(this),
                registerPatient: this.handleRegisterPatient.bind(this),
                disconnect: this.disconnect,
                connectionStop: this.connectionStop,
                nextNo: this.handleNextNo,
                prevNo: this.handlePrevNo,
                newNo: this.handleNewNo,
                newAdditionalInfo: this.handleNewAdditionalInfo,
                newRoomNo: this.handleChangeRoomNo
            }}>
                {this.props.children}
            </HubContext.Provider>
        );
    }
}

export default withSnackbar(HubContextProvider);