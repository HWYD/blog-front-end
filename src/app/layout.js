import "./globals.css";
import { ReduxProvider } from "@/store";

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body>
            <ReduxProvider>
              {children}
         </ReduxProvider>
      </body>
    </html>
  );
}
