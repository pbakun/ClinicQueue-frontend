import { baseUrl } from './../../utils/staticData';

export const hubUrl = `${baseUrl}/queuehub`;
// export const hubUrl = "http://apitest.bakson.hostingasp.pl/queuehub";

export const receiveQueueNoRoute = "ReceiveQueueNo";
export const receiveAdditionalInfoRoute = "ReceiveAdditionalInfo";
export const receiveQueueOccupiedRoute = "NotifyQueueOccupied";

export const sendRegisterDoctorRoute = "RegisterDoctor";
export const sendRegisterPatientRoute = "RegisterPatientView";
export const sendUserDisconnect = "UserDisconnect";
export const sendNextNoRoute = "QueueNoUp";
export const sendPrevNoRoute = "QueueNoDown";
export const sendNewNoRoute = "NewQueueNo";
export const sendAdditionalInfoRoute = "NewAdditionalInfo";