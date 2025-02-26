import Image from "next/image";
import { Card,Tag   } from 'antd';
import { fetchData } from '../api';
import { EyeOutlined, StarFilled,StarOutlined } from '@ant-design/icons';

import { cookies } from 'next/headers'

import ArticleList from "./component/ArticleList";
import Pagination from "./component/Pagination";

// import { getSession } from "next-auth/react";

export default async function Home(context) {
  const { searchParams } = context
  const cookieStore = cookies()
  const authorization = cookieStore.get('authorization')?.value || ''
  // const session = await getSession()
  // console.log('session',session)
  const pageConfig = {
    page: searchParams.page || 1,
    pagesize: searchParams.pageSize|| 10,
    authorization
  }
  const queryParams = new URLSearchParams(pageConfig);
  const { rows: articleData, count } = await fetchData(`/article?${queryParams.toString()}`,{
  })


  // const articleList = articleData.map(item => (
  //   <Card className="mt-3 cursor-pointer hover:bg-gray-100" key={item.id}>
  //     <div className="font-bold text-base">{item.title}</div>
  //     <div className="mt-2 text-sm text-zinc-600 line-clamp-3">{ item.description }</div>
  //     <div className="mt-2 text-xs">
  //       <span className="mr-3">{ item.author }</span>
  //       <span className="mr-3"><EyeOutlined /> 13k</span>
  //         <span className="mr-3">
  //           { item.is_collected == 1? <StarFilled />: <StarOutlined />} { item.collect_num }
  //         </span>
  //        { item.Tags.map(tagItem => (
  //         <Tag key={tagItem.id}>{tagItem.name}</Tag>
  //        )) }
  //       </div>
  //   </Card>
  // ))

  return (
      <div className="max-w-[1200px] mx-auto mt-4">
        {/* <div>{authorization}</div> */}
        <ArticleList articleData={articleData}></ArticleList>
        <div className="mt-4 flex justify-center">
          <Pagination defaultCurrent={pageConfig.page} pageSize={pageConfig.pageSize} total={count}/>
        </div>
      </div>
  );
}
