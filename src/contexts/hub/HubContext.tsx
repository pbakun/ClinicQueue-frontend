import React, { createContext, Component } from 'react';
import * as signalR from "@microsoft/signalr";
import { withSnackbar } from 'notistack';
import * as routes from "./routes";
import { IQueueContext } from './IQueueContext';

const initialContext: IQueueContext = {
    queueMessage: "",
    additionalInfo: "",
    register: () => { },
    disconnect: () => { },
    nextNo: () => { },
    prevNo: () => { },
    newNo: () => { },
    newAdditionalInfo: () => { },
    newRoomNo: () => { }
}

export const HubContext = createContext<IQueueContext>(initialContext);

class HubContextProvider extends Component<any> {
    private _connection: signalR.HubConnection;

    state = {
        queueMessage: "",
        additionalInfo: "",
        errorCount: 0
    }

    constructor(props: any) {
        super(props);
        this._connection = new signalR.HubConnectionBuilder().withUrl(routes.hubUrl).build();
        this.setUpReceiveQueueNo();
        this.setUpReceiveAdditionalInfo();
    }

    async connectionStart(): Promise<void> {
        await this._connection.start();
    }

    notifyError = () => {
        this.props.enqueueSnackbar("Błąd połączenia z serwerem kolejki. Próbuje ponownie.", { variant: "error"});
    }

    notifyWarning = () => {
        this.props.enqueueSnackbar("Coś poszło nie tak...", { variant: "warning"});
    }

    connect = (callback: () => void) => {
        this._connection.start()
            .then(() => {
                this.setUpCloseConnectionEvent(callback);
                callback();
                this.setState({errorCount: 0});
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
        // this.setUpCloseConnectionEvent();
        this._connection.invoke(routes.sendUserDisconnect);
        // this._connection.stop();
    }

    registerDoctor = (id: string, roomNo: string) => {
        this._connection.invoke(routes.sendRegisterDoctorRoute, id, roomNo)
            .then(() => console.info("Doctor registered"))
            .catch(this.notifyWarning);
    }

    handleRegisterDoctor(id: string, roomNo: string) {
        this.connect(() => this.registerDoctor(id, roomNo));
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

    setUpCloseConnectionEvent = (callback: () => void) => {
        this._connection.onclose(() => {
            console.warn("HubConnection closed");
            this.connect(callback);
        });
    }


    render() {
        return (
            <HubContext.Provider value={{
                queueMessage: this.state.queueMessage,
                additionalInfo: this.state.additionalInfo,
                register: this.handleRegisterDoctor.bind(this),
                disconnect: this.disconnect,
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