import { Card,Tag   } from 'antd';
import { EyeOutlined, StarFilled,StarOutlined } from '@ant-design/icons';
import Collect from '@/app/component/Collect'
import Link from 'next/link'


const ArticleList = ({ articleData }) => {
    console.log('articleData',articleData)
  
    const articleListDom = articleData.map(item => (
        <Link href={`/article/${item.id}`}  key={item.id}>
          <Card className="mt-3 cursor-pointer hover:bg-gray-100">
            <div className="font-bold text-base">{item.title}</div>
            <div className="mt-2 text-sm text-zinc-600 line-clamp-3">{ item.description }</div>
            <div className="mt-2 text-xs">
              <span className="mr-3">{ item.author }</span>
              <span className="mr-3"><EyeOutlined /> { item.view_num }</span>
                {/* <span className="mr-3">
                  { item.is_collected == 1? <StarFilled />: <StarOutlined />} { item.collect_num }
                </span> */}
                <Collect data={item}/>
              { item.Tags.map(tagItem => (
                <Tag key={tagItem.id}>{tagItem.name}</Tag>
              )) }
              </div>
          </Card>
        </Link>
      ))

    return (
        <div>{articleListDom}</div>
    );
  };
  
  export default ArticleList;