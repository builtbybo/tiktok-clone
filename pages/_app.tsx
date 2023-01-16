import '../styles/globals.css'
import { useState, useEffect } from 'react'

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import type { AppProps } from 'next/app'
import { GoogleOAuthProvider } from '@react-oauth/google';
// import localFont from '@next/font/local'

// // const App = ({ })
// // const myFont = localFont({ src: './my-font.woff2' })
// // const myFont = localFont({ src: '../styles/ProximaNova-Regular.otf' })

// const ProximaNova = localFont({
//   src: [
//     {
//       path: './Roboto-Regular.woff2',
//       weight: '400',
//       style: 'normal',
//     },
//     {
//       path: './Roboto-Italic.woff2',
//       weight: '400',
//       style: 'italic',
//     },
//     {
//       path: './Roboto-Bold.woff2',
//       weight: '700',
//       style: 'normal',
//     },
//     {
//       path: './Roboto-BoldItalic.woff2',
//       weight: '700',
//       style: 'italic',
//     },
//   ],

// });
// ${myFont.className}`


export default function App({ Component, pageProps }: AppProps) {

  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, [])

  if (isSSR) return null;
  

  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
      <Navbar />
      <div className={`xl:w-[1200px] m-auto overflow-hidden h-[100vh]`}>
        <div className='flex gap-6 md:gap-20'>
          <div className='h-[92vh] overflow-hidden xl:hover:overflow-auto'>
            <Sidebar />
          </div>
          <div className='mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1'>
            <Component {...pageProps} /> 
          </div>
        </div>
      </div>
      
    </GoogleOAuthProvider>
  )
}
