// "use client";
import ArticleList from "@/app/component/ArticleList"
import { fetchData } from '@/api';
// import { useEffect } from 'react';

export default async function User(context) {
  console.log('context1',context)
  const pageConfig = {
    page: 1,
    pagesize: 10
  }

  const { rows: articleData } = await fetchData('/self_article',{
    query: {
      ...pageConfig
    }
  })

    return (
      <div className="max-w-[1200px] mx-auto mt-4">
          文章
          <ArticleList articleData={articleData} />
      </div>
    )
  }
  