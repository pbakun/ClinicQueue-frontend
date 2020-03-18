import React from 'react';
import { makeStyles, Theme, createStyles, Typography, Divider, Grid } from "@material-ui/core";
import QueueNo from '../components/Doctor/QueueNo';
import NewNo from '../components/Doctor/NewNo';
import NewRoomNo from '../components/Doctor/NewRoomNo';
import SpecialButtons from '../components/Doctor/SpecialButtons';
import Message from '../components/Doctor/Message';

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

function DoctorView() {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Typography variant="h2" color="primary" className={classes.header}>
                Kolejka
                </Typography>
            <Divider style={{ height: 2 }} />
            <Grid container direction="row">
                <Grid item xs={12} sm={6} md={5}>
                    <QueueNo />
                    <SpecialButtons />
                </Grid>
                <Grid item xs={12} sm={6} md={7}>
                    <Grid container>
                        <Grid item xs={12} md={6}>
                            <NewNo onSubmit={(value) => console.log(value)} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <NewRoomNo onSubmit={(value) => console.log(value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <Message />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default DoctorView;
