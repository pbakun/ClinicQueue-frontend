import React, { useState, useEffect } from 'react';
import { useSnackbar } from "notistack";
import { withStyles, createStyles, Typography, TextField, Button, Paper, Theme } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import SendIcon from '@material-ui/icons/Send';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavMessageDialog from './FavMessageDialog';
import { get, post, remove } from '../../../config/request';
import { AxiosError } from 'axios';
import { saveToFavoriteMessage, deletedFromFavoritesMessage, defaultErrorMessage, messageSentToClients } from '../../../utils/staticData';

interface IMessageProps {
    classes: any,
    additionalMessage?: string,
    sendMessage: (value: string) => void
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
    const { classes, additionalMessage = "", sendMessage } = props;
    const { enqueueSnackbar } = useSnackbar();
    const [msg, setMsg] = useState<string>(additionalMessage);
    const [sent, setSent] = useState<boolean>(false);
    const [favMessageDialog, setFavMessageDialog] = useState<boolean>(false);
    const [favMessages, setFavMessages] = useState<string[]>([]);

    useEffect(() => {
        setMsg(additionalMessage ? additionalMessage : "");
        setSent(true);
    }, [additionalMessage]);

    useEffect(() => {
        setSent(additionalMessage === msg ? true : false);
    }, [msg]);

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMsg(e.target.value);
        setSent(false);
    }

    const handleFavDialogOpen = () => {
        setFavMessageDialog(true);
        get(
            "/doctor/pickfavmessage",
            (response: any) => setFavMessages(response.data),
            (error: AxiosError) => enqueueSnackbar(defaultErrorMessage, { variant: "error" })
        )
    }

    const handleSaveFavMessage = () => {
        post(
            "/doctor/AddFavoriteMessage",
            { message: msg },
            () => enqueueSnackbar(saveToFavoriteMessage, { variant: "info" }),
            (error: AxiosError) => enqueueSnackbar(defaultErrorMessage, { variant: "error" })
        );
    }

    const handlePickFavMessage = (id: string) => {
        post(
            "/doctor/pickfavmessage",
            { id: id },
            () => {
                enqueueSnackbar(messageSentToClients, { variant: "info" });
                setFavMessageDialog(false);
            },
            (error: AxiosError) => enqueueSnackbar(defaultErrorMessage, { variant: "error" })
        );
    }

    const handleDeleteMessage = (id: string) => {
        remove(
            "/doctor/DeleteFavMessage",
            { id: id },
            (response: any) => {
                enqueueSnackbar(deletedFromFavoritesMessage, { variant: "info" });
                setFavMessages(response.data);
            },
            (error: any) => {
                enqueueSnackbar(defaultErrorMessage, { variant: "error" })
            }
        );
    }

    return (
        <Paper square className={classes.paper}>
            <Typography
                variant="h6"
                className={classes.title}
            >
                Wiadomość:
            </Typography>
            <div className={classes.container}>
                <FavMessageDialog
                    open={favMessageDialog}
                    messages={favMessages}
                    onClose={() => setFavMessageDialog(false)}
                    onPick={handlePickFavMessage}
                    onDelete={handleDeleteMessage}
                />
                <TextField
                    variant="outlined"
                    multiline
                    rows={3}
                    fullWidth
                    className={classes.inputField}
                    value={msg}
                    onChange={handleTextChange}
                />
                <div className={classes.buttons}>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<SaveIcon />}
                        onClick={handleSaveFavMessage}
                    >
                        Zapisz
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<FavoriteIcon />}
                        onClick={handleFavDialogOpen}
                    >
                        Wybierz
                    </Button>
                    <Button
                        variant="contained"
                        color={sent ? "default" : "primary"}
                        className={classes.button}
                        startIcon={<SendIcon />}
                        onClick={() => sendMessage(msg)}
                    >
                        Wyślij
                    </Button>
                    <Button
                        variant="contained"
                        color="default"
                        style={{background: "#F88080"}}
                        className={classes.button}
                        startIcon={<ClearAllIcon />}
                        onClick={() => sendMessage("")}
                    >
                        Wyczyść
                    </Button>
                </div>
            </div>
        </Paper>
    );
};

export default withStyles(useStyles)(Message);
