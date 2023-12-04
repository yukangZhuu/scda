import React from 'react';
import { Form, InputNumber } from 'antd';

const FormItem = ({ label, name, min, max, message, unit }) => {
  const note = `Unit: ${unit}, Range: ${min}-${max}`;

  return (
    <Form.Item
      label={label}
      name={name}
      rules={[{ 
        required: true, 
        type: 'number', 
        min: min, 
        max: max, 
        message: message || `Value for ${label} must be between ${min} and ${max} ${unit}!`,
      }]}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <InputNumber style={{ flex: 1 }} />
        <span style={{ marginLeft: 16 }}>{note}</span>
      </div>
    </Form.Item>
  );
};

export default FormItem;