import React from 'react';
import '../style/DesignModel.css';
import { useState, useEffect } from 'react';
import { Card, Button } from 'antd';
import MapComponent from './MapComponent';
import DecimalStep from './DecimalStep';
import { estimateSolarCellIV, optimizeEfficiency } from '../utils/utils';
import arrow from '../images/arrow.png';
import panel from '../images/panel.png';

const DesignModel = () => { 
    //one single solar cell: 0.024 m2
    const [sliderNs, setSliderNs] = useState(48);
    const [cityData, setCityData] = useState({city: 'None', T: NaN, G: NaN});
    const [result, setResult] = useState({
        ISolution: [],
        VSolution: [],
        PSolution: [],
        maxI: NaN,
        maxV: NaN,
        maxP: NaN,
        maxEff: NaN
    })

    const [sliderWidth, setSliderWidth] = useState(0.468);

    const [optimized, setOptimized] = useState({
        maxEff: 0,
        NsOptimized: 0,
    })

    const handleClick = () => {
        setOptimized(optimizeEfficiency(cityData.T, cityData.G, 0.0032, 12, 240, 12));
    }


    useEffect(() => {
        setResult(estimateSolarCellIV(cityData.T, cityData.G, 0.0032, sliderNs));
    }, [cityData, sliderNs]);

    useEffect(() => {
        setOptimized({
            maxEff: 0,
            NsOptimized: 0,
            PperCell:0,
        });
    }, [cityData]);

    return (
        <>
            <div className='sub-title'>
                <h2>- Geological Location Integration</h2>
            </div>
            <div className='design-model-container'>
                <div className='map-container'>
                    <Card hoverable style={{borderWidth: '6px', borderColor: '#d9d9d9', width: 600}} bodyStyle={{ padding: 0 }}>
                        <MapComponent onClickCity={setCityData} />
                    </Card>
                </div>

                <div className='panel-container'>
                    <Card hoverable style={{borderWidth: '6px', borderColor: '#d9d9d9', width: 600}} bodyStyle={{ padding: 0 }}>
                        <div className='data-item1'>
                            <h2>Selected City: </h2>
                            <h3>{cityData.city}</h3>
                        </div>
                        <div className='data-item2'>
                            <h2>Average Temperature: </h2>
                            <h3>{cityData.T.toString()} °C</h3>
                        </div>
                        <div className='data-item3'>
                            <h2>Average Solar Irradianc (G): </h2>
                            <h3>{cityData.G.toString()} W/m2</h3>
                        </div>
                        <div className='panel-slider'>
                            <h3>Ns (Number of Series Solar Cells)</h3>
                            <DecimalStep 
                                min={12} max={240} 
                                onChangeValue={setSliderNs} 
                                value={sliderNs}
                                step={12}
                            />
                        </div>
                    </Card>

                    <Card hoverable style={{borderWidth: '6px', borderColor: '#d9d9d9', width: 600, marginTop: 20}} bodyStyle={{ padding: 0 }}>
                        <div className='data-item3'>
                            <h2><b style={{color: "purple"}}>Efficiency = {(result.maxEff * 100).toFixed(2)} %</b></h2>
                        </div>    
                        <div className='data-item3'>
                            <h2><b style={{color: "blue"}}>Power = {(result.maxP)} W</b></h2>
                        </div>                    
                    </Card>
                </div>
            </div>
            <div className='sub-title'>
                <h2>- Max Efficiency Optimization</h2>
            </div>
            <div className='optimization-container'>
                <div className='map-container'>
                    <Card hoverable style={{borderWidth: '6px', borderColor: '#d9d9d9', width: 600}} bodyStyle={{ padding: 0 }}>
                        <div className='data-item1'>
                            <h2>Selected City: </h2>
                            <h3>{cityData.city}</h3>
                        </div>
                        <div className='data-item2'>
                            <h2>Average Temperature: </h2>
                            <h3>{cityData.T.toString()} °C</h3>
                        </div>
                        <div className='data-item3'>
                            <h2>Average Solar Irradianc (G): </h2>
                            <h3>{cityData.G.toString()} W/m2</h3>
                        </div>
                        <div className='button-container'>
                            <Button 
                                type="primary" 
                                htmlType="submit"
                                style={{
                                    fontSize: '20px', // Adjust font size as needed
                                    padding: '20px 30px', // Adjust padding for button size
                                    lineHeight: '1', // Adjust line height to ensure vertical centering
                                    display: 'inline-flex', // Use flexbox for alignment
                                    alignItems: 'center', // Align items in the center vertically
                                    justifyContent: 'center' // Center content horizontally
                                }}
                                onClick={handleClick}
                            >
                                Max Efficiency Analysis
                            </Button>
                        </div>
                        
                    </Card>
                </div>
                <img src={arrow} alt="solar cell panel"  style={{width: 100, marginTop: 50, marginLeft: 12, marginRight: 12}}/>
                <div className='panel-container'>
                    <Card hoverable style={{borderWidth: '6px', borderColor: '#d9d9d9', width: 600}} bodyStyle={{ padding: 0 }}>
                        <div className='data-item3'>
                            <h2><b style={{color: "red"}}>Max Efficiency = {(optimized.maxEff * 100).toFixed(2)} %</b></h2>
                        </div>    
                        <div className='data-item3'>
                            <h2><b style={{color: "red"}}>Max Power Per Cell = {optimized.PperCell} W</b></h2>
                        </div>    
                        <div className='data-item3'>
                            <h2>Optimized Solar Panel Model:</h2>
                        </div>        
                        {optimized.maxEff !== 0 && <div className='panel-model-container'>
                            <p className='length'>Length = {(optimized.NsOptimized*0.024336/(sliderWidth)).toFixed(3)} m</p>
                            <img src={panel} alt="solar cell panel"  style={{width: 450, marginLeft: 12, marginRight: 12}}/>
                            <p className='width'>Width <br></br>= {Number(sliderWidth).toFixed(3)} m</p>
                            <p className='ns'>Number of Solar Cells = {optimized.NsOptimized}</p>
                        </div>
                        }
                        {optimized.maxEff !== 0 && <
                            div className='panel-slider'>
                                <h3>Adjust Panel Width</h3>
                                <DecimalStep 
                                    min={0.468} max={(0.156*Math.floor(Math.sqrt(optimized.NsOptimized))).toFixed(3)} 
                                    onChangeValue={setSliderWidth} 
                                    value={Number(sliderWidth).toFixed(3)}
                                    step={0.156*3}
                                />
                            </div>
                        }
                    </Card>
                </div>
                

                
            </div>
        </>

      );



}



export default DesignModel;
