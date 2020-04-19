import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { ThunkDispatch } from 'redux-thunk';
import { Link } from "react-router-dom"
import { RootState } from '../../../store/reducers';
import { RootActions } from "../../../store/actions";
import { AppBar, Toolbar, IconButton, Button, createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import queueIcon from "../../../images/queue.png";
import { logout } from "../../../store/auth/authActions";
import UserDetailsDialog from "../../User/UserDetailsDialog";

const useStyles = makeStyles((theme: Theme) => createStyles({
    appbar: {
        background: theme.palette.background.paper
    },
    homeButton: {
        maxWidth: 30,
        maxHeight: 30
    },
    menuButtons: {
        marginLeft: theme.spacing(5)
    },
    title: {
        paddingLeft: theme.spacing(1)
    }
}));

interface MuiProps {
    classes?: any;
}

interface RouterProps {
    history: any
}

interface OwnProps {

}

interface StoreProps {
    logout?: () => void;
}

type TopBarProps = OwnProps & MuiProps & StoreProps;

const TopBar: React.FC<TopBarProps> = (props) => {

    const classes = useStyles();
    const handleLogout = () => {
        if (props.logout)
            props.logout();
    }

    return (
        <AppBar position="static" color="default" className={classes.appbar}>
            <Toolbar>
                <Link to="/">
                <IconButton
                    edge="start"
                    color="inherit"
                >
                    <img src={queueIcon} alt="queue-icon" className={classes.homeButton} />
                </IconButton>
                </Link>
                <Typography
                    variant="subtitle1"
                    className={classes.title}
                >
                    NZMR Modzelewska-Bakun
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

const mapStateToProps = (state: RootState) => ({
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