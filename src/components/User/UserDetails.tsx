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

const UserDetails: React.FC<IUserDetails> = props => {
    const { classes } = props;

    return (
        <form className={classes.form}>
            <TextField
                className={classes.field}
                variant="filled"
                size="small"
                label="Nazwa użytkownika"
                name="username"
            />
            <TextField
                className={classes.field}
                variant="filled"
                size="small"
                label="Email"
                name="email"
                type="email"
            />
            <TextField
                className={classes.field}
                variant="filled"
                size="small"
                label="Imię"
                name="firstName"
            />
            <TextField
                className={classes.field}
                variant="filled"
                size="small"
                label="Nazwisko"
                name="lastName"
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

UserDetails.propTypes = {

}

export default withStyles(useStyles)(UserDetails) as React.ComponentType<IUserDetails>;
