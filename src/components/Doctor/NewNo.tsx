import React, {useState} from 'react';
import {withStyles, createStyles, Typography, TextField, Button, Paper, Theme} from "@material-ui/core";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

interface INewNoProps {
    classes: any,
    onSubmit(value: string): void;
}

const useStyles = ((theme: Theme) => createStyles({
    paper: {
        padding: theme.spacing(2),
        margin: theme.spacing(3)
    },
    title: {
        marginLeft: theme.spacing(2),
        margin: theme.spacing(1),
    },
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: theme.spacing(1),
        marginTop: theme.spacing(2),
        minWidth: 200,
    },
    label: {
        left: theme.spacing(5)
    },
    input: {
        marginLeft: theme.spacing(1),
        fontSize: "1.2rem"
    },
    button: {
        margin: theme.spacing(2)
    }
}));

const NewNo: React.FunctionComponent<INewNoProps> = (props) => {
    const { classes, onSubmit } = props;
    const [value, setValue] = useState<string>("");
    
    const handleValueChange = (e: any) => {
        let value = e.currentTarget.value;
        if(value > 0)
            setValue(value);
        else setValue("");
    }

  return (
    <Paper square className={classes.paper}>
        <Typography
            variant="h6"
            className={classes.title}
        >
            Nowy numer:
        </Typography>
        <div className={classes.container}>
            <TextField
                color="primary"
                variant="filled"
                type="number"
                label="Nowy numer"
                fullWidth
                InputLabelProps={{
                    classes: {root: classes.label},
                }}
                InputProps={{
                    startAdornment: <PersonOutlineIcon />,
                    classes: { input:  classes.input}
                }}
                value={value}
                onChange={handleValueChange}
            />
            <Button
                color="primary"
                variant="contained"
                fullWidth
                className={classes.button}
                onClick={() => onSubmit(value)}
            >
                Zatwierdź
            </Button>
        </div>
    </Paper>
  );
};

export default withStyles(useStyles)(NewNo);
