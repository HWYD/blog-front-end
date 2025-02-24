// "use client";
import ArticleList from "@/app/component/ArticleList"
import { fetchData } from '@/api';
import { cookies } from 'next/headers'

// import { useEffect } from 'react';

export default async function User(context) {
  const pageConfig = {
    page: 1,
    pagesize: 10
  }
  const cookieStore = cookies()
  const authorization = cookieStore.get('authorization').value || ''
  const searchParams = new URLSearchParams(pageConfig);
  const { rows: articleData } = await fetchData(`/self_article?${searchParams.toString()}`,{ authorization })
  console.log('articleData',articleData)

    return (
      <div className="max-w-[1200px] mx-auto mt-4">
          文章
          <ArticleList articleData={articleData} />
      </div>
    )
  }
  