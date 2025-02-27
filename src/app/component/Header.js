import { Button  } from 'antd';
import Link from 'next/link'
import { cookies } from 'next/headers'
import UserProfile from './UserProfile'

export default function Header(){
    const cookieStore = cookies()
    const authorization = cookieStore.get('authorization')?.value || ''
    const loginStatus = !!authorization
    return (
        <>
            <header className="py-2 bg-white">
                <div className="flex justify-between items-center mx-auto w-full 2xl:max-w-[1280px] px-2 box-border">
                        <Link href="/"><img src='/image/logo.png' className="w-12"></img></Link>
                    <div>
                        <Link href="/drafts"><Button type="primary" className='mr-3'>创作</Button></Link>
                            <UserProfile loginStatus={loginStatus} />
                    </div>
                </div>
            </header>
        </>
    )
}