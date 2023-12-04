import React from 'react';
import '../style/CircuitModel.css';
import { useState, useEffect } from 'react';
import { Card } from 'antd'
import IVCurve from './IUCurve';
import DecimalStep from './DecimalStep';
import { estimateSolarCellIV } from '../utils/utils';

const initialU = [0, 0, 0, 0, 0];
const initialI = [0, 0, 0, 0, 0];
const initialP = [0, 0, 0, 0, 0];

const CircuitModel = () => {
    const [slider1Value, setSlider1Value] = useState(50);
    const [slider2Value, setSlider2Value] = useState(550);
    const [slider3Value, setSlider3Value] = useState(0.0035);
    const [slider4Value, setSlider4Value] = useState(48);

    const [result, setResult] = useState({
        ISolution: initialI,
        VSolution: initialU,
        PSolution: initialP,
        maxI: NaN,
        maxV: NaN,
        maxP: NaN,
        maxEff: NaN,
    })

    useEffect(() => {
        setResult(estimateSolarCellIV(slider1Value, slider2Value, slider3Value, slider4Value));
    }, [slider1Value, slider2Value, slider3Value, slider4Value]);
    

    return (
        <div className='model-container'>
            <Card hoverable style={{borderWidth: '6px', borderColor: '#d9d9d9', width: 800}} bodyStyle={{ padding: 0 }} >

                <div className='curve-container'>
                    <IVCurve 
                        X={result.VSolution} Y={result.ISolution} 
                        title={'I-U Curve for Solar Cell'} 
                        xLabel={'Voltage: V'} 
                        yLabel={'Current: A'} 
                        color={'rgba(255, 0, 0, 1)'}
                    />
                </div>

                <div className='curve-container'>
                    <IVCurve 
                        X={result.VSolution} Y={result.PSolution} 
                        title={'P-U Curve for Solar Cell'} 
                        xLabel={'Voltage: V'} 
                        yLabel={'Power: W'} 
                        color={'rgba(0, 0, 255, 1)'}
                    />
                </div>

                <div className='maxValue-container'>
                    <p>Max <b>P = {result.maxP} W </b> 
                        at <b>I = {result.maxI} A </b>  
                        and <b>U = {result.maxV} V</b>
                    </p>
                </div>

                <div className='maxValue-container'>
                    <p>Max <b style={{color: "purple"}}>Efficiency = {(result.maxEff * 100).toFixed(2)} % </b></p>
                </div>

                <div className='sliders-container'>
                    <div className='slider'>
                        <h3>T (Temperature, Unit: °C)</h3>
                        <DecimalStep 
                            min={5} max={100} 
                            onChangeValue={setSlider1Value} 
                            value={slider1Value}
                            step={1}
                        />
                    </div>
                    <div className='slider'>
                        <h3>G (Solar Irradiance, Unit: W/m2)</h3>
                        <DecimalStep 
                            min={100} max={1000} 
                            onChangeValue={setSlider2Value} 
                            value={slider2Value}
                            step={10}
                        />
                    </div>
                    <div className='slider'>
                        <h3>k (Temperature Coefficient, Unit: A/K)</h3>
                        <DecimalStep 
                            min={0.0020} max={0.0050} 
                            onChangeValue={setSlider3Value} 
                            value={slider3Value}
                            step={0.0001}
                        />
                    </div>
                    <div className='slider'>
                        <h3>Ns (Number of Series Solar Cells)</h3>
                        <DecimalStep 
                            min={12} max={240} 
                            onChangeValue={setSlider4Value} 
                            value={slider4Value}
                            step={12}
                        />
                    </div>
                </div>    

            </Card>
        </div>
    );

};

export default CircuitModel;