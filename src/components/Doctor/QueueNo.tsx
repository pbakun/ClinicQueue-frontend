import * as React from 'react';
import { withStyles, createStyles, Typography, Fab, Paper, Theme } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

interface MuiProps {
    classes: any
}

interface OwnProps {
    queueMessage: string,
    onIncrement: () => void,
    onDecrement: () => void
}

type IQueueNoProps = MuiProps & OwnProps;

const useStyles = ((theme: Theme) => createStyles({
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(3)
    },
    title: {
        marginLeft: theme.spacing(2),
        margin: theme.spacing(1),
    },
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: 180,
        margin: "auto",
        padding: theme.spacing(2)
    },
    queueMessage: {
        textAlign: "center",
    }
}));

const QueueNo: React.FunctionComponent<IQueueNoProps> = (props) => {
    const { classes, queueMessage } = props;

    return (
        <Paper square className={classes.paper}>
            <Typography variant="h6" className={classes.title}>
                Aktualny pacjent:
          </Typography>
            <Typography variant="h1" className={classes.queueMessage}>
                {queueMessage}
            </Typography>
            <div className={classes.container}>
                <Fab
                    color="primary"
                    onClick={props.onIncrement}
                >
                    <AddIcon />
                </Fab>
                <Fab
                    color="primary"
                    onClick={props.onDecrement}
                >
                    <RemoveIcon />
                </Fab>
            </div>
        </Paper>
    );
};

export default withStyles(useStyles)(QueueNo);
