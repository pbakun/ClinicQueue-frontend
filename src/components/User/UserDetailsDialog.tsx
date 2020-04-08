import React, { useState } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../store/reducers';
import { RootActions } from "../../store/actions";
import { Dialog, DialogContent, DialogTitle, DialogActions, withStyles, createStyles, Theme, Button, Typography, Tabs, Tab, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import TabPanel from "../Common/TabPanel";
import UserDetails from './UserDetails';
import PasswordChange from "./PasswordChange";
import { User } from './interface';
import { get, put } from '../../config/request';
import { useSnackbar } from 'notistack';
import { userDetailsUpdateSuccess, defaultErrorMessage } from '../../utils/staticData';

const useStyles = (theme: Theme) => createStyles({
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1)
    },
    button: {
        margin: theme.spacing(2)
    },
    container: {
        margin: "auto"
    },
});

interface IMuiProps {
    classes?: any
}


interface OwnProps {
}

interface StoreProps {
    username?: string
}

type IUserDetailsProps = IMuiProps & OwnProps & StoreProps;

const initialUser: User = {
    username: "",
    email: "",
    firstName: "",
    lastName: ""
}

const UserDetailsDialog: React.FC<IUserDetailsProps> = props => {
    const { classes, username } = props;
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState<boolean>(false);
    const [tab, setTab] = useState<number>(0);
    const [user, setUser] = useState<User>(initialUser);

    const handleDialogOpen = () => {
        get(
            "user/userdetails",
            (response: any) => {
                setUser(response.data);
            },
            error => enqueueSnackbar(defaultErrorMessage, { variant: "error"})
        );
    }

    const handleUserDetailsSubmit = (newUser: User) => {
        put(
            "user/userdetails",
            newUser,
            response => {
                enqueueSnackbar(userDetailsUpdateSuccess, { variant: "info" });
                setOpen(false);
            },
            error => enqueueSnackbar(defaultErrorMessage, { variant: "error"})
        );
    }

    const handleTabChange = (e: React.ChangeEvent<{}>, newValue: number) => {
        setTab(newValue);
    }

    return (
        <React.Fragment>
            <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                startIcon={<AccountCircleIcon />}
                onClick={() => setOpen(true)}
            >
                {username}
            </Button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                onEnter={handleDialogOpen}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle disableTypography>
                    <Typography variant="h6">
                        Konto użytkownika
                    </Typography>
                    <IconButton
                        className={classes.closeButton}
                        onClick={() => setOpen(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent className={classes.container}>
                    <Tabs
                        value={tab}
                        onChange={handleTabChange}
                        indicatorColor="primary"
                    >
                        <Tab label="Profil" value={0} />
                        <Tab label="Hasło" value={1} />
                    </Tabs>
                    <TabPanel value={tab} index={0}>
                        <UserDetails
                            user={user}
                            onSubmit={handleUserDetailsSubmit}
                        />
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        <PasswordChange />
                    </TabPanel>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
}

const mapStateToProps = (state: RootState) => ({
    username: state.auth.username
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, RootActions>) => ({

});


export default compose(
    withStyles(useStyles),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(UserDetailsDialog) as React.ComponentType<IUserDetailsProps>;
