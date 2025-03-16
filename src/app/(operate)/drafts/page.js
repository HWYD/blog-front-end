'use client';
import { Button, Form, Input, message  } from 'antd';
import { fetchData } from '@/api';
import { useRouter } from 'next/navigation'
import React, { useState,useEffect } from 'react';
import PublishForm from './PublishForm'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Link from 'next/link'

const EditorComp = dynamic(() => import('../../component/Editor'), { ssr: false })


export default function drafts(context){
    // console.log('context1',context)
    const articleId = context.searchParams.id
    const [content, setContent] = useState('');
    const [form] = Form.useForm();
    const getArticleData = async()=>{
        const params = {
            id: articleId
        };
        const queryParams = new URLSearchParams(params);
        const articleData = await fetchData(`/article_one?${queryParams.toString()}`,{})
        setTimeout(()=>{{
            setContent(articleData.content)
        }},500)
        // console.log('articleData.content',articleData.content)
    }
    useEffect(()=>{
        if(articleId){
            getArticleData()
            form.setFieldValue('title','123' );
        }
    },[])
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish = () =>{
        // console.log('onFinish-markdown',content)
        if(!content){
            messageApi.info('文章内容不能为空!');
            return
        }
        setOpen(true);
    }
    const [open, setOpen] = useState(false);
    const onPublish = async(options)=>{
        const fetchDataFromAPI = async () => {
            try {
                // console.log('markcontentdown',content)
                const data = await fetchData('/article',{
                    method: 'POST',
                    body: {
                        ...form.getFieldValue(),
                        ...options,
                        content
                    }
                });
                messageApi.success('发布成功！');
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
    
        await fetchDataFromAPI();
    }

    return (
        <div className="w-screen h-screen bg-white">
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
                        <Input placeholder="输入文章标题..." variant="borderless"  size="large" className='text-xl font-bold'/>
                        <div className='flex'>
                            <Link href="/"><Button>返回</Button></Link>
                            <Button type="primary" htmlType="submit" className='ml-2'>{articleId? '更新': '发布' }</Button>
                        </div>
                    </div>
                </Form.Item>
                <Form.Item
                    name="content"
                    label=""
                >
                    <div className=' w-full min-h-[400px] max-h-[650px] overflow-auto mdxeditor-doc'>
                        <Suspense fallback={null}>
                            <EditorComp content={content} onUpdate={setContent}/>
                        </Suspense>
                    </div>
                </Form.Item>
                </Form>
                <PublishForm open={open} setOpen={setOpen} onPublish={onPublish} />
            </div>
        </div>
    )
}