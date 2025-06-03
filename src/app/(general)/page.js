import { cookies } from 'next/headers'
import { fetchData } from '@/api'
import ArticleList from '@/app/component/ArticleList'
import Pagination from '@/app/component/Pagination'

export default async function Home(context) {
  const { searchParams } = context
  const cookieStore = cookies()
  const authorization = cookieStore.get('authorization')?.value || ''
  const pageConfig = {
    page: searchParams.page || 1,
    pagesize: searchParams.pageSize || 10,
    authorization
  }
  const queryParams = new URLSearchParams(pageConfig)
  const { rows: articleData, count } = await fetchData(`/article?${queryParams.toString()}`, {
    authorization
  })

  return (
    <div className="max-w-[1200px] mx-auto mt-4">
      <ArticleList articleData={articleData}></ArticleList>
      <div className="my-5 flex justify-center">
        <Pagination defaultCurrent={pageConfig.page} pageSize={pageConfig.pageSize} total={count} />
      </div>
    </div>
  )
}
