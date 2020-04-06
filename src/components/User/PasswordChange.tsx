import React from 'react';
import { withStyles, Theme, createStyles, TextField, Button } from "@material-ui/core";

interface IMuiProps {
    classes?: any
}

interface OwnProps {
}

type IUserDetails = IMuiProps & OwnProps

const useStyles = (theme: Theme) => createStyles({
    form: {
        display: "flex",
        flexDirection: "column",
        margin: theme.spacing(1),
        maxWidth: 300
    },
    field: {
        margin: theme.spacing(1)
    }
});

const PasswordChange: React.FC<IUserDetails> = props => {
    const { classes } = props;

    return (
        <form className={classes.form}>
            <TextField
                className={classes.field}
                variant="filled"
                size="small"
                label="Stare hasło"
                name="oldPassword"
                type="password"
            />
            <TextField
                className={classes.field}
                variant="filled"
                size="small"
                label="Nowe hasło"
                name="newPassword"
                type="password"
            />
            <TextField
                className={classes.field}
                variant="filled"
                size="small"
                label="Potwierdź nowe hasło"
                name="passwordConfirmation"
                type="password"
            />
            <Button
                className={classes.field}
                variant="contained"
                color="primary"
            >
                Zatwierdź
            </Button>
        </form>
    )
}

PasswordChange.propTypes = {

}

export default withStyles(useStyles)(PasswordChange) as React.ComponentType<IUserDetails>;
