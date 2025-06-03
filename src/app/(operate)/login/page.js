'use client'

import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { fetchData } from '@/api'
import { useAuth } from '@/store/authContext'
import '@/app/styles/bubbles.css'

function App() {
  const router = useRouter()
  const { login } = useAuth()

  const goHome = () => {
    router.push('/')
  }

  const onFinish = (values) => {
    const fetchDataFromAPI = async () => {
      try {
        const { token } = await fetchData('/login', {
          method: 'POST',
          body: values
        })
        Cookies.set('authorization', token, {
          expires: 360
        })
        login()
        router.push('/')
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }

    fetchDataFromAPI()
  }
  return (
    <div className="w-screen h-screen">
      <div className="bubbles-container">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className="login-container">
          <img src="/image/logo.png" className="w-12 mx-auto mb-6" onClick={goHome}></img>
          <Form
            name="login"
            className="w-[300px]"
            onFinish={onFinish}
          >
            <Form.Item
              name="phone"
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  message: '请输入手机号!'
                },
                {
                  pattern: /^1[2-9]\d{9}$/,
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
                  message: '请输入密码!'
                }
              ]}
            >
              <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit">
                登录
              </Button>
              <div className="mt-3 text-center">
                <span className="text-gray-600">没有账号？</span>
                <a href="/register" className="text-blue-500 hover:text-blue-400">立即注册</a>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
export default App
