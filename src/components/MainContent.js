import React from 'react';
import Welcome from './Welcome';
import CircuitModel from './CircuitModel';
import DesignModel from './DesignModel';
import '../style/MainContent.css';

const MainContent = () => {
    return (
        <div className="main-content">
            <Welcome />
            <h1>Module 1: Solar Cell Modeling (N-series)</h1>
            <CircuitModel />
            <h1>Module 2: Solar Panel Design</h1>
            <DesignModel />
        </div>
    );
};

export default MainContent;