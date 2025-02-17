import { Button  } from 'antd';
import Link from 'next/link'
import { UserOutlined } from '@ant-design/icons';
// import { useSelector, useDispatch } from 'react-redux';
// import { login, logout } from '@/store/authSlice';

export default function Header(){
    // const isLogin = useSelector((state) => state.auth.isLogin);
    // const dispatch = useDispatch();
    return (
        <>
        {/* <Provider store={store}> */}
            <header className="py-2 bg-white">
                <div className="flex justify-between items-center max-w-[1280px] mx-auto">
                        <Link href="/"><img src='/image/logo.png' className="w-12"></img></Link>
                    <div>
                        <Link href="/drafts"><Button type="primary" className='mr-3'>创作</Button></Link>
                        <Link href="/login"  className='mr-3'><Button>登录</Button></Link>
                        <Link href="/user/123"><UserOutlined/></Link>
                    </div>
                </div>
            </header>
        {/* </Provider> */}
        </>
    )
}