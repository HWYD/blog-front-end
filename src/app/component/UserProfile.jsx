'use client';
import Link from 'next/link'
import { Button, Dropdown  } from 'antd';
import { UserOutlined, SmileOutlined } from '@ant-design/icons';
import { useAuth } from '@/store/authContext';
import { useRouter } from 'next/navigation'

export default function UserProfile(){
    const router = useRouter()
    const { loginStatus,logout } = useAuth();
    const toLogout = ()=>{
        logout()
    }
    const goDrafts = ()=>{
      router.push(loginStatus?'/drafts': '/login')
    }
    const items = [
        {
          key: '1',
          label: (
            <a href="/user">
              我的主页
            </a>
          ),
        },
        {
          key: '2',
          label: (
            <div onClick={toLogout}>
              退出
            </div>
          )
        }
    ]
    return (
        <div className='flex items-center'>
            <Button type="primary" className='mr-3' onClick={goDrafts}>创作</Button>
            {
            loginStatus? <Dropdown menu={{ items }} placement="bottomRight" className='cursor-pointer'>
                <a onClick={(e) => e.preventDefault()}>
                    <UserOutlined/>
                </a>
            </Dropdown>: 
            <Link href="/login"  className='mr-3'><Button>登录</Button></Link>
            }
        </div>
    )
}