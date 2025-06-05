import '@/app/styles/globals.css'

export const metadata = {
  title: '看看博客！',
  description: '一起写篇博客！'
}

export default function RootLayout({ children }) {
  return (
    <>
      {children}
    </>
  )
}
