import React from "react";
import { AppBar, Toolbar, IconButton, Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import queueIcon from "../../images/queue.png";

const useStyles = makeStyles((theme: Theme) => createStyles({
    appbar: {
        background: theme.palette.background.paper
    },
    homeButton: {
        maxWidth: 50,
        maxHeight: 50
    },
    menuButtons: {
        marginLeft: theme.spacing(5)
    },
    userButtons: {
        position: "absolute",
        right: theme.spacing(15)
    },
    button: {
        margin: theme.spacing(2)
    }
}));

export default function TopBar() {
    const classes = useStyles();

    return (
        <AppBar position="static" color="default" className={classes.appbar}>
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <img src={queueIcon} alt="queue-icon" className={classes.homeButton} />
                </IconButton>
                <div className={classes.menuButtons}>
                <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                >
                    Lekarz
                </Button>
                </div>
                <div className={classes.userButtons}>
                <Button
                        variant="outlined"
                        color="primary"
                        className={classes.button}
                        startIcon={<AccountCircleIcon />}
                    >
                        User
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        className={classes.button}
                    >
                        Wyloguj
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
}