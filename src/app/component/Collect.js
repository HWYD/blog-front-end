"use client";
import { StarFilled,StarOutlined } from '@ant-design/icons';
import { fetchData } from '@/api';
import { useState } from 'react';


const Collect = ({ data }) => {
    const [articleItem,setArticleItem] = useState(data)

    const handleCollect = async(e)=>{
        e.stopPropagation();
        e.preventDefault();
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
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    return (
        <div className="mr-3 lg:mr-4 py-1 inline-block hover:text-blue-600" onClick={handleCollect}>
            { articleItem.is_collected == 1? <StarFilled className='text-blue-600'/>: <StarOutlined />} { articleItem.collect_num }
        </div>
    );
  };
  
  export default Collect;