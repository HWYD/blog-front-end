'use client';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { fetchData } from '@/api';
import { useRouter } from 'next/navigation'
import React, { useState,useEffect } from 'react';

import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import "./drafts.css";

const EditorComp = dynamic(() => import('../../component/Editor'), { ssr: false })

const { TextArea } = Input;


export default function drafts(){
    const [markdown, setMarkdown] = useState('');

    const router = useRouter()
    const onFinish = (values) =>{
        console.log(values,markdown)
        const fetchDataFromAPI = async () => {
            try {
                const data = await fetchData('/article',{
                    method: 'POST',
                    body: {
                        ...values,
                        content: markdown,
                        description: '描述',
                        cover: 'dsag',

                    }
                });
                router.push('/');
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
    
    
        fetchDataFromAPI();
    }
    return (
        <div className='flex justify-center mx-auto w-full 2xl:max-w-[1280px] px-3 box-border'>
         <Form
            name="drafts"
            layout="vertical"
            initialValues={{
                remember: true,
            }}
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
                <Button type="primary" htmlType="submit">发布</Button>
            </div>
         </Form.Item>
        {/* <Form.Item
            name="cover"
            label="封面"
            rules={[
            {
                required: true,
                message: 'Please input cover!',
            },
            ]}
        >
            <Input placeholder="cover" />
        </Form.Item> */}
        {/* <Form.Item
            name="description"
            label="简介"
            rules={[
            {
                required: true,
                message: 'Please input description!',
            },
            ]}
        >
            <Input placeholder="description" />
        </Form.Item> */}
        <Form.Item
            name="content"
            label=""
        >
            {/* <TextArea rows={4} /> */}
            <div className=' w-full min-h-[400px] max-h-[650px] overflow-auto mdxeditor-doc'>
                <Suspense fallback={null}>
                    <EditorComp markdown={markdown} onUpdate={setMarkdown}/>
                </Suspense>
            </div>
        </Form.Item>

        {/* <Form.Item>
            <Button block type="primary" htmlType="submit">
             提交
            </Button>
        </Form.Item> */}
        </Form>
        
    </div>
    )
}