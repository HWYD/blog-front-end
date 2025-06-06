import Header from '@/app/component/Header'
import '@/app/styles/globals.css'

export default function RootLayout({ children }) {
  return (
    <>
      <Header></Header>
      <div className="min-h-96 pb-3">
        {children}
      </div>
    </>
  )
}
