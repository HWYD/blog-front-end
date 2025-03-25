import { fetchData } from '@/api';
import ReactMarkdown from'react-markdown';
import { Tag, Button } from 'antd';
import { cookies } from 'next/headers'
import { EyeOutlined } from '@ant-design/icons';
import { convertDate } from '@/utils'
import Link from 'next/link'
import Operate from './Operate'
import CustomScript from './CustomScript';

export default async function article(context) {
    const cookieStore = cookies()
    const authorization = cookieStore.get('authorization')?.value || ''
    const articleId = context.params.id
    const params = {
        id: articleId
    };
    const queryParams = new URLSearchParams(params);
    const articleData  = await fetchData(`/article_one?${queryParams.toString()}`,{
      authorization
    })

    return (
      <div className="max-w-[1200px] mx-auto mt-4 mdxeditor-doc">
        <div className='bg-white p-5 2xl:px-8 rounded-lg'>
          <h1 className='mb-4'>{articleData.title}</h1>
          <div className='flex items-center text-sm mb-4 text-gray-500'>
            <span className='text-gray-800'>{ articleData.author }</span>
            <span className='ml-4'>{ convertDate(articleData.create_time) }</span>
            <span className='ml-4'><EyeOutlined className='mr-1'/>{ articleData.view_num }</span>
            { articleData.is_author == '1' || articleData.is_admin == '1'?  
              <Link href= {`/drafts?id=${articleId}`}><span className='ml-4 text-blue-500 cursor-pointer no-underline hover:text-blue-600'>编辑</span></Link> :''
            }
            { articleData.is_admin == '1'?  
              <Operate articleId={articleId} ></Operate> :''
            }
          </div>
          <div>
              <ReactMarkdown>
                  {articleData.content}
              </ReactMarkdown>
              {
                articleData.Tags.length? <div className='mt-10'>
                  <span className='mr-3 text-sm'>标签：</span>{ articleData.Tags.map(tagItem => (
                      <Tag key={tagItem.id}>{tagItem.name}</Tag>
                    )) }
                </div> : ''
              }
          </div>
        </div>
        <CustomScript/>
      </div>
    )
  }
  