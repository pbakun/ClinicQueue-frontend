import React from 'react';
import { Theme, createStyles, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "50%"
    },
    queueMessage: {
        fontSize: "20vw",
    }
}));

interface Props {
    message: string;
}

export const QueueMessage: React.FC<Props> = props => {
    const classes = useStyles();
    const { message } = props;

    return (
        <div className={classes.container}>
            <Typography variant="body1" className={classes.queueMessage}>
                {message}
            </Typography>
        </div>
    );
}  