import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';

const StyleLoader = styled.div`
    position: absolute;
    width: 100%;
    top: 50%;
    `;

const StyledWrapperLoader = styled.div`
    position: fixed;
    width: 100%;
    background: rgba(255,255,255,0.7);
    z-index: 2000;
    height: 100%;
    `;

    const Center = styled.div`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

export default function() {
    return (
        <StyledWrapperLoader>
            <StyleLoader>
                <Center>
                    <CircularProgress />
                </Center>
            </StyleLoader>
        </StyledWrapperLoader>
    )
}

