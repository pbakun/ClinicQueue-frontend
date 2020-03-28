import React, { createContext, Component } from 'react';
import * as signalR from "@microsoft/signalr";
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
}

export const HubContext = createContext<IQueueContext>(initialContext);

class HubContextProvider extends Component<any> {

    state = {
        hub: new signalR.HubConnectionBuilder().withUrl(routes.hubUrl).build(),
        queueMessage: "",
        additionalInfo: "",
    }

    constructor(props: any) {
        super(props);

        this.setUpReceiveQueueNo();
    }

    async connectionStart(): Promise<void> {
        await this.state.hub.start();
    }

    connect = (callback: () => void) => {
        this.state.hub.start()
            .then(() => {
                this.setUpCloseConnectionEvent(callback);
                callback();
            })
            .catch((error: any) => {
                console.error("hub connect error", error);
                setTimeout(() => this.connect(callback), 5000);
            });
    }

    disconnect = () => {
        this.state.hub.stop();
    }

    registerDoctor = (id: string, roomNo: string) => {
        this.state.hub.invoke(routes.sendRegisterDoctorRoute, id, roomNo)
            .then(() => console.info("Doctor registered"))
            .catch((error: any) => console.log('error', error));
    }

    handleRegisterDoctor(id: string, roomNo: string) {
        this.connect(() => this.registerDoctor(id, roomNo));
    }

    handleNextNo = (id: string, roomNo: string) => {
        this.state.hub.invoke(routes.sendNextNoRoute, id, roomNo)
            .catch((error: any) => console.error('error nextNo', error));
    }

    handlePrevNo = (id: string, roomNo: string) => {
        this.state.hub.invoke(routes.sendPrevNoRoute, id, roomNo)
            .catch((error: any) => console.error('error nextNo', error));
    }

    handleNewNo = (id: string, queueNo: number, roomNo: string) => {
        this.state.hub.invoke(routes.sendNewNoRoute, id, queueNo, roomNo)
            .catch((error: any) => console.error('error nextNo', error));
    }

    setUpReceiveQueueNo = () => {
        this.state.hub.on(routes.receiveQueueNoRoute, (id: any, msg: string) => {
            this.setState({ queueMessage: msg });
        });
    }

    setUpCloseConnectionEvent = (callback: () => void) => {
        this.state.hub.onclose(() => {
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
            }}>
                {this.props.children}
            </HubContext.Provider>
        );
    }
}

export default HubContextProvider;