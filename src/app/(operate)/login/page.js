'use client';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { fetchData } from '@/api';
import { useRouter } from 'next/navigation'
import Cookies from "js-cookie"
import { useAuth } from '@/store/authContext';

const App = (isModalOpen) => {
    const router = useRouter()
    const { login } = useAuth();
    const onFinish = (values) => {
    const fetchDataFromAPI = async () => {
        try {
            const { token } = await fetchData('/login',{
                method: 'POST',
                body: values
            });
            Cookies.set("authorization", token, {
                expires: 360
            })
            login()
            router.push('/')
        } catch (error) {
            toSetLoginStatus(false)
            console.error('Failed to fetch data:', error);
        }
    };


    fetchDataFromAPI();
  };
  return (
    <div className='w-screen h-screen flex justify-center items-center flex-col'>
        <img src='/image/logo.png' className="w-12"></img>
        <Form
        name="login"
        className='w-[300px] mt-6'
        onFinish={onFinish}
        >
        <Form.Item
            name="phone"
            validateTrigger="onBlur"
            rules={[
                {
                    required: true,
                    message: '请输入手机号!',
                },
                {
                    pattern: /^[1][23456789][0-9]{9}$/,
                    message: '请输入正确的手机号'
                }
            ]}
        >
            <Input prefix={<UserOutlined />} placeholder="phone" />
        </Form.Item>
        <Form.Item
            name="password"
            rules={[
                {
                    required: true,
                    message: '请输入密码!',
                }
            ]}
        >
            <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item>
            <Button block type="primary" htmlType="submit">
                登录
            </Button>
            <div className='mt-3'>
                <span className='text-gray-500'>没有账号？</span><a href="/register" className='text-blue-500'>立即注册</a>
            </div>
        </Form.Item>
        </Form>
    </div>
  );
};
export default App;