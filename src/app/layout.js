import "./globals.css";
import { Provider } from 'react-redux';
import { wrapper }  from '@/store';
import { useMemo } from 'react';
import { ReduxProvider } from "@/store";


export default function RootLayout({ children }) {
//   const store = useMemo(() => makeStore(), []);
  return (
    <html lang="en">
      <body>
            <ReduxProvider>
              {children}
         </ReduxProvider>
      </body>
    </html>
  );
}
