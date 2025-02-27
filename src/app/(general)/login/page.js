'use client';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { fetchData } from '@/api';
import { useRouter } from 'next/navigation'
import Cookies from "js-cookie"
import {
    setLoginStatus,
    selectAuth,
  } from "@/store/authSlice";
import { AppDispatch } from "@/store/index";
import { useDispatch, useSelector } from "react-redux";

const App = (isModalOpen) => {
    const router = useRouter()
    // const isLogin = useSelector(selectAuth);
    const dispatch = useDispatch();
    const toSetLoginStatus = (status) => {
        dispatch(setLoginStatus(status))
      };
    const onFinish = (values) => {
    const fetchDataFromAPI = async () => {
        console.log(process.env.NEXT_PUBLIC_API_URL)
        try {
            const { token } = await fetchData('/login',{
                method: 'POST',
                body: values
            });
            Cookies.set("authorization", token, {
                expires: 360
            })
            toSetLoginStatus(true)
            router.push('/')
        } catch (error) {
            toSetLoginStatus(false)
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