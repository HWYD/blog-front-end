import { Button  } from 'antd';

export default function Header(){
    return (
        <header className="py-2 bg-white">
            <div className="flex justify-between items-center max-w-[1280px] mx-auto">
                <img src='/image/logo.png' className="w-12"></img>
                <div>
                    <Button type="primary" className='mr-3'>创作</Button>
                    <Button>登录</Button>
                </div>
            </div>
        </header>
    )
}