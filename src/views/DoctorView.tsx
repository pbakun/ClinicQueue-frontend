import React, {useState, useEffect, useRef} from 'react';
import { makeStyles, Theme, createStyles, Typography, Divider, Grid } from "@material-ui/core";
import QueueNo from '../components/Doctor/QueueNo';
import NewNo from '../components/Doctor/NewNo';
import NewRoomNo from '../components/Doctor/NewRoomNo';
import SpecialButtons from '../components/Doctor/SpecialButtons';
import Message from '../components/Doctor/Message';
import { get, put } from '../config/request';
import { QueueHub } from '../hub/connection';

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
    id: "1",
    queueNoMessage: "PB12",
    additionalMessage: "Wiadomość",
    roomNo: "test",
    availableRoomNo: ["12", "test", "16"]
}

const fetchData = (data: any): IQueueData => ({
        id: data.userId,
        queueNoMessage: data.queueNoMessage,
        additionalMessage: data.additionalInfo,
        roomNo: data.roomNo,
        availableRoomNo: data.availableRoomNo
})

function DoctorView() {
    const classes = useStyles();
    const [state, setState] = useState<IQueueData>(initialState);
    let hub: QueueHub|null = null;

    const onNewQueueNo = (msg: string) => {
        console.log('queuemsg :', msg);
    }

    useEffect(() => {
        get(
            "/doctor",
            (response: any) => {setState(fetchData(response.data))},
            (error: any) => console.error(error)
            );
            hub = new QueueHub(onNewQueueNo);
            return () => {
                hub?.hubStop();
            }
    }, []);

    const handleNewRoomNo = (value: string) => {
        put(
            "/doctor/newroomno",
            { NewRoomNo: value },
            (response: any) => console.log(response),
            (error: any) => console.error(error)
        );
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
                        onIncrement={() => console.log('onIncrement')}
                        onDecrement={() => console.log('onDecrement')}
                    />
                    <SpecialButtons
                        onBreak={() => console.log("break")}
                        onSpecial={() => console.log("special")}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={7}>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <NewNo
                                onSubmit={(value) => console.log(value)}
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
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default DoctorView;
