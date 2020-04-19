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

export default function(props: IQueueViewProps) {
    const { doctorName, queueNoMessage } = props;

    return (
        <StyledApp>
            <Header title={doctorName}/>
            <QueueMessage message={queueNoMessage} />
        </StyledApp>
    );
}