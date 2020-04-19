import React from 'react';

interface ITabPanel {
    value: number;
    index: number;
    children: React.ReactNode
}

const TabPanel: React.FC<ITabPanel> = props => {
    const { value, index, children } = props;
    return (
        <React.Fragment>
            {value === index && <>{children}</>}
        </React.Fragment>
    );
}

export default TabPanel
