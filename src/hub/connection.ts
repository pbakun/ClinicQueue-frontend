
import * as signalR from "@microsoft/signalr";
import * as routes from "./routes";

const url = "http://localhost:5000/queuehub";

export class QueueHub {
    /**
     initializing signalr hub
     */
    hubConnection: signalR.HubConnection;
    // receiveQueueNo: (onNewQueueNo: (msg: string) => void) => void;
    constructor(onNewQueueNo: (msg: string) => void) {

        this.hubConnection =  new signalR.HubConnectionBuilder()
                                .withUrl(url)
                                .build();
        
        this.setUpReceiveQueueNo.bind(this, onNewQueueNo);
    }

    setUpReceiveQueueNo = (onNewQueueNo: (msg: string) => void) => {
        this.hubConnection.on(routes.receiveQueueNoRoute, (id: any, msg: string) => {
            console.log('msg', msg)
            onNewQueueNo(msg);
        });
    }

    hubStartForDoctor = (id: string, roomNo: string) => {
        this.hubConnection.start()
            .then(() => this.registerDoctor(id, roomNo))
            .catch(() => console.error("Error"))
    }

    hubStart = () => {
        console.log('hub starting')
        return this.hubConnection.start();
    }

    hubStop = () => {
        this.hubConnection.stop();
        return this.hubConnection;
    }

    registerDoctor = (id: string, roomNo: string) => {
        console.log('doctor registering')
        console.log('id', id)
        console.log('roomNo', roomNo)
        this.hubConnection.invoke(routes.sendRegisterDoctorRoute, id, roomNo)
            .catch((error: any) => console.log('error', error));
    }

    nextNo = (id: string, roomNo: string) => {
        this.hubConnection.invoke(routes.sendNextNoRoute, id, roomNo)
            .catch((error: any) => console.log('error', error));
    }
}