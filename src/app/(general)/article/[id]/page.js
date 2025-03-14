import { fetchData } from '@/api';
import ReactMarkdown from'react-markdown';
import { cookies } from 'next/headers'
import { EyeOutlined } from '@ant-design/icons';
import { convertDate } from '@/utils'

export default async function article(context) {

    const cookieStore = cookies()
    const authorization = cookieStore.get('authorization')?.value || ''
    const params = {
        id: context.params.id
    };
    const queryParams = new URLSearchParams(params);
    const articleData  = await fetchData(`/article_one?${queryParams.toString()}`,{
      authorization
    })

    return (
      <div className="max-w-[1200px] mx-auto mt-4 mdxeditor-doc">
        <div className='bg-white p-5 2xl:px-8'>
          <h1 className='mb-4'>{articleData.title}</h1>
          <div className='flex items-center text-sm mb-4 text-gray-500'>
            <span className='text-gray-800'>{ articleData.author }</span>
            <span className='ml-4'>{ convertDate(articleData.create_time) }</span>
            <span className='ml-4'><EyeOutlined className='mr-1'/>{ articleData.view_num }</span>
          </div>
          <div>
              <ReactMarkdown>
                  {articleData.content}
              </ReactMarkdown>
          </div>
        </div>
      </div>
    )
  }
  