import React, { useState } from 'react';
import { withStyles, createStyles, Typography, TextField, Button, Paper, Theme, MenuItem } from "@material-ui/core";
import AssessmentIcon from '@material-ui/icons/Assessment';

interface INewRoomNoProps {
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
        minWidth: 150,
    },
    label: {
        left: theme.spacing(5)
    },
    input: {
        marginLeft: theme.spacing(2),
        fontSize: "1.2rem"
    },
    inputBase: {
        fontSize: "1.2rem"
    },
    button: {
        margin: theme.spacing(2)
    }
}));

const sampleData = ["12c", "test", "16c", "16b"];

const NewRoomNo: React.FunctionComponent<INewRoomNoProps> = (props) => {
    const { classes, onSubmit } = props;
    const [value, setValue] = useState<string>("");

    const handleValueChange = (e: any) => {
        setValue(e.target.value);
    };

    const listOptions = (options: Array<string>) => {
        return options.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>);
    };

    return (
        <Paper square className={classes.paper}>
            <Typography
                variant="h6"
                className={classes.title}
            >
                Gabinet:
            </Typography>
            <div className={classes.container}>
                <TextField
                    color="primary"
                    variant="filled"
                    type="number"
                    label="Wybierz gabinet"
                    fullWidth
                    select
                    InputLabelProps={{
                        classes: { root: classes.label },
                    }}
                    InputProps={{
                        startAdornment: <AssessmentIcon />,
                        classes: { 
                            root: classes.inputBase, 
                            input: classes.input }
                    }}
                    SelectProps={{
                        MenuProps: {
                            getContentAnchorEl: null,
                            anchorOrigin: {
                              vertical: "bottom",
                              horizontal: "left",
                            }
                          }
                    }}
                    value={value}
                    onChange={handleValueChange}
                >
                    {listOptions(sampleData)}
                </TextField>
                <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    className={classes.button}
                    onClick={() => onSubmit(value)}
                >
                    Zmień
                </Button>
            </div>
        </Paper>
    );
};

export default withStyles(useStyles)(NewRoomNo);
