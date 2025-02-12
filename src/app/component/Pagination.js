'use client';

import { Pagination } from 'antd';
const [pageConfig,setPageConfig] = useState({
    page: 1,
    pagesize: 20
  })

export default function pagination(){
    return <Pagination  defaultCurrent={6} total={500} className="mx-auto"></Pagination>
}