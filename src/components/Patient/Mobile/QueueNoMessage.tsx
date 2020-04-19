import React from 'react';
import { Theme, createStyles, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
    },
}));

interface Props {
    message: string;
}

const isMessageLong = (message: string) => message.length > 6 ? true : false

export default function(props: Props) {
    const classes = useStyles();
    const { message } = props;

    return (
        <div className={classes.container}>
            <Typography variant={isMessageLong(message) ? "subtitle1" : "h1"}>
                {isMessageLong(message) ? "Gabinet nieczynny" : message}
            </Typography>
        </div>
    );
}