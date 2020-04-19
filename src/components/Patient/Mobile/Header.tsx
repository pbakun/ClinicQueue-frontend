import React from 'react';
import { withStyles, createStyles, Theme, Typography} from "@material-ui/core";

interface Props {
    classes: any;
    roomNo: string;
    doctorName: string;
}

const useStyles = (theme: Theme) => createStyles({
    container: {
        margin: theme.spacing(3)
    },
    doctorName: {
        paddingTop: theme.spacing(1),
        fontSize: "1.3rem"
    }
});

const Header: React.FC<Props> = (props) => {
    const { classes, roomNo, doctorName } = props;

    return (
        <div className={classes.container}>
            <Typography variant="h5">
                Gabinet {roomNo}
            </Typography>
            <Typography
                variant="subtitle1"
                color="primary"
                className={classes.doctorName}
            >
                {doctorName}
            </Typography>
        </div>
    )
}

export default withStyles(useStyles)(Header);
