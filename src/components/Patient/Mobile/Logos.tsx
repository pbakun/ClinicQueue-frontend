import React from 'react';
import { withStyles, createStyles, Theme} from "@material-ui/core";
import nfzLogo from "../../../images/logo_NFZ.png";
import cancerTherapyLogo from "../../../images/szybka_terapia_onkologiczna.png";

interface Props {
    classes: any;
}

const useStyles = (theme: Theme) => createStyles({
    container: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    nfzLogo: {
        margin: theme.spacing(1),
        maxHeight: 100
    },
    cancerTherapyLogo: {
        margin: theme.spacing(1),
        maxHeight: 100
    }
});

const Logos: React.FC<Props> = (props) => {
    const { classes } = props;

    return (
        <div className={classes.container}>
            <img src={nfzLogo} alt="nfzLogo" className={classes.nfzLogo} />
            <img src={cancerTherapyLogo} alt="cancerTherapy" className={classes.cancerTherapyLogo} />
        </div>
    )
}

export default withStyles(useStyles)(Logos);
