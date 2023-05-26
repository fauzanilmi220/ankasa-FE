import * as React from 'react';
import Button from '@mui/material/Button';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useCookies } from 'react-cookie';
import jwtDecode from "jwt-decode";

export const UserNavbar = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [user, setUser] = React.useState({
        photo:""
    });

    React.useEffect(() => {
      if (cookies.token) {
        setUser({
          photo: jwtDecode(cookies.token).photo
        })
      }
    },[cookies.token])

    return (
      <>
        <div className='flex w-full py-5 px-10' style={{backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-between'}}>
            <a href='/' className='flex'>
                <img src='/asset/logo.png' style={{height:'30px'}}/>
                <h5 style={{color:'#414141', fontWeight: 'bold', fontSize: '20px', marginLeft: 15}}>Ankasa</h5>
            </a>
            
            <Box className='flex w-1/5 mx-5' sx={{alignItems: 'center'}}>
                    <Image src="/asset/search.svg" width={15} height={15} style={{color: '#2395FF'}} />
                    <TextField className='w-full px-3' id="input-with-sx" label="Where you want to go?" variant="standard" />
            </Box>
            <Button href='../home/findTicket' style={{color:'#414141', fontWeight: 'bold', fontSize: '12px', marginLeft: 15}}>Find ticket</Button>
            <Button href='../user/myBooking' style={{color:'#414141', fontWeight: 'bold', fontSize: '12px', marginLeft: 15}}>My Booking</Button>
            <Image src="/asset/mail.svg" width={15} height={15} style={{color: '#2395FF'}} />
            <Image src="/asset/bell.svg" width={15} height={15} style={{color: '#2395FF'}} />
            <Image src={user.photo || '/asset/dp.png'} width={50} height={50} style={{borderColor: '#00B7DF', borderWidth: 4, borderRadius: 70}} className='p-1' />
        </div>
      </>
    )
}

export const Navbar = () => {

  return (
    <>
      <div className='flex w-full py-5 px-10' style={{backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-between'}}>
          <a href='/' className='flex'>
              <img src='/asset/logo.png' style={{height:'30px'}}/>
              <h5 style={{color:'#414141', fontWeight: 'bold', fontSize: '20px', marginLeft: 15}}>Ankasa</h5>
          </a>
          
          <Box className='flex w-1/5 mx-5' sx={{alignItems: 'center'}}>
                  <Image src="/asset/search.svg" width={15} height={15} style={{color: '#2395FF'}} />
                  <TextField className='w-full px-3' id="input-with-sx" label="Where you want to go?" variant="standard" />
          </Box>
          <Button href='../home/findTicket' style={{color:'#414141', fontWeight: 'bold', fontSize: '12px', marginLeft: 15}}>Find ticket</Button>
          <Button href='../auth/login' style={{color:'#2395FF', fontWeight: 'bold', fontSize: '12px', marginLeft: 15}}>Login</Button>
          <Button href='../auth/register' style={{color:'#2395FF', fontWeight: 'bold', fontSize: '12px', marginLeft: 15}}>Register</Button>
      </div>
    </>
  )
}