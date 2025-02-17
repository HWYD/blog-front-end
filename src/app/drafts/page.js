'use client';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { fetchData } from '../../api';
import { useRouter } from 'next/navigation'
import React, { useState,useEffect } from 'react';

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const EditorComp = dynamic(() => import('../component/Editor'), { ssr: false })
// const markdown = `
// Hello **world**!
// `

const { TextArea } = Input;


export default function drafts(){
    const [markdown, setMarkdown] = useState('Hello **world');

    const router = useRouter()
    const onFinish = (values) =>{
        console.log(values,markdown)
        const fetchDataFromAPI = async () => {
            try {
                const data = await fetchData('/article',{
                    method: 'POST',
                    body: {
                        ...values,
                        content: markdown
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
        <div className='w-screen h-screen flex justify-center items-center'>
         <div>
         <Form
        name="drafts"
        layout="vertical"
        initialValues={{
            remember: true,
        }}
        className='w-[400px]'
        onFinish={onFinish}
        >
        <Form.Item
            name="title"
            label="文章标题"
            rules={[
            {
                required: true,
                message: 'Please input name!',
            },
            ]}
        >
            <Input placeholder="phone" />
        </Form.Item>
        <Form.Item
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
        </Form.Item>
        <Form.Item
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
        </Form.Item>
        <Form.Item
            name="content"
            label="内容"
        >
            {/* <TextArea rows={4} /> */}
            <div className='border border-slate-300 min-h-[400px] md-editor'>
                <Suspense fallback={null}>
                    <EditorComp markdown={markdown} onUpdate={setMarkdown}/>
                </Suspense>
            </div>
        </Form.Item>

        <Form.Item>
            <Button block type="primary" htmlType="submit">
             提交
            </Button>
        </Form.Item>
        </Form>
        
        </div>
    </div>
    )
}