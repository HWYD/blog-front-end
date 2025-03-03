'use client';
import { Button, Checkbox, Form, Input, Flex,Modal  } from 'antd';
import { fetchData } from '@/api';
import { useRouter } from 'next/navigation'
import React, { useState,useEffect } from 'react';
import PublishForm from './PublishForm'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Link from 'next/link'
import "./drafts.css";

const EditorComp = dynamic(() => import('../../component/Editor'), { ssr: false })

const { TextArea } = Input;


export default function drafts(){
    const router = useRouter()
    const [markdown, setMarkdown] = useState('');
    const [form] = Form.useForm();
    const onFinish = () =>{
        setOpen(true);
    }
    const [open, setOpen] = useState(false);

    const onPublish = async(options)=>{
        const fetchDataFromAPI = async () => {
            try {
                const data = await fetchData('/article',{
                    method: 'POST',
                    body: {
                        ...form.getFieldValue(),
                        ...options
                    }
                });
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
    
        await fetchDataFromAPI();
    }
    
    return (
        <div className='flex justify-center mx-auto w-full 2xl:max-w-[1280px] px-3 box-border'>
         <Form
            form={form}
            name="drafts"
            layout="vertical"
            className='mt-5 w-full h-full'
            onFinish={onFinish}
            >
            <Form.Item
                name="title"
                label=""
                rules={[
                {
                    required: true,
                    message: '请输入文章标题!',
                },
                ]}
            >
            <div className='flex justify-between items-center'>
                <Input placeholder="输入文章标题..." variant="borderless"  size="large" className='text-xl font-bold'/>
                <div className='flex'>
                    <Link href="/"><Button>返回</Button></Link>
                    <Button type="primary" htmlType="submit" className='ml-2'>发布</Button>
                </div>
            </div>
         </Form.Item>
        <Form.Item
            name="content"
            label=""
        >
            <div className=' w-full min-h-[400px] max-h-[650px] overflow-auto mdxeditor-doc'>
                <Suspense fallback={null}>
                    <EditorComp markdown={markdown} onUpdate={setMarkdown}/>
                </Suspense>
            </div>
        </Form.Item>
        </Form>
        <PublishForm open={open} setOpen={setOpen} onPublish={onPublish}/>
    </div>
    )
}