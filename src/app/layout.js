import "./globals.css";
import { AuthProvider } from '@/store/authContext';
import { fetchData } from '@/api';
import { cookies } from 'next/headers'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

export default async function RootLayout({ children }) {
  const cookieStore = cookies()
  const authorization = cookieStore.get('authorization')?.value || ''
  let initialAuth = false
  const fetchLoginStatusAPI = async () => {
    try {
        const { login_status } = await fetchData('/login-status',{ authorization });
        initialAuth = login_status
    } catch (error) {
        console.error('login_status', error);
    }
  };  
  if(authorization){
    await fetchLoginStatusAPI()
  }
  return (
    <html lang="zh">
      <body>
            <AuthProvider initialAuth={initialAuth}>
              <ConfigProvider locale={zhCN}>
                {children}
              </ConfigProvider>
            </AuthProvider>
      </body>
    </html>
  );
}
