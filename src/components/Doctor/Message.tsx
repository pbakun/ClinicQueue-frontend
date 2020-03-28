import React, {useState, useEffect} from 'react';
import { withStyles, createStyles, Typography, TextField, Button, Paper, Theme, MenuItem } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import SendIcon from '@material-ui/icons/Send';
import FavoriteIcon from '@material-ui/icons/Favorite';

interface IMessageProps {
    classes: any,
    additionalMessage?: string
}

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
        flexDirection: "column",
        alignItems: "center",
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
    },
    buttons: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%"
    },
    inputField: {
        
    },
    button: {
        color: "#FFF",
        marginTop: theme.spacing(1)
    }
}));

const Message: React.FunctionComponent<IMessageProps> = (props) => {
    const { classes, additionalMessage = "" } = props;
    const [msg, setMsg] = useState<string>(additionalMessage)

    useEffect(() => {
        setMsg(additionalMessage);
    }, [additionalMessage])

  return (
    <Paper square className={classes.paper}>
    <Typography
        variant="h6"
        className={classes.title}
    >
        Wiadomość:
    </Typography>
    <div className={classes.container}>
        <TextField
            variant="outlined"
            multiline
            rows={3}
            fullWidth
            className={classes.inputField}
            value={msg}
        />
        <div className={classes.buttons}>
            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<SaveIcon />}
            >
                Zapisz
            </Button>
            <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<FavoriteIcon />}
            >
                Wybierz
            </Button>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<SendIcon />}
            >
                Wyślij
            </Button>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<ClearAllIcon />}
            >
                Wyczyść
            </Button>
        </div>
    </div>
    </Paper>
  );
};

export default withStyles(useStyles)(Message);
