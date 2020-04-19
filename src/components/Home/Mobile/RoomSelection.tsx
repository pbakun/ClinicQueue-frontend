import React from 'react';
import { Typography, withStyles, createStyles, Theme, Button } from "@material-ui/core";
import { Link } from 'react-router-dom';

interface MuiProps {
    classes: any;
}

interface OwnProps {
    rooms: string[]
}

type IRoomSelection = MuiProps & OwnProps;

const useStyles = (theme: Theme) => createStyles({
    container: {
        textAlign: "center"
    },
    headerText: {
        paddingTop: theme.spacing(1)
    },
    roomButtons: {
        margin: theme.spacing(2),
        display: "flex",
        flexDirection: "column"
    },
    button: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
});

const RoomSelection: React.FC<IRoomSelection> = (props) => {
    const { classes, rooms } = props;

    const printButtons = (data: string[]) => {
        if(data.length === 0)
            return <Typography variant="h6">Brak dostępnych gabinetów</Typography>
        return data.map(room => {
            return (
                <Link
                    key={room}
                    to={`/patient/${room}`}
                    style={{textDecoration: "none"}}
                >
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        fullWidth
                    >
                        Gabinet {room}
                    </Button>
                </Link>
            )
        })
    }

    return (
        <div className={classes.container}>
            <Typography
                variant="h2"
                className={classes.headerText}
            >
                Kolejka
            </Typography>
            <div className={classes.roomButtons}>
                {printButtons(rooms)}
            </div>
        </div>
    )
}

export default withStyles(useStyles)(RoomSelection);
