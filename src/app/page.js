import Image from "next/image";
import { Card,Tag  } from 'antd';
import { fetchData } from '../api';
import { EyeOutlined, StarFilled,StarOutlined } from '@ant-design/icons';

export default async function Home() {
  const { rows: bookData, count } = await fetchData('http://10.101.64.247:3300/book',{
    query: {
      page: 1,
      pagesize: 10
    }
  })

  const bookList = bookData.map(item => (
    <Card className="max-w-[1200px] mx-auto mt-3 cursor-pointer hover:bg-gray-100" key={item.id}>
      <div className="font-bold text-base">{item.name}</div>
      <div className="mt-2 text-sm text-zinc-600">{ item.description }</div>
      <div className="mt-2 text-xs">
        <span className="mr-3">{ item.author }</span>
        {/* {item.create_time} */}
        <span className="mr-3"><EyeOutlined /> 13k</span>
          <span className="mr-3">{ item.is_collected == 1? <StarFilled />: <StarOutlined />} 199</span>
         { item.Tags.map(tagItem => (
          <Tag key={item.id}>{tagItem.name}</Tag>
         )) }
        </div>
    </Card>
  ))

  return (
    <>
      {bookList}
      </>
  );
}
