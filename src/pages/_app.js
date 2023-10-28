import { AuthProvider } from '@/contexts/AuthContext'
import { DatabaseProvider } from '@/contexts/DatabaseContext'
import { SocketProvider } from '@/contexts/SocketContext'
import { Roboto } from 'next/font/google'
import '@/styles/globals.css'

const roboto = Roboto({ 
  weight: '400',
  subsets: ['latin']
})

export default function App({ Component, pageProps }) {
  return (
    <SocketProvider>
      <DatabaseProvider>
        <AuthProvider>
          <div className={`${roboto.className}`}>
            <Component {...pageProps} />
          </div>
        </AuthProvider>
      </DatabaseProvider>
    </SocketProvider>
  )
}
