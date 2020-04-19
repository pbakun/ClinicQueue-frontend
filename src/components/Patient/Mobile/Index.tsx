import React from 'react';
import { IQueueViewProps } from '../interface';
import Header from './Header';
import QueueNoMessage from "./QueueNoMessage";
import Logos from './Logos';
import styled from 'styled-components';

const StyledApp = styled.div`
  overflow: hidden;
  height: 90vh;
  `;

const FlexWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const ContentDiv = styled.div`
    justify-content: normal;
`;

const LogosDiv = styled.div`
    justify-self: flex-end;
`;


export default function(props: IQueueViewProps) {
    const { roomNo, doctorName, queueNoMessage } = props;
    return (
        <StyledApp style={{position: "relative"}}>
            <FlexWrapper>
                <ContentDiv>
                    <Header
                        roomNo={roomNo ? roomNo : ""}
                        doctorName={doctorName}
                    />
                    <QueueNoMessage message={queueNoMessage} />
                </ContentDiv>
            <LogosDiv>
                <Logos />
            </LogosDiv>
            </FlexWrapper>
        </StyledApp>
    )
}