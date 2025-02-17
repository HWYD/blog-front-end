"use client";
import ArticleList from "@/app/component/ArticleList"
import { fetchData } from '@/api';


export default async function User() {

  const pageConfig = {
    page: 1,
    pagesize: 10
  }

  const { rows: articleData, count } = await fetchData('/self_article',{
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
  