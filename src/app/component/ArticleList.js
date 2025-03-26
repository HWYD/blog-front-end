import { Card, Tag } from 'antd';
import { EyeOutlined, StarFilled, StarOutlined } from '@ant-design/icons';
import Collect from '@/app/component/Collect'
import Link from 'next/link'
import ClientEmpty from './ClientEmpty';
import { formatCount } from '@/utils'


const ArticleList = ({ articleData }) => {
  const articleListDom = articleData.map(item => (
    <Link href={`/article/${item.id}`} key={item.id}>
      <div className='mt-3 cursor-pointer bg-white hover:bg-gray-50 pb-12 lg:pb-5 p-4 lg:p-5 lg:rounded-lg'>
        <div className="lg:hidden font-bold text-base">{item.title}</div>
        <div className='flex justify-between'>
          <div className='relative'>
            <div className="hidden lg:block font-bold text-base">{item.title}</div>
            <div className="mt-2 text-[13px] lg:text-sm text-zinc-600 line-clamp-3">{item.description}</div>
            <div className="absolute bottom-[-35px] lg:relative lg:bottom-0 flex items-center w-full mt-2 text-xs whitespace-nowrap">
              <div className="mr-3 lg:mr-4 lg:pr-4 lg:border-r border-zinc-300">{item.author}</div>
              <span className="mr-3 lg:mr-4"><EyeOutlined /> {formatCount(item.view_num)} </span>
              <Collect data={item} />
              {item.Tags.map(tagItem => (
                <Tag key={tagItem.id}>{tagItem.name}</Tag>
              ))}
            </div>
          </div>
          {item.cover ? <img src={process.env.NEXT_PUBLIC_API_URL + item.cover} className='max-w-28 min-h-16 lg:max-w-40 max-h-24 rounded-md ml-2 lg:ml-5' /> : ''}
        </div>
      </div>
    </Link>
  ))

  return (
    <div>
      {articleData.length ? articleListDom : <ClientEmpty />}
    </div>
  );
};

export default ArticleList;