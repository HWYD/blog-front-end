import { Button  } from 'antd';
import Link from 'next/link'

export default function Header(){
    return (
        <>
            <header className="py-2 bg-white">
                <div className="flex justify-between items-center max-w-[1280px] mx-auto">
                        <Link href="/"><img src='/image/logo.png' className="w-12"></img></Link>
                    <div>
                        <Link href="/drafts"><Button type="primary" className='mr-3'>创作</Button></Link>
                        <Link href="/login"><Button>登录</Button></Link>
                    </div>
                </div>
            </header>
        </>
    )
}