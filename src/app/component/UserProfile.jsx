'use client';
import Link from 'next/link'
import { Button  } from 'antd';
import { UserOutlined } from '@ant-design/icons';
// import {
//     setLoginStatus,
//     selectAuth,
//   } from "../../store/authSlice";
// import { useDispatch, useSelector } from "react-redux";
import { useAuth } from '@/store/authContext';

export default function UserProfile(){
    const { loginStatus,logout } = useAuth();
    // const dispatch = useDispatch();
    // dispatch(setLoginStatus(loginStatus))
    // const isLogin = useSelector(selectAuth);
    const toLogout = ()=>{
        logout()
    }
    return (
        <>
            {
            loginStatus? <Link href="/user/123"><UserOutlined/></Link>: 
            <Link href="/login"  className='mr-3'><Button>登录</Button></Link>
            }
            {/* <div onClick={toLogout}>退出</div> */}
        </>
    )
}