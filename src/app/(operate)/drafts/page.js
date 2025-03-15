'use client';
import { Button, Checkbox, Form, Input, Flex,Modal,message  } from 'antd';
import { fetchData } from '@/api';
import { useRouter } from 'next/navigation'
import React, { useState,useEffect,useRef } from 'react';
import PublishForm from './PublishForm'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Link from 'next/link'
import "./drafts.css";

const EditorComp = dynamic(() => import('../../component/Editor'), { ssr: false })

const { TextArea } = Input;


export default function drafts(context){
    console.log('context1',context)
    const articleId = context.searchParams.id
    const [markdown, setMarkdown] = useState('');
    const getArticleData = async()=>{
        const params = {
            id: articleId
        };
        const queryParams = new URLSearchParams(params);
        const articleData = await fetchData(`/article_one?${queryParams.toString()}`,{})
        setTimeout(setMarkdown(articleData.content))
        console.log('articleData.content',articleData.content)
    }
    useEffect(()=>{
        if(articleId){
            getArticleData()
        }
    },[])
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const onFinish = () =>{
        console.log('onFinish-markdown',markdown)
        if(!markdown){
            messageApi.info('文章内容不能为空!');
            return
        }
        setOpen(true);
    }
    const [open, setOpen] = useState(false);

    const onPublish = async(options)=>{
        const fetchDataFromAPI = async () => {
            try {
                console.log('markdown',markdown)
                const data = await fetchData('/article',{
                    method: 'POST',
                    body: {
                        ...form.getFieldValue(),
                        ...options,
                        content: markdown
                    }
                });
                messageApi.success('发布成功！');
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
    
        await fetchDataFromAPI();
    }

    const inputRef = useRef(null);
    // useEffect(()=>{
    //     inputRef.current.focus({
    //         cursor: 'start',
    //       });
    // },[])
    
    return (
        <div className='flex justify-center mx-auto w-full 2xl:max-w-[1280px] px-3 box-border'>
            {contextHolder}
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
                <Input placeholder="输入文章标题..." variant="borderless"  size="large" className='text-xl font-bold' ref={inputRef}/>
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