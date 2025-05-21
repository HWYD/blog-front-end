'use client';

import { Button, Checkbox, Form, Input, Flex, message  } from 'antd';
import { LockOutlined, UserOutlined, PhoneOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation'
import { fetchData } from '@/api';
import '@/app/styles/bubbles.css';

export default function Register() {
  const router = useRouter()
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = (values) => {
    const fetchDataFromAPI = async () => {
        try {
            await fetchData('/register',{
                method: 'POST',
                body: values
            });
            messageApi.open({
              type: 'success',
              content: '注册成功',
            });
            setTimeout(()=>{
                router.push('/login')
            },1000)
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    fetchDataFromAPI();
  };
  return (
    <div className='w-screen h-screen'>
      <div className="bubbles-container">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>
      <div className='w-screen h-screen flex justify-center items-center'>
        {contextHolder}
        <div className='login-container'>
          <Form
            name="register"
            layout="vertical"
            className='w-[300px]'
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              label="用户昵称"
              rules={[
              {
                  required: true,
                  message: '请输入昵称!',
              },
              ]}
            >
                <Input prefix={<UserOutlined />} placeholder="name" />
            </Form.Item>
            <Form.Item
                name="phone"
                label="手机号"
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
                <Input prefix={<PhoneOutlined />} placeholder="phone" />
            </Form.Item>
            <Form.Item
                name="password"
                label="密码"
                rules={[
                {
                    required: true,
                    message: '请输入密码!',
                },
                ]}
            >
                <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
            </Form.Item>

            <Form.Item>
                <Button block type="primary" htmlType="submit">
                    立即注册
                </Button>
                <div className='mt-3 text-center'>
                    <span className='text-gray-600'>已有账号？</span><a href="/login" className='text-blue-500 hover:text-blue-400'>立即登录</a>
                </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
