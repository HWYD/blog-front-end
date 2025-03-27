import "@/app/styles/globals.css";
import Header from '@/app/component/Header'

export default function RootLayout({ children }) {
  return (
    // <html lang="zh">
    //   <body>
        <>
            <Header></Header>
            <div className="min-h-96 pb-3">
              {children}
            </div>
        </>
    //   </body>
    // </html>
  );
}
