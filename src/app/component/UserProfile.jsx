'use client';
import Link from 'next/link'
import { Button  } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import {
    setLoginStatus,
    selectAuth,
  } from "@/store/authSlice";
import { AppDispatch } from "@/store/index";
import { useDispatch, useSelector } from "react-redux";

export default function UserProfile(){
    const isLogin = useSelector(selectAuth);
    const dispatch = useDispatch();
    const handleChangeCounter = (status) => {
        dispatch(setLoginStatus(status))
      };
    return (
        <>
            {/* <div>
                <Button onClick={() => handleChangeCounter(true)}>加</Button>
                <Button onClick={() => handleChangeCounter(false)}>减</Button>
                {isLogin? '登录了':'没有登录'}
            </div> */}
            {
            isLogin? <Link href="/user/123"><UserOutlined/></Link>: 
            <Link href="/login"  className='mr-3'><Button>登录</Button></Link>
            }
        </>
    )
}