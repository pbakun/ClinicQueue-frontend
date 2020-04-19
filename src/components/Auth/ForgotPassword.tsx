import React, { useState } from 'react';
import { withStyles, createStyles, Theme, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@material-ui/core";

interface IForgotPasswordProps {
    classes: any,
    onSubmit?: (email: string) => void;
}

const useStyles = ((theme: Theme) => createStyles({
    anchor: {
        cursor: "pointer"
    },
    content: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        marginTop: 0,
        width: 300
    },
    button: {
        margin: theme.spacing(1)
    },
    buttonSecondary: {
        color: "#FFF"
    },
    textContent: {
        paddingBottom: theme.spacing(1)
    },
    inputField: {
        minWidth: 300
    }
}));

const ForgotPassword: React.FunctionComponent<IForgotPasswordProps> = (props) => {
    const { classes, onSubmit} = props;
    const [open, setOpen] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit && onSubmit(email);
        setOpen(false);
    }

  return (
      <React.Fragment>
          <Typography
            variant="body1"
            noWrap
            className={classes.anchor}
            onClick={() => setOpen(true)}
        >
                Nie pamiętam hasła
            </Typography>

            <Dialog
                open={open}
                maxWidth="md"
                onClose={() => setOpen(false)}
            >
                <DialogTitle>
                    Nie pamiętam hasła
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                <DialogContent className={classes.content}>
                    <Typography
                        variant="subtitle1"
                        className={classes.textContent}
                    >
                        Podaj zarejestrowany adres email:
                    </Typography>
                    <TextField
                        label="Adres email"
                        color="primary"
                        variant="filled"
                        type="email"
                        className={classes.inputField}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        classes={{ containedSecondary: classes.buttonSecondary}}
                        onClick={() => setOpen(false)}
                    >
                        Anuluj
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        type="submit"
                    >
                        Potwierdź
                    </Button>
                </DialogActions>
                </form>
            </Dialog>
      </React.Fragment>
  );
};

export default withStyles(useStyles)(ForgotPassword);
