'use client';
import { useRouter } from 'next/navigation'
import { Pagination } from 'antd';
// const [pageConfig,setPageConfig] = useState({
//     page: 1,
//     pagesize: 20
//   })

export default function Pagepagination({defaultCurrent,pageSize,total}){
  const router = useRouter()
    const onChange =(page, pageSize)=>{
      router.push(`/?page=${page}&pageSize=${pageSize}`)
    }
    return (
      <Pagination  defaultCurrent={defaultCurrent} pageSize={pageSize}  total={total} className="mx-auto" onChange={onChange}>
      </Pagination>)
}