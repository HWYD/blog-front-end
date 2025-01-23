'use client';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { fetchData } from '../../api';
import { useRouter } from 'next/navigation'
import Cookies from "js-cookie"

const App = () => {
    const router = useRouter()
  const onFinish = (values) => {
    const fetchDataFromAPI = async () => {
        try {
            const { token } = await fetchData('http://10.101.64.247:3300/login',{
                method: 'POST',
                body: values
            });
            Cookies.set("authorization", token, {
                expires: 360
            })
            router.push('/')
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };


    fetchDataFromAPI();
  };
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
        <Form
        name="login"
        initialValues={{
            remember: true,
        }}
        className='w-[300px]'
        onFinish={onFinish}
        >
        <Form.Item
            name="phone"
            rules={[
            {
                required: true,
                message: 'Please input your phone!',
            },
            ]}
        >
            <Input prefix={<UserOutlined />} placeholder="phone" />
        </Form.Item>
        <Form.Item
            name="password"
            rules={[
            {
                required: true,
                message: 'Please input your Password!',
            },
            ]}
        >
            <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
            <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="">Forgot password</a>
            </Flex>
        </Form.Item>

        <Form.Item>
            <Button block type="primary" htmlType="submit">
            Log in
            </Button>
            or <a href="">Register now!</a>
        </Form.Item>
        </Form>
    </div>
  );
};
export default App;