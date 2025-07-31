import { getAllFontVariables } from '@/lib/fonts'
import { ToastContainer } from '@/components/ui/ToastContainer'
import { ModalContainer } from '@/components/ui/ModalContainer'
import './globals.css'

export const metadata = {
  title: 'Code Editor App',
  description: 'A warm, eye-friendly code editor aesthetic application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={getAllFontVariables()}
    >
      <body className="bg-black text-current font-terminal-mono antialiased">
        {children}
        
        {/* Notification systems */}
        <ToastContainer />
        <ModalContainer />
      </body>
    </html>
  )
}
