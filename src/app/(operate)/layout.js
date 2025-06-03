import '@/app/styles/globals.css'
// import Header from '@/app/component/Header'
// import Footer from '@/app/component/Footer'

// import { Provider } from 'react-redux';
// import { wrapper }  from '@/store';
// import { useMemo } from 'react';
// import { ReduxProvider } from "@/store";

export const metadata = {
  title: '看看博客！',
  description: '一起写篇博客！'
}

export default function RootLayout({ children }) {
  // const store = useMemo(() => makeStore(), []);
  return (
    // <html lang="zh">
    //   <body>
    <>
      {children}
    </>
    //   </body>
    // </html>
  )
}
