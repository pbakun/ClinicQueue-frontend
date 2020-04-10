import React, {useState} from 'react';
import { withStyles, Theme, createStyles, TextField, Button } from "@material-ui/core";
import { PasswordChange as IPasswordChange} from "./interface";

interface IMuiProps {
    classes?: any
}

interface OwnProps {
    onSubmit?: (data: IPasswordChange) => void;
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
    const { classes, onSubmit } = props;
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit && onSubmit({oldPassword, newPassword, confirmPassword});
    }

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
                className={classes.field}
                variant="filled"
                size="small"
                label="Stare hasło"
                name="oldPassword"
                type="password"
                value={oldPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOldPassword(e.target.value)}
            />
            <TextField
                className={classes.field}
                variant="filled"
                size="small"
                label="Nowe hasło"
                name="newPassword"
                type="password"
                value={newPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
            />
            <TextField
                className={classes.field}
                variant="filled"
                size="small"
                label="Potwierdź nowe hasło"
                name="passwordConfirmation"
                type="password"
                value={confirmPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
            />
            <Button
                className={classes.field}
                variant="contained"
                color="primary"
                type="submit"
            >
                Zatwierdź
            </Button>
        </form>
    )
}

PasswordChange.propTypes = {

}

export default withStyles(useStyles)(PasswordChange) as React.ComponentType<IUserDetails>;
