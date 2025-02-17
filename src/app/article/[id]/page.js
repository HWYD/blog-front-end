import { fetchData } from '@/api';
import ReactMarkdown from'react-markdown';

export default async function article() {

    const params = {
        id: '14'
    };
    const searchParams = new URLSearchParams(params);
    const articleData  = await fetchData(`/article_one?${searchParams.toString()}`)

  console.log('想去23',articleData)

    return (
      <div className="max-w-[1200px] mx-auto mt-4">
        <div>{articleData.title}</div>
        <div>
            <ReactMarkdown>
                {articleData.content}
            </ReactMarkdown>
        </div>
      </div>
    )
  }
  