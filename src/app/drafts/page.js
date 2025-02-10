'use client';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { fetchData } from '../../api';


export default function drafts(){
    const onFinish = (values) =>{
        console.log(values)
        const fetchDataFromAPI = async () => {
            try {
                const data = await fetchData('/book',{
                    method: 'POST',
                    body: values
                });
                router.push('/')
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
    
    
        fetchDataFromAPI();
    }
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
        <Form
        name="drafts"
        layout="vertical"
        initialValues={{
            remember: true,
        }}
        className='w-[300px]'
        onFinish={onFinish}
        >
        <Form.Item
            name="name"
            label="书籍名称"
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
            name="author"
            label="作者"
            rules={[
            {
                required: true,
                message: 'Please input author!',
            },
            ]}
        >
            <Input placeholder="author" />
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
            name="price"
            label="价格"
            rules={[
            {
                required: true,
                message: 'Please input price!',
            },
            ]}
        >
            <Input placeholder="price" />
        </Form.Item>

        <Form.Item>
            <Button block type="primary" htmlType="submit">
             提交
            </Button>
        </Form.Item>
        </Form>
    </div>
    )
}