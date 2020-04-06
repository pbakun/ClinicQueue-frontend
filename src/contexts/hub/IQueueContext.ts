

export interface IQueueContext {
    queueMessage: string,
    additionalInfo: string,
    register: (id: string, roomNo: string) => void;
    disconnect: () => void;
    nextNo: (id: string, roomNo: string) => void;
    prevNo: (id: string, roomNo: string) => void;
    newNo: (id: string, queueNo: number, roomNo: string) => void;
    newAdditionalInfo: (id: string, roomNo: string, message: string) => void;
    newRoomNo: (id: string, newRoomNo: string) => void;
}