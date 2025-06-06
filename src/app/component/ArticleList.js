import { EyeOutlined } from '@ant-design/icons'
import Link from 'next/link'
import Collect from '@/app/component/Collect'
import { formatCount } from '@/utils'
import ClientEmpty from './ClientEmpty'

function ArticleList({ articleData }) {
  const articleListDom = articleData.map(item => (
    <Link href={`/article/${item.id}`} key={item.id}>
      <div className="mt-3 cursor-pointer bg-white hover:bg-gray-50 pb-12 lg:pb-5 p-4 lg:p-5 lg:rounded-lg">
        <div className="lg:hidden font-bold text-base">{item.title}</div>
        <div className="flex justify-between">
          <div className="relative">
            <div className="hidden lg:block font-bold text-base">{item.title}</div>
            <div className="mt-2 text-[13px] lg:text-sm text-zinc-600 line-clamp-3">{item.description}</div>
            <div className="absolute bottom-[-35px] lg:relative lg:bottom-0 flex items-center w-full mt-2 text-xs whitespace-nowrap">
              <div className="mr-3 lg:mr-4 lg:pr-4 lg:border-r border-zinc-300">{item.author}</div>
              <div className="flex items-center mr-3 lg:mr-4">
                <EyeOutlined />
                <span className="ml-1">
                  {formatCount(item.view_num)}
                  {' '}
                </span>
              </div>
              <Collect data={item} />
              {item.Tags.map(tagItem => (
                <span
                  key={tagItem.id}
                  className="inline-block text-xs mr-2 text-nowrap border border-[#d9d9d9] rounded-md leading-[20px] px-[7px] bg-neutral-50"
                >
                  {tagItem.name}
                </span>
                // <Tag key={tagItem.id}>{tagItem.name}</Tag>
              ))}
            </div>
          </div>
          {item.cover ? <img src={process.env.NEXT_PUBLIC_API_URL + item.cover} className="max-w-28 min-h-16 lg:max-w-40 max-h-24 rounded-md ml-2 lg:ml-5" /> : ''}
        </div>
      </div>
    </Link>
  ))

  return (
    <div>
      {articleData.length ? articleListDom : <ClientEmpty />}
    </div>
  )
}

export default ArticleList
