import * as React from 'react';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import Head from 'next/head';

import { UserNavbar, Navbar } from '@/components/navbar';

export default function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [dom, setDom] = React.useState(false)

  React.useEffect(() => {
    setDom(true)
},[])

  return (
    <>
      <Head>
        <title>Homepage</title>
      </Head>
      {cookies.token && dom ? <UserNavbar /> : <Navbar />}
      <div className='w-full h-full bg-white'>
        <div className='flex'>
            <div className='w-2/3'>
              <div className='p-5 m-5'>
                <h1 className='flex' style={{color: '#414141', fontSize: 50, fontWeight: 'bold'}}>Find your <p className='mx-2' style={{color: '#2395FF'}}>Flight</p></h1>
                <p style={{color: '#979797'}}>and explore the world with us</p>
              </div>
              <Image src={'/asset/jp_img.png'} className='w-full' width={500} height={500} />
            </div>
            <div className='w-1/3'>
              <Image src={'/asset/jp_img2.png'} className='w-full' width={500} height={500} />
            </div>
        </div>
      </div>
    </>
    
  )
}
