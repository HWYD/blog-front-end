'use client';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { fetchData } from '../../api';
import { useRouter } from 'next/navigation'

const { TextArea } = Input;

// console.log('useNavigate:', useRouter); 
export default function drafts(){
    const router = useRouter()
    const onFinish = (values) =>{
        console.log(values)
        const fetchDataFromAPI = async () => {
            try {
                const data = await fetchData('/article',{
                    method: 'POST',
                    body: values
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
            rules={[
            {
                required: true,
                message: 'Please input content!',
            },
            ]}
        >
            <TextArea rows={4} />
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