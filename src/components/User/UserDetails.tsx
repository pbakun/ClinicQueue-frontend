import React, {useState, useEffect} from 'react';
import { withStyles, Theme, createStyles, TextField, Button } from "@material-ui/core";
import { User } from './interface';

interface IMuiProps {
    classes?: any
}

interface OwnProps {
    user: User,
    onSubmit: (user: User) => void;
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
    const { classes, user: input, onSubmit } = props;
    const [user, setUser] = useState<User>(input);

    useEffect(() => {
        setUser(input);
    }, [input]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(user);
    }

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
                className={classes.field}
                variant="filled"
                size="small"
                label="Nazwa użytkownika"
                name="username"
                value={user.username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, username: e.target.value})}
            />
            <TextField
                className={classes.field}
                variant="filled"
                size="small"
                label="Email"
                name="email"
                type="email"
                value={user.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, email: e.target.value})}
            />
            <TextField
                className={classes.field}
                variant="filled"
                size="small"
                label="Imię"
                name="firstName"
                value={user.firstName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, firstName: e.target.value})}
            />
            <TextField
                className={classes.field}
                variant="filled"
                size="small"
                label="Nazwisko"
                name="lastName"
                value={user.lastName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, lastName: e.target.value})}
            />
            <Button
                className={classes.field}
                variant="contained"
                color="primary"
                // onClick={handleSubmit}
                type="submit"
            >
                Zatwierdź
            </Button>
        </form>
    )
}

UserDetails.propTypes = {

}

export default withStyles(useStyles)(UserDetails) as React.ComponentType<IUserDetails>;
