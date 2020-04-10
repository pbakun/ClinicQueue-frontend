import React, {useEffect} from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../store/reducers';
import { RootActions } from "../../store/actions";
import { AppBar, Toolbar, IconButton, Button, createStyles, makeStyles, Theme } from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import queueIcon from "../../images/queue.png";
import { logout } from "../../store/auth/authActions";
import UserDetailsDialog from "../User/UserDetailsDialog";
import RoomSelection from "./RoomSelection";
import { getRooms } from "../../store/rooms/roomsAction";

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
    rooms?: string[],
    logout?: () => void;
    getRooms?: () => void;
}

type TopBarProps = OwnProps & MuiProps & StoreProps;

const TopBar: React.FC<TopBarProps> = (props) => {
    const { rooms } = props;
    const classes = useStyles();

    useEffect(() => {
        if(props.getRooms)
            props.getRooms();
    }, [])

    const handleLogout = () => {
        if (props.logout)
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
                    <RoomSelection
                        buttonClassName={classes.button}
                        rooms={rooms}
                    />
                </div>
                <div className={classes.userButtons}>
                    <UserDetailsDialog />
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
    rooms: state.rooms.availableRooms
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, RootActions>) => ({
    logout: () => dispatch(logout()),
    getRooms: () => dispatch(getRooms())
})

export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(TopBar) as React.ComponentType<TopBarProps>;