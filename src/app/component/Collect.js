"use client";
import { StarFilled,StarOutlined } from '@ant-design/icons';
import { fetchData } from '@/api';
import { useState } from 'react';


const Collect = ({ data }) => {
    const [articleItem,setArticleItem] = useState(data)

    const handleCollect = async(e)=>{
        e.stopPropagation();
        e.preventDefault();
        console.log('collect',data,e)
        try {
            const status = articleItem.is_collected == 1? 0 :1
            const ret = await fetchData('/collection',{
                method: 'POST',
                body: {
                    article_id: articleItem.id,
                    status
                }
            });
            setArticleItem({
                ...articleItem,
                is_collected: status,
                collect_num: status? articleItem.collect_num + 1 : articleItem.collect_num - 1
            })
            console.log('操作成功',data)
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    return (
        <div className="px-3 py-1 inline-block" onClick={handleCollect}>
            { articleItem.is_collected == 1? <StarFilled className='text-blue-600'/>: <StarOutlined className='hover:text-blue-600'/>} { articleItem.collect_num }
        </div>
    );
  };
  
  export default Collect;