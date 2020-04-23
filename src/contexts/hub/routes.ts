import { baseUrl } from './../../utils/staticData';

export const hubUrl = `${baseUrl}/queueHub`;

export const receiveQueueNoRoute = "ReceiveQueueNo";
export const receiveAdditionalInfoRoute = "ReceiveAdditionalInfo";
export const receiveQueueOccupiedRoute = "NotifyQueueOccupied";
export const receiveDoctorFullName = "ReceiveDoctorFullName";

export const sendRegisterDoctorRoute = "RegisterDoctor";
export const sendRegisterPatientRoute = "RegisterPatientView";
export const sendUserDisconnect = "UserDisconnect";
export const sendNextNoRoute = "QueueNoUp";
export const sendPrevNoRoute = "QueueNoDown";
export const sendNewNoRoute = "NewQueueNo";
export const sendAdditionalInfoRoute = "NewAdditionalInfo";