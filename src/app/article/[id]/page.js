import { fetchData } from '@/api';
import ReactMarkdown from'react-markdown';
import { cookies } from 'next/headers'

export default async function article(context) {

    const cookieStore = cookies()
    const authorization = cookieStore.get('authorization').value || ''
    const params = {
        id: context.params.id
    };
    const searchParams = new URLSearchParams(params);
    const articleData  = await fetchData(`/article_one?${searchParams.toString()}`,{
      authorization
    })

  console.log('想去23',articleData)

    return (
      <div className="max-w-[1200px] mx-auto mt-4 hz-article">
        <div className='bg-white p-5'>
          <h1 className='mb-4'>{articleData.title}</h1>
          <div className='flex items-center text-sm mb-4'>
            <span className='text-gray-800'>{ articleData.author }</span>
            <span className='ml-2 text-gray-600'>{ articleData.create_time}</span>
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
  