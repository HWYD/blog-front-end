import "./globals.css";
// import { ReduxProvider } from "@/store";
import { AuthProvider } from '@/store/authContext';
import { fetchData } from '@/api';
import { cookies } from 'next/headers'

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
            {/* <ReduxProvider> */}
            <AuthProvider initialAuth={initialAuth}>
              {children}
            </AuthProvider>
         {/* </ReduxProvider> */}
      </body>
    </html>
  );
}
