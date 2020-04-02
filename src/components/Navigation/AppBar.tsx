import React from "react";
import {compose, bindActionCreators, Dispatch} from "redux";
import { connect } from "react-redux";
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../store/reducers';
import {RootActions} from "../../store/actions"
import { AppBar, Toolbar, IconButton, Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import queueIcon from "../../images/queue.png";
import { logout } from "../../store/auth/authActions";

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

interface MuiProps {
    classes?: any;
}

interface OwnProps {

}

interface StoreProps {
    username?: string|undefined;
    logout?: () => void;
}

type TopBarProps = OwnProps & MuiProps & StoreProps;

const TopBar: React.FC<TopBarProps> = props => {
    
    const classes = useStyles();
    const { username = "Użytkownik"} = props;
    const handleLogout = () => {
        if(props.logout)
            props.logout();
    }

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
                        {username}
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        className={classes.button}
                        onClick={handleLogout}
                    >
                        Wyloguj
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    );
}

const mapStateToProps = (state: RootState) => ({
    username: state.auth.username
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, RootActions>) => ({
    logout: () => dispatch(logout())
})

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
    )(TopBar) as React.ComponentType<TopBarProps>;