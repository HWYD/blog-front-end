'use client';
import Link from 'next/link'
import { Button  } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {
    setLoginStatus,
    selectAuth,
  } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function UserProfile({loginStatus}){
    const dispatch = useDispatch();
    dispatch(setLoginStatus(loginStatus))
    const isLogin = useSelector(selectAuth);

    return (
        <>
            {
            isLogin? <Link href="/user/123"><UserOutlined/></Link>: 
            <Link href="/login"  className='mr-3'><Button>登录</Button></Link>
            }
        </>
    )
}