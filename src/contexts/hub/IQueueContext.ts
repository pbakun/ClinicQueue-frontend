
import { HubConnection } from "@microsoft/signalr";

export interface IQueueContext {
    queueMessage: string,
    additionalInfo: string,
    register: (id: string, roomNo: string) => void;
    disconnect: () => void;
    nextNo: (id: string, roomNo: string) => void;
    prevNo: (id: string, roomNo: string) => void;
    newNo: (id: string, queueNo: number, roomNo: string) => void;
}