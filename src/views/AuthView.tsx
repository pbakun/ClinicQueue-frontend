import React, { useState } from 'react';
import styled from "styled-components";
import { compose } from "redux";
import { connect } from "react-redux";
import { RootActions } from "../store/actions";
import { Paper, Typography, Button, withStyles, Theme, createStyles, TextField, Checkbox, FormControlLabel } from "@material-ui/core";
import backgroundImg from "../images/background.jpg";
import ForgotPassword from '../components/Auth/ForgotPassword';
import { RootState } from '../store/reducers';
import { ThunkDispatch } from 'redux-thunk';
import { auth } from '../store/auth/authActions';

interface MuiProps {
    classes?: any
}

interface OwnProps {
    exampleInputProp?: string
}

interface StoreProps {
    isLogged?: boolean
    auth?: (username: string, password: string) => void
}

type AuthViewProps = MuiProps & OwnProps & StoreProps;

const Wrapper = styled.div`
  overflow: hidden;
  height: 100%;
  background-image: url(${backgroundImg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
`;

const useStyles = ((theme: Theme) => createStyles({
    box: {
        width: "70%",
        margin: "auto"
    },
    paper: {
        minWidth: 400,
        maxWidth: 500,
        minHeight: 500,
        background: "rgba(255, 255, 255, 0.3)",
        borderRadius: 15,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing(2)
    },
    container: {
        margin: theme.spacing(2),
        height: "100%"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        minWidth: 350,
        maxWidth: 400,
    },
    field: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    button: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: 150
    },
    options: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        width: "100%"
    }
}));

const AuthView: React.FunctionComponent<AuthViewProps> = (props) => {
    const { classes } = props;
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = () => {
        if (props.auth)
            props.auth(username, password);
    }

    const handleKeyUp = (e: any) => {
        if(e.key === "Enter")
            handleLogin();
    }

    return (
        <Wrapper>
            <div className={classes.box}>
                <Paper elevation={4} className={classes.paper}>
                    <Typography variant="h4" gutterBottom>
                        System kolejkowy
                </Typography>
                    <Typography
                        variant="h6"
                        style={{ fontWeight: 400, }}
                    >
                        Logowanie
                </Typography>
                    <form className={classes.form} onKeyUp={handleKeyUp}>
                        <TextField
                            label="Użytkownik"
                            name="username"
                            color="primary"
                            variant="filled"
                            fullWidth
                            className={classes.field}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            label="Hasło"
                            name="password"
                            type="password"
                            color="primary"
                            variant="filled"
                            fullWidth
                            className={classes.field}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className={classes.options}>
                            {/* <FormControlLabel
                                value={true}
                                control={
                                    <Checkbox
                                        color="primary"
                                        onChange={e => console.log('e', e.target.value)} />
                                }
                                label="Zapamiętaj mnie"
                                labelPlacement="end"
                            /> */}
                            <ForgotPassword />
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={handleLogin}
                        >
                            Zaloguj
                    </Button>
                    </form>
                </Paper>
            </div>
        </Wrapper>
    );
};

const mapStateToProps = (state: RootState, ownProps: OwnProps) => ({
    isLogged: state.auth.isLogged
})

const mapDispatchToProps = (
    dispatch: ThunkDispatch<any, any, RootActions>, ownProps: OwnProps
) => ({
    auth: (username: string, password: string) => dispatch(auth(username, password)),
})

export default compose(
    withStyles(useStyles),
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(AuthView) as React.ComponentType<AuthViewProps>;
