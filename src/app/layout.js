import { Suspense } from 'react'
import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import Loading from './components/Loading'
import Footer from './components/Footer'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Samboleap',
  description: 'All Listing Information',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <Navbar/>
        </header>
        <main>
          <Suspense fallback={<Loading/>}>
            {children}
          </Suspense>
        </main>
        <Footer/>
      </body>
    </html>
  )
}
