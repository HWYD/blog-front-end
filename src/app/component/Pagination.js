'use client'
import { Pagination } from 'antd'
import { useRouter } from 'next/navigation'

export default function Pagepagination({ defaultCurrent, pageSize, total }) {
  const router = useRouter()
  const onChange = (page, pageSize) => {
    router.push(`/?page=${page}&pageSize=${pageSize}`)
  }
  return (
    <Pagination defaultCurrent={defaultCurrent} pageSize={pageSize} total={total} className="mx-auto" onChange={onChange}>
    </Pagination>
  )
}
