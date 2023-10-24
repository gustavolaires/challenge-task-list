import { AuthProvider } from '@/contexts/AuthContext'
import { Roboto } from 'next/font/google'
import '@/styles/globals.css'

const roboto = Roboto({ 
  weight: '400',
  subsets: ['latin']
})

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div className={`${roboto.className}`}>
        <Component {...pageProps} />
      </div>
    </AuthProvider>
  )
}
