'use client';
import React, { useState,useEffect,useRef } from 'react';
import { Modal,Form,Input,Upload,Select  } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { fetchData } from '@/api';

const { TextArea } = Input;

export default function PublishForm ({open,setOpen,onPublish,articleData }){
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const initialArticleData = useRef(articleData)

    useEffect(()=>{
      if(articleData){
        initialArticleData.current = articleData
        console.log('get',initialArticleData.current)
        form.setFieldValue('description',initialArticleData.current.description)
        form.setFieldValue('tags',initialArticleData.current.tags.map(item=>item.id))
        // form.setFieldsValue({
        //   cover: [],
        //   description: initialArticleData.description,
        //   tags: initialArticleData.tags
        // })
        
        setImageUrl(initialArticleData.current.cover)
      }
    },[articleData])
    const handleOk = async() => {
        setConfirmLoading(true);
        const options ={
            ...form.getFieldValue(),
            cover: imageUrl
        }
        console.log('options',options,form.getFieldValue())
        await onPublish(options)
        setOpen(false);
        setConfirmLoading(false);
      };
      const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
      };

      const [imageUrl, setImageUrl] = useState();
      const [loading, setLoading] = useState(false);
      const [fileList, setFileList] = useState([]);
      const handleChange = (info) => {
        // console.log('info',info)
        // 过滤掉已删除的文件
        const filteredList = info.fileList.filter(f => f.status !== 'removed');
        if (info.file.status === 'uploading') {
          setLoading(true);
          // return;
        }
        if (info.file.status === 'done') {
            setLoading(false);
            setImageUrl(`${info.file.response.url}`)
        }
        setFileList(filteredList);
      };

      const [tagData,setTagData] = useState([])
      useEffect(()=>{
        fetchData(`/tag`,{}).then((ret)=>{
            console.log('ttt',ret,process.env.NEXT_PUBLIC_API_URL)
            const formatD = ret.map(item =>({
                label: item.name,
                value: item.id
            }))
            setTagData(formatD)
        })
      },[])
      const uploadButton = (
        <button
          style={{
            border: 0,
            background: 'none',
          }}
          type="button"
        >
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
        </button>
      );

      const normFile = (e) => {
        if (Array.isArray(e)) {
          return e;
        }
        return e?.fileList;
      };
    return(
        <Modal
            title="发布文章"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
        >
           <Form
                form={form}
                name="publish"
                layout="vertical"
                initialValues={{
                    cover: [],
                    description: '',
                    tags: [],
                }}
                className='mt-5 w-full h-full'
                >
                <Form.Item
                    name="cover"
                    label="文章封面"
                    getValueFromEvent={normFile}
                    // getValueFromEvent={(e) => {
                    //     console.log('getValueFromEvent',e,Array.isArray(e),e && e.fileList,96)
                    //     if (Array.isArray(e)) {
                    //       return e;
                    //     }
                    //     return e && e.fileList;
                    //   }}
                    //   normalize={(value) => {
                    //     return value || [];
                    //   }}
                    rules={[
                    {
                        required: true,
                        message: '请上传封面!',
                    },
                    ]}
                >
                    <Upload
                        name="image"
                        fileList={fileList}
                        listType="picture-card"
                        maxCount={1}
                        showUploadList={false}
                        crossOrigin="anonymous"
                        action={`${process.env.NEXT_PUBLIC_API_URL}/upload`}
                        onChange={handleChange}
                    >
                        {imageUrl ? (
                            <img
                                src={process.env.NEXT_PUBLIC_API_URL + imageUrl}
                                alt="cover"
                                style={{
                                width: '100%',
                                }}
                            />
                            ) : (
                            uploadButton
                            )}
                    </Upload>
                </Form.Item>
                <Form.Item
                    name="description"
                    label="编辑摘要"
                    rules={[
                    {
                        required: true,
                        message: '请输入摘要!',
                    },
                    ]}
                >
                    <TextArea rows={4} placeholder="请输入摘要" maxLength={300} />
                </Form.Item>
                <Form.Item
                    name="tags"
                    label="请添加标签"
                    rules={[
                    {
                        required: true,
                        message: '请添加标签!',
                    },
                    ]}
                >
                    <Select
                        mode="multiple"
                        options={tagData}
                        />
                </Form.Item>
            </Form>
        </Modal>
    )
}