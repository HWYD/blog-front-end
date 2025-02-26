import { Button  } from 'antd';
import Link from 'next/link'
import { UserOutlined } from '@ant-design/icons';
import { cookies } from 'next/headers'
// import { useSelector, useDispatch } from 'react-redux';
// import { login, logout } from '@/store/authSlice';
import UserProfile from './UserProfile'

export default function Header(){
    // const isLogin = useSelector((state) => state.auth.isLogin);
    // const dispatch = useDispatch();
    const cookieStore = cookies()
    const authorization = cookieStore.get('authorization')?.value || ''
    return (
        <>
        {/* <Provider store={store}> */}
            <header className="py-2 bg-white">
                <div className="flex justify-between items-center mx-auto w-full 2xl:max-w-[1280px] px-2 box-border">
                        <Link href="/"><img src='/image/logo.png' className="w-12"></img></Link>
                    <div>
                        <Link href="/drafts"><Button type="primary" className='mr-3'>创作</Button></Link>
                        {/* {
                            authorization? <Link href="/user/123"><UserOutlined/></Link>: 
                            <Link href="/login"  className='mr-3'><Button>登录</Button></Link>
                            } */}
                            <UserProfile/>
                    </div>
                </div>
            </header>
        {/* </Provider> */}
        </>
    )
}