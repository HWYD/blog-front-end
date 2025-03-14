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
        // router.push('/login')
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
        <>
            {
            loginStatus? <Dropdown menu={{ items }} className='cursor-pointer'>
                <a onClick={(e) => e.preventDefault()}>
                    <UserOutlined/>
                </a>
            </Dropdown>: 
            <Link href="/login"  className='mr-3'><Button>登录</Button></Link>
            }
        </>
    )
}