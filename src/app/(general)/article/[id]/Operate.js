'use client';
import React from 'react';
import { Button, message, Popconfirm } from 'antd';
import { fetchData } from '@/api';
import { useRouter } from 'next/navigation'


const Operate = ({articleId}) => {
    const router = useRouter()
    const confirm = async() => {
        const params = {
            id: articleId
        };
        const queryParams = new URLSearchParams(params);
        await fetchData(`/article?${queryParams.toString()}`,{
            method: 'DELETE',
        })
      message.success('删除成功');
      setTimeout(()=>{
        window.open('/','_self')
      },2000)
    };
  return (<Popconfirm
            title="删除提示"
            description="确定删除该篇文章吗?"
            onConfirm={confirm}
            okText="确定"
            cancelText="取消"
        >
            <Button size="small" danger type="text" className='ml-4'>删除</Button>
        </Popconfirm>)
}
export default Operate;