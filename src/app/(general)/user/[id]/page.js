"use client";
import { Tabs } from 'antd';
import ArticleList from "@/app/component/ArticleList"
import { fetchData } from '@/api';
import { useState,useEffect } from 'react';

export default function User(context) {
  const pageConfig = {
    page: 1,
    pagesize: 1000
  }
  const searchParams = new URLSearchParams(pageConfig);

  const [articleData,setArticleData] =  useState([])
  const fetchMyArticles = async()=>{
    const { rows } = await fetchData(`/self_article?${searchParams.toString()}`,{})
    setArticleData(rows)
  }

  const [collectArticles,setCollectArticles] =  useState([])

  const fetchCollectArticles = async()=>{
    const { rows } = await fetchData(`/collect_article?${searchParams.toString()}`,{})
    setCollectArticles(rows)
  }
  useEffect(()=>{
    fetchMyArticles()
  },[])

  const items = [
    {
      key: '1',
      label: '文章',
      children: <ArticleList articleData={articleData} />,
    },
    {
      key: '2',
      label: '收藏集',
      children: <ArticleList articleData={collectArticles} />,
    }
  ];
  const onChange = (key) => {
    console.log(key)
    switch(key){
      case '1':
        fetchMyArticles()
      break;
      case '2':
        fetchCollectArticles()
      break;
    }
  };

    return (
      <div className="max-w-[1200px] mx-auto mt-4">
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    )
  }
  