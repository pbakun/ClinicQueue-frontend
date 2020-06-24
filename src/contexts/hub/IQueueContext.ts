

export interface IQueueContext {
    doctorName: string,
    queueMessage: string,
    additionalInfo: string,
    notification: string,
    registerDoctor: (roomNo: string) => void;
    registerPatient: (roomNo: string) => void;
    disconnect: () => void;
    connectionStop: () => void;
    nextNo: (roomNo: string) => void;
    prevNo: (roomNo: string) => void;
    newNo: (queueNo: number, roomNo: string) => void;
    newAdditionalInfo: (roomNo: string, message: string) => void;
    newRoomNo: (newRoomNo: string) => void;
}