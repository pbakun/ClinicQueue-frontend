import React from 'react';
import { Theme, createStyles, makeStyles, Typography } from "@material-ui/core";
import nfzLogo from "../../../images/logo_NFZ.png";
import cancerTeraphy from "../../../images/szybka_terapia_onkologiczna.png";


interface Props {
    title: String;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        display: "flex",
        justifyContent: "center",
        height: "25%",
        alignItems: "center"
    },
    nfzLogo: {
        position: "absolute",
        left: 10,
        top: 10,
        maxWidth: 400
    },
    cancerTeraphy: {
        position: "absolute",
        right: 10,
        top: 10
    }
}));

export const Header: React.FC<Props> = (props) => {
    const classes = useStyles();
    const { title } = props;

    return (
        <React.Fragment>
            <div className={classes.container}>
                <img
                    src={nfzLogo}
                    className={classes.nfzLogo}
                    alt="NFZ_logo" />
                <img
                    src={cancerTeraphy}
                    className={classes.cancerTeraphy}
                    alt="Terapia_onkologiczna" />
            </div>
            <div className={classes.container}>
                <Typography variant="h1">
                    {title}
                </Typography>
            </div>
        </React.Fragment>
    )

}