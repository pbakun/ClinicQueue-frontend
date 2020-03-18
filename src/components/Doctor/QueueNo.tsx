import * as React from 'react';
import {withStyles, createStyles, Typography, Fab, Paper, Theme} from "@material-ui/core"; 
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
 
interface IQueueNoProps {
    classes: any
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
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: 180,
        margin: "auto",
        padding: theme.spacing(2)
    },
    queueMessage: {
        textAlign: "center",
    }
}));

const QueueNo: React.FunctionComponent<IQueueNoProps> = (props) => {
    const { classes } = props;
    
  return (
      <Paper square className={classes.paper}>
          <Typography variant="h6" className={classes.title}>
              Aktualny pacjent:
          </Typography>
          <Typography variant="h1" className={classes.queueMessage}>
                PB1
          </Typography>
          <div className={classes.container}>
          <Fab color="primary">
              <AddIcon />
          </Fab>
          <Fab color="primary">
              <RemoveIcon />
          </Fab>
          </div>
      </Paper>
  );
};

export default withStyles(useStyles)(QueueNo);
