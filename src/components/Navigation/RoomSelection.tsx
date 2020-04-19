import React, { useState, useRef } from 'react';
import {
    makeStyles, createStyles, Theme, Button, Paper, MenuList,
    MenuItem, Popper, ClickAwayListener, Tooltip
} from "@material-ui/core";
import { baseUrl } from "../../utils/staticData";

interface IRoomSelection {
    buttonClassName: any,
    rooms?: string[]
}

const RoomSelection: React.FunctionComponent<IRoomSelection> = ({ buttonClassName, rooms = [] }) => {
    const [open, setOpen] = useState<boolean>(false);
    const btnRef = React.useRef<HTMLButtonElement>(null);

    function handleMenuItemClick(query: string) {
        setOpen(false);
        window.open(`${baseUrl}/patient/${query}`);
    }

    const printOptions = (data: string[]) => {
        if (data.length === 0)
            return <MenuItem disabled>Brak pokoi</MenuItem>
        return data.map(item => {
            return (
                <MenuItem
                    key={item}
                    onClick={() => handleMenuItemClick(item)}
                >
                    Pok.&nbsp;{item}
                </MenuItem>
            )
        })
    }

    return (
        <React.Fragment>
            <Tooltip
                arrow
                placement="right-end"
                title="Pokaż widok kolejki dla wybranego pokoju."
            >
                <Button
                    variant="outlined"
                    color="primary"
                    className={buttonClassName}
                    ref={btnRef}
                    onClick={() => setOpen(true)}
                >
                    Pokoje
            </Button>
            </Tooltip>

            <Popper
                open={open}
                anchorEl={btnRef.current}
            >
                <Paper>
                    <ClickAwayListener onClickAway={() => setOpen(false)}>
                        <MenuList autoFocusItem={open}>
                            {printOptions(rooms)}
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Popper>
        </React.Fragment>
    );
}

export default RoomSelection;