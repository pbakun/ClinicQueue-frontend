import React from 'react';
import { withStyles, createStyles, Button, Paper, Theme } from "@material-ui/core";


interface ISpecialButtonsProps {
    classes: any,
    onBreak: () => void,
    onSpecial: () => void
}

const useStyles = ((theme: Theme) => createStyles({
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(3)
    },
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%"
    },
    button: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        margin: theme.spacing(1),
        color: "#FFF",
        width: 140
    }
}));

const SpecialButtons: React.FunctionComponent<ISpecialButtonsProps> = (props) => {
    const { classes } = props;

  return (
    <Paper square className={classes.paper}>
        <div className={classes.container}>
            <Button
                variant="contained"
                color="secondary"
                classes={{
                    root: classes.button
                }}
                style={{lineHeight: 3.5}}
                onClick={props.onBreak}
            >
                Przerwa
            </Button>
            <Button
                variant="contained"
                color="primary"
                classes={{
                    root: classes.button
                }}
                onClick={props.onSpecial}
            >
                Number specjalny
            </Button>
        </div>
    </Paper>
  );
};

export default withStyles(useStyles)(SpecialButtons);
