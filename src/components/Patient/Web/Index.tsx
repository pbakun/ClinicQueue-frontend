import React from 'react';
import styled from 'styled-components';
import { Theme, createStyles, makeStyles } from "@material-ui/core";
import { Header } from './Header';
import { QueueMessage } from './QueueMessage';
import { IQueueViewProps } from '../interface';

const StyledApp = styled.div`
  overflow: hidden;
  height: 100vh;
  `;

const useStyles = makeStyles((theme: Theme) => createStyles({
    container: {
        display: "flex",
        justifyContent: "center",
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

export default function(props: IQueueViewProps) {
    const { doctorName, queueNoMessage } = props;

    return (
        <StyledApp>
            <Header title={doctorName}/>
            <QueueMessage message={queueNoMessage} />
        </StyledApp>
    );
}