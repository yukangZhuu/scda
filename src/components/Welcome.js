import React from 'react';
import '../style/Welcome.css';
import welcome from '../images/solarCell1.webp';
import github from '../images/githubIcon.png';
import circuit from '../images/circuit.png';
import model from '../images/model.png';
import modules from '../images/modules.png';
import { GithubOutlined } from "@ant-design/icons";

const Welcome = () => {

    return (
        <div className='welcome'>
            <h1>SCDA:</h1>
            <h2> A Solar Cell Design & Modeling Automation Tool </h2>
            <h3>UCLA - MAE 287/ECE 257 - Nanoscience and Technology - Final Project</h3>
            <div className='authors-container'>
                <div className='author-container'>
                    <h4>Yukang Zhu</h4>
                    <h4>606074925</h4>
                </div>
                <div className='author-container'>
                    <h4>Xuhe Qian</h4>
                    <h4>805929542</h4>
                </div>
            </div>
            <div className='github-icon-container'>
                <a href='https://github.com/' target='_black'>
                    <img src={github} alt="source" style={{width: 40}}/>
                </a>
                <h4>/Source</h4>
            </div>

            <div className="welcome-content-container">
                <img src={model} alt="solar cell panel" className="welcome-content-image" style={{width: 400}}/>
                <img src={circuit} alt="solar cell panel" className="welcome-content-image" style={{width: 400}}/>
                <img src={welcome} alt="solar cell panel" className="welcome-content-image" style={{width: 300}}/>
            </div>
            <div className='modules-container'>
                <div className="welcome-content-text">
                        <p>
                            <b>SCDA</b> is an innovative software solution aimed at aiding the design and 
                            efficiency optimization of solar cells and panels. It features two main 
                            components: <b>Solar Cell Modeling</b> and <b>Solar Panel Design</b>. The modeling component 
                            offers comprehensive I-V and P-V Analysis. The design section integrates Geological 
                            Location to tailor panel designs to specific environmental contexts, coupled with 
                            a Max Efficiency Optimization algorithm.
                        </p>

                </div>
                <img src={modules} alt="source" style={{width: 900}}/>
                <h4>The Module Structure of SCDA</h4>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ width: '75%', borderTop: '2px solid #000', margin: '16px 0' }}></div>
            </div>
        </div>
    );

};

export default Welcome;