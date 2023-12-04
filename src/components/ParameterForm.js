import React from 'react';
import { Card, Button, Checkbox, Form, Input, InputNumber } from 'antd';
import '../style/ParameterForm.css';
import FormItem from './FormItem';

const onFinish = (values) => {
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const ParameterForm = () => {

    return (
        <div className='parameterForm'>
                <Card hoverable style={{width: 800}} bodyStyle={{ padding: 0 }}>
                    <div className='form-container'>
                        <Form
                            name="basic"
                            labelCol={{span: 8,}}
                            wrapperCol={{span: 16,}}
                            style={{maxWidth: 500,}}
                            initialValues={{remember: true,}}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >

                            <FormItem label="Item1" name="item1" min={0} max={100} unit="kg" />
                            <FormItem label="Item2" name="item2" min={0} max={100} unit="kg" />
                            <FormItem label="Item3" name="item3" min={0} max={100} unit="kg" />
                            <FormItem label="Item4" name="item4" min={0} max={100} unit="kg" />
                            <FormItem label="Item5" name="item5" min={0} max={100} unit="kg" />
                            <FormItem label="Item6" name="item6" min={0} max={100} unit="kg" />

                            <Form.Item wrapperCol={{offset: 8, span: 16,}}>
                                <Button type="primary" htmlType="submit">Submit</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Card>
        </div>
    );

};

export default ParameterForm;