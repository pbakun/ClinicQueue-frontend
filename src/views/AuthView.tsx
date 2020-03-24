import React, { useState } from 'react';
import styled from "styled-components";
import { Paper, Typography, Button, withStyles, Theme, createStyles, TextField, Checkbox, FormControlLabel } from "@material-ui/core";
import backgroundImg from "../images/background.jpg";
import ForgotPassword from '../components/Auth/ForgotPassword';
import instance from "../config/axios";
import Cookies from "js-cookie";
import { identityToken } from "../utils/staticData";

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

interface IAuthViewProps {
    classes: any,
}

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
        justifyContent: "space-between",
        width: "100%"
    }
}));

const AuthView: React.FunctionComponent<IAuthViewProps> = (props) => {
    const { classes } = props;
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = (e: any) => {
        let config = {
            headers: {
            'Content-type': "application/json"
            },
            withCredentials: true
        }
        instance.post("auth/login", {username: username, password: password}, config)
                .then(response => console.log('response', response));
    }

    const handleTest = () => {
        let config = {
            headers: {
                'Content-type': "application/json",
            },
            withCredentials: true
        }
        instance.get("/doctor", config)
                .then(response => console.log('response', response));
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
                    style={{fontWeight: 400,}}
                >
                    Logowanie
                </Typography>
                <form className={classes.form}>
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
                        <FormControlLabel
                            value={true}
                            control={
                                <Checkbox
                                    color="primary"
                                    onChange={e => console.log('e', e.target.value)} />
                            }
                            label="Zapamiętaj mnie"
                            labelPlacement="end"
                        />
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
                    <Button onClick={handleTest}>Test</Button>
                </form>
        </Paper>
        </div>
    </Wrapper>
  );
};

export default withStyles(useStyles)(AuthView);
