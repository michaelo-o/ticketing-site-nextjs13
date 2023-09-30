import './globals.css'
import { Rubik } from 'next/font/google'

// component imports
// import Navbar from './components/Navbar'

const rubik = Rubik({ subsets: ['latin'] })

export const metadata = {
  title: 'Dojo Helpdesk',
  description: 'Created by Michael Okwuosah',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        {/* <Navbar /> */}
        {children}
      </body>
    </html>
  )
}
