export interface IQueueData {
    queueNoMessage: string,
    additionalMessage: string,
    roomNo: string,
    availableRoomNo: string[],
    doctorName?: string;
}

export const initialState: IQueueData = {
    queueNoMessage: "",
    additionalMessage: "",
    roomNo: "",
    availableRoomNo: [],
    doctorName: ""
}

export interface IQueueDataPatient {
    queueNoMessage: string,
    additionalMessage: string,
    roomNo: string,
    doctorName: string;
}

export const initialPatientState: IQueueDataPatient = {
    queueNoMessage: "",
    additionalMessage: "",
    roomNo: "",
    doctorName: ""
}