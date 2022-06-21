import React from 'react'
import 'antd/dist/antd.css';
import { Input, Select, Form, message, Checkbox, Button } from 'antd';
import { useState } from 'react';
import axios from 'axios'

function User() {
  const [checked, setChecked] = useState('null')

  const { Option } = Select;
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="375">+375</Option>
      </Select>
    </Form.Item>
  );

  const plainOptions = ['telegram', 'viber', 'whatsapp'];

  async function handleFinish(values) {
    console.log(values)
    console.log(values.email)
    const login = values.email
    const password = values.password
    try {
      const res = await axios.post('https://typ-back-end.herokuapp.com/api/login', { 'login': login, 'password': password })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div labelCol={{ span: 10 }} >
      <Form autoComplete='off' onFinish={handleFinish}>
        <Form.Item name='firstName' label='First Name'
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}>
          <Input placeholder='Type your name' name='username' />
        </Form.Item>

        <Form.Item name='secondName' label='Second Name'
          rules={[{ required: true, message: 'Please input your secondname!' }]} >
          <Input />
        </Form.Item>

        <Form.Item name='password' label='Password' rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
          hasFeedback >
          <Input.Password />
        </Form.Item>

        <Form.Item name='email' label='Email' rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}>
          <Input />
        </Form.Item>

        <Form.Item name='gender' label='Gender' rules={[
          {
            required: true,
            message: 'Please select your gender!',
          },
        ]} >
          <Select style={{ width: '50%' }} >
            <Select.Option value='male'>Male</Select.Option>
            <Select.Option value='female'>Female</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name='checked' label='isAdmin' valuePropName='checked' rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('isAdmin')),
          },

        ]} >
          <Checkbox />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: 'Please input your phone number!',
            },
          ]}
        >
          <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
        </Form.Item>

        <ul>
          {plainOptions.map(item => (
            <li key={item}>
              <label>
                <input type='radio' name='checked' checked={checked === item} onChange={() => setChecked(item)} />
                {item}
              </label>
            </li>
          ))}
        </ul>

        <Form.Item >
          <Button className='sub' type="primary" htmlType="submit" >
            Register
          </Button>
        </Form.Item>


      </Form>
    </div>
  )
}

export default User