import * as React from 'react';
import Image from 'next/image';

const Footer = () => {
    return (
      <div className='flex w-full p-10' style={{backgroundColor: 'white', justifyContent: 'space-between'}}>
          <div className='w-2/5 p-5 flex flex-col' style={{justifyContent: 'space-between'}} >
            <div>
                <div className='flex mb-5'>
                    <img src='/asset/logo.png' style={{height:'30px'}}/>
                    <h5 style={{color:'#414141', fontWeight: 'bold', fontSize: '20px', marginLeft: 15}}>Ankasa</h5>
                </div>
                <p style={{color: '#6B6B6B'}}>Find your Flight and explore the world with us. We will take care of the rest</p>
            </div>
            <p style={{color: '#6B6B6B'}}>© Ankasa.  All Rights Reserved.</p>
          </div>
          <div className='w-1/5 p-5'>
            <h3 className='mb-5' style={{color: 'black', fontWeight: 'bold'}}>Features</h3>
            <p className='my-2' style={{color: '#6B6B6B'}}>Find Ticket</p>
            <p className='my-2' style={{color: '#6B6B6B'}}>My Booking</p>
            <p className='my-2' style={{color: '#6B6B6B'}}>Chat</p>
            <p className='my-2' style={{color: '#6B6B6B'}}>Notification</p>
          </div>
          <div className='w-1/5 p-5'>
            <h3 className='mb-5' style={{color: 'black', fontWeight: 'bold'}}>Download Angkasa app</h3>
            <Image className='my-5' src='/asset/appstore.png' width={150} height={150} />
            <Image className='my-5' src='/asset/googleplay.png' width={150} height={150} />
          </div>
          <div className='w-1/5 p-5 flex flex-col' style={{justifyContent: 'space-between'}} >
            <h3 style={{color: 'black', fontWeight: 'bold'}}>Follow Us</h3>
            <div className='flex my-5' style={{justifyContent: 'space-between'}}>
                <Image src='/asset/fb.svg' width={10} height={10} />
                <Image src='/asset/tw.svg' width={20} height={20} />
                <Image src='/asset/instagram.svg' width={20} height={20} />
                <Image src='/asset/youtube.svg' width={20} height={20} />
            </div>
            <div className='flex' style={{marginTop: 100}}>
                <Image className='me-1' src='/asset/map-pin.svg' width={15} height={15} />
                <p style={{color: '#6B6B6B'}}>Jakarta Indonesia</p>
            </div>
          </div>
      </div>
    )
  }
  
  export default Footer