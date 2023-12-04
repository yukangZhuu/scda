import React from 'react';
import { Col, InputNumber, Row, Slider } from 'antd';

const DecimalStep = ({ min, max, value, onChangeValue, step }) => {
    const onChange = (value) => {
        if (isNaN(value)) {
            return;
        }
        onChangeValue(value);
    };

    return (
        <Row>
            <Col span={17} style={{ width: 450 }}>
                <Slider
                    min={min}
                    max={max}
                    onChange={onChange}
                    value={value}
                    step={step}
                />
            </Col>
            <Col span={4} style={{ width: 0 }}>
                <InputNumber
                    min={min}
                    max={max}
                    style={{
                        margin: '0 16px',
                    }}
                    value={value}
                    step={step}
                    onChange={onChange}
                />
            </Col>
        </Row>
    );
};

export default DecimalStep;