import React, {useState, useEffect, useContext, useReducer} from 'react';
import { makeStyles, Theme, createStyles, Typography, Divider, Grid } from "@material-ui/core";
import { useSnackbar } from "notistack";
import QueueNo from '../components/Doctor/QueueNo';
import NewNo from '../components/Doctor/NewNo';
import NewRoomNo from '../components/Doctor/NewRoomNo';
import SpecialButtons from '../components/Doctor/SpecialButtons';
import Message from '../components/Doctor/Message/Message';
import { get, put } from '../config/request';
import { IQueueContext } from '../contexts/hub/IQueueContext';
import { HubContext } from '../contexts/hub/HubContext';
import { AxiosError } from 'axios';
import { serverErrorMessage, roomNoChangedMessage } from '../utils/staticData';

const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        maxWidth: 1100,
        margin: "auto"
    },
    header: {
        margin: theme.spacing(1),
        marginLeft: theme.spacing(3)
    },
}));

interface IQueueData {
    id: string,
    queueNoMessage: string,
    additionalMessage: string,
    roomNo: string,
    availableRoomNo: string[]
}

const initialState: IQueueData = {
    id: "",
    queueNoMessage: "",
    additionalMessage: "",
    roomNo: "",
    availableRoomNo: []
}

const fetchData = (data: any): IQueueData => ({
        id: data.userId,
        queueNoMessage: data.queueNoMessage,
        additionalMessage: data.additionalInfo,
        roomNo: data.roomNo,
        availableRoomNo: data.availableRoomNo
});

function DoctorView() {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [state, setState] = useState<IQueueData>(initialState);
    const hubContext = useContext<IQueueContext>(HubContext);

    useEffect(() => {
        get(
            "/doctor",
            (response: any) => {
                setState(fetchData(response.data));
                hubContext.register(response.data.userId, response.data.roomNo);
            },
            () => enqueueSnackbar(serverErrorMessage, { variant: "error"})
            );
        return function cleanup() {
            hubContext.disconnect();
        }
    }, []);

    useEffect(() => {
        setState({
            ...state,
            queueNoMessage: hubContext.queueMessage,
        });
    }, [hubContext.queueMessage]);

    useEffect(() => {
        setState({
            ...state,
            additionalMessage: hubContext.additionalInfo,
        });
    }, [hubContext.additionalInfo]);

    const handleNextNo = () => {
        hubContext.nextNo(state.id, state.roomNo);
    }

    const handlePrevNo = () => {
        hubContext.prevNo(state.id, state.roomNo);
    }

    const handleNewNo = (value: string) => {
        hubContext.newNo(state.id, +value, state.roomNo);
    }

    const handleBreakClick = () => {
        hubContext.newNo(state.id, -1, state.roomNo);
    }

    const handleSpecialClick = () => {
        hubContext.newNo(state.id, -2, state.roomNo);
    }

    const handleNewRoomNo = (value: string) => {
        put(
            "/doctor/newroomno",
            { NewRoomNo: value },
            (response: any) => {
                hubContext.newRoomNo(state.id, value);
                enqueueSnackbar(roomNoChangedMessage, { variant: "info"});
                setState({
                    ...state,
                    roomNo: value,
                });
            },
            () => enqueueSnackbar(serverErrorMessage, { variant: "error"})
        );
    }

    const handleSendAdditionalMessage = (value: string) => {
        hubContext.newAdditionalInfo(state.id, state.roomNo, value);
    }

    return (
        <div className={classes.container}>
            <Typography variant="h2" color="primary" className={classes.header}>
                Kolejka
                </Typography>
            <Divider style={{ height: 2 }} />
            <Grid container direction="row">
                <Grid item xs={12} sm={6} md={5}>
                    <QueueNo
                        queueMessage={state.queueNoMessage}
                        onIncrement={handleNextNo}
                        onDecrement={handlePrevNo}
                    />
                    <SpecialButtons
                        onBreak={handleBreakClick}
                        onSpecial={handleSpecialClick}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={7}>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <NewNo
                                onSubmit={handleNewNo}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <NewRoomNo
                                roomNo={state.roomNo}
                                options={state.availableRoomNo}
                                onSubmit={handleNewRoomNo}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Message
                                additionalMessage={state.additionalMessage}
                                sendMessage={handleSendAdditionalMessage}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default DoctorView;
