import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import * as signalR from "@microsoft/signalr";
import  axios from "axios";
import { Theme, createStyles, makeStyles } from "@material-ui/core";
import { Header } from './Header';
import { QueueMessage } from './QueueMessage';

interface Props {
    roomNo: String
}

const StyledApp = styled.div`
  overflow: hidden;
  height: 100vh;
  `;

const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        display: "flex",
        justifyContent: "center",
    },
    nfzLogo: {
        position: "absolute",
        left: 10,
        top: 10,
        maxWidth: 400
    },
    cancerTeraphy: {
        position: "absolute",
        right: 10,
        top: 10
    }
}));

export const Index: React.FC<Props> = (props) => {
    // const classes = useStyles();
    const { roomNo } = props;
    const [queueNo, setQueueNo] = useState<string>("");
    const [doctorName, setDoctorName] = useState<string>("");

    const hubConnection = new signalR.HubConnectionBuilder()
                            // .withUrl("http://test.bakson.hostingasp.pl/queuehub")
                            .withUrl("http://localhost:5000/queuehub")
                            // .withUrl("http://192.168.0.242/queuehub")
                            .build();
    
    hubConnection.on("ReceiveQueueNo", (id, msg) => {
        console.log(msg);
        setQueueNo(msg);
    });

    hubConnection.on("ReceiveDoctorFullName", (userId, msg) => {
        setDoctorName(msg);
    });

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/patient/${roomNo}`)
            // .get(`http://test.bakson.hostingasp.pl/api/patient/${roomNo}`)
            // .get(`http://192.168.0.242/api/patient/${roomNo}`)
            .then(response => {
                setQueueNo(response.data.queueNoMessage);
                setDoctorName(response.data.doctorFullName)
            })
            .catch(err => console.error(err));

        hubConnection.start()
        .then(() => hubConnection.invoke("RegisterPatientView", props.roomNo))
        .catch(err => console.log(err));
        return () => {
            hubConnection.stop();
        };
    }, []);

    return (
        <StyledApp>
                <Header title={doctorName}/>
                <QueueMessage message={queueNo} />
        </StyledApp>
    );
}