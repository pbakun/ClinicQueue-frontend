import React, { useEffect } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import {
    createStyles, Theme, DialogTitle, Dialog, DialogContent, Typography,
    IconButton, List, ListItem, ListItemText, ListItemSecondaryAction
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = ((theme: Theme) => createStyles({
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1)
    },
    content: {
        marginBottom: theme.spacing(2)
    },
    trash: {
        color: "#f74c4c",
        opacity: 0.7,
    },
    list: {
        border: "1px solid #c6c6c6",
        borderRadius: 10,
        padding: 0,
        marginTop: 0,
        margin: theme.spacing(2),
    },
    item: {
        borderRadius: 10,
        "&:hover": {
            background: "#FAFAFA"
        }
    },
    itemText: {
        paddingRight: theme.spacing(1)
    }
}))

interface FavMessageDialogProps {
    classes: any,
    open: boolean,
    messages: string[],
    onClose: () => void;
    onPick: (id: string) => void;
    onDelete: (id: string) => void;
}

const FavMessageDialog: React.FC<FavMessageDialogProps> = (props) => {
    const { classes, open, messages, onClose, onPick, onDelete } = props;

    const printList = (data: any[]) => {
        let i = 0;
        if (data.length === 0)
            return <Typography variant="subtitle1">Brak ulubionych wiadomości.</Typography>
        return (
            <List className={classes.list}>
                {data.map((item: any) => {
                    return (
                        <ListItem
                            key={i++}
                            className={classes.item}
                            button
                            onClick={() => onPick(item.id)}
                        >
                            <ListItemText className={classes.itemText}>
                                {item.message}
                            </ListItemText>
                            <ListItemSecondaryAction>
                                <IconButton
                                    className={classes.trash}
                                    onClick={() => onDelete(item.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
        )

    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle disableTypography>
                <Typography variant="h6">
                    Ulubione wiadomości
                </Typography>
                <IconButton
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.content}>
                {printList(messages)}
            </DialogContent>
        </Dialog >
    );
}

export default withStyles(useStyles)(FavMessageDialog);

const sampleData: any[] = [
    {
        id: "1",
        message: "1234"
    },
    {
        id: "3",
        message: "1234"
    },
    {
        id: "2",
        message: "1234"
    }
]