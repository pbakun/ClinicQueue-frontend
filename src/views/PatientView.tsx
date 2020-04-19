import React, {useState, useEffect, useContext} from 'react';
import { MobileView, BrowserView } from "react-device-detect";
import { withRouter } from "react-router-dom";
import { useSnackbar } from "notistack";
import DesktopPatient from "../components/Patient/Web/Index";
import MobilePatient from "../components/Patient/Mobile/Index";
import { IQueueDataPatient, initialPatientState } from "../interface/IQueueData";
import { IQueueContext } from '../contexts/hub/IQueueContext';
import { HubContext } from '../contexts/hub/HubContext';
import { get } from '../config/request';
import { serverErrorMessage } from '../utils/staticData';

interface IPatientViewProps {
    match: any
}

const fetchData = (data: any): IQueueDataPatient => ({
    doctorName: data.doctorFullName,
    queueNoMessage: data.queueNoMessage,
    additionalMessage: data.queueAdditionalInfo,
    roomNo: data.roomNo
});

const PatientView: React.FC<IPatientViewProps> = (props) => {
    const { enqueueSnackbar } = useSnackbar();
    const [state, setState] = useState<IQueueDataPatient>(initialPatientState);
    const hubContext = useContext<IQueueContext>(HubContext);
    const urlParam = props.match.params.roomNo;

    useEffect(() => {
        get(
            `patient/${urlParam}`,
            response => {
                setState(fetchData(response.data))
            },
            () => enqueueSnackbar(serverErrorMessage, { variant: "error"})
        );
        hubContext.registerPatient(urlParam);
        return function cleanup() {
            hubContext.connectionStop();
        }
    }, []);

    useEffect(() => {
        setState({
            ...state,
            queueNoMessage: hubContext.queueMessage,
        });
    }, [hubContext.queueMessage]);


    return (
        <React.Fragment>
            <BrowserView>
                <DesktopPatient
                    doctorName={state.doctorName ? state.doctorName : ""}
                    queueNoMessage={state.queueNoMessage}
                />
            </BrowserView>
            <MobileView>
                <MobilePatient
                    doctorName={state.doctorName ? state.doctorName : ""}
                    queueNoMessage={state.queueNoMessage}
                    roomNo={state.roomNo}
                />
            </MobileView>
        </React.Fragment>
    )
}

export default withRouter(PatientView);
