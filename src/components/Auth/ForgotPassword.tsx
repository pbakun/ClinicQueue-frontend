import React, { useState } from 'react';
import { withStyles, createStyles, Theme, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@material-ui/core";

interface IForgotPasswordProps {
    classes: any,
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
        // color: "#FFF"
    },
    textContent: {
        paddingBottom: theme.spacing(1)
    }
}));

const ForgotPassword: React.FunctionComponent<IForgotPasswordProps> = (props) => {
    const { classes} = props;
    const [open, setOpen] = useState<boolean>(false);

    const handleSubmit = (e: any) => {
        e.stopPropagation();
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
                        variant="outlined"
                        type="email"
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
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
