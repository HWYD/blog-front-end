'use client'
import { Tabs } from 'antd'
import { useEffect, useState } from 'react'
import { fetchData } from '@/api'
import ArticleList from '@/app/component/ArticleList'
import './user.css'
// import { useDispatch } from "react-redux";

export default function User() {
  // const dispatch = useDispatch();
  const pageConfig = {
    page: 1,
    pagesize: 1000
  }
  const searchParams = new URLSearchParams(pageConfig)

  const [articleData, setArticleData] = useState([])
  const fetchMyArticles = async () => {
    try {
      const { rows } = await fetchData(`/self_article?${searchParams.toString()}`, {})
      setArticleData(rows)
    } catch (error) {
      console.log('error', error)
      if (error.message === 403) {
        // dispatch(setLoginStatus(false))
      }
    }
  }

  const [collectArticles, setCollectArticles] = useState([])

  const fetchCollectArticles = async () => {
    const { rows } = await fetchData(`/collect_article?${searchParams.toString()}`, {})
    setCollectArticles(rows)
  }
  useEffect(() => {
    fetchMyArticles()
  }, [])

  const items = [
    {
      key: '1',
      label: '文章',
      children: <ArticleList articleData={articleData} />
    },
    {
      key: '2',
      label: '收藏集',
      children: <ArticleList articleData={collectArticles} />
    }
  ]
  const onChange = (key) => {
    switch (key) {
      case '1':
        fetchMyArticles()
        break
      case '2':
        fetchCollectArticles()
        break
    }
  }

  return (
    <div className="max-w-[1200px] mx-auto mt-2">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  )
}
