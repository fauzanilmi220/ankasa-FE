import * as React from 'react';
import Button from '@mui/material/Button';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import jwtDecode from "jwt-decode";
import Head from 'next/head';
import { MuiTelInput } from 'mui-tel-input';
import axios from 'axios';

import { UserNavbar } from '../../components/navbar'
import Footer from '../../components/footer'

function ProfilePage() {
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [user, setUser] = React.useState({
        name: "",
        email: "",
        city: "",
        address: "",
        phone: "",
        photo:
          "",
        post_code: ""
    });

    const handleChange = (e) => {
        setUser({
          ...user,
          [e.target.name]: e.target.value
        })
    }

    React.useEffect(() => {
        if (!cookies.token) {
            router.replace('../auth/login')
        } else {
            setUser({
                name: jwtDecode(cookies.token).name,
                email: jwtDecode(cookies.token).email,
                city: jwtDecode(cookies.token).city,
                address: jwtDecode(cookies.token).address,
                phone: jwtDecode(cookies.token).phone,
                photo: jwtDecode(cookies.token).photo,
                post_code: jwtDecode(cookies.token).post_code
            })
        }
      },[cookies.token])

      const UpdateForm = async () => {
        let data = {
            name: user.name,
            email: user.email,
            city: user.city,
            address: user.address,
            phone: user.phone,
            post_code: user.post_code
        }
        await axios.put(process.env.API_URL+'/users/update',data,{
            headers:{
                "Authorization": `Bearer ${cookies.token}`
            }
        }).then(function(response) {
          removeCookie('token',{path: '/'})
          console.log(response)
        }).catch(function(error) {
          console.log(error)
        })
      }

    return (
      <>
        <Head>
          <title>Profile</title>
        </Head>
        <UserNavbar />
        <div className='w-full' style={{backgroundColor: '#F6F6F6'}}>
            <div className='flex flex-row'>
                <div className='w-1/4 flex flex-col mx-5 my-10 py-5' style={{justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', borderRadius: 10}}>
                    <img src={user.photo || '/asset/dp.png'} style={{borderColor: '#00B7DF', borderWidth: 4, borderRadius: 70}} className='w-1/3 p-2' />
                    <Button className='my-3' size='small' href='verify' variant="outlined" style={{fontWeight: 'bold', color: '#2395FF', fontSize: 10}} sx={{width: 'full'}}>Select Photo</Button>
                    <h1 style={{color: 'black', fontWeight: 'bold'}}>{user.name || 'Full Name'}</h1>
                    <div className='flex mt-2'>
                        <Image src="/asset/location.svg" width={10} height={10} style={{color: '#2395FF'}} />
                        <p className='ps-1' style={{color: '#6B6B6B', fontSize: 10, fontWeight: '500'}}>{user.city || '-'}</p>
                    </div>
                    <div className='flex mt-5 w-full px-3' style={{justifyContent: 'space-between', alignItems: 'center', fontSize: 12}}>
                        <h3 style={{color: 'black', fontWeight: 'bold'}}>Cards</h3>
                        <Button style={{color: '#2395FF', fontWeight: 'bold', fontSize: 10}}>+ Add</Button>
                    </div>
                    <div className='px-5 py-3 w-5/6' style={{backgroundColor: '#2395FF', borderRadius: 10}}>
                        <h3 style={{fontWeight: 'bold', paddingBottom: 5}}>4441 1235 5512 5551</h3>
                        <div className='flex' style={{justifyContent: 'space-between'}}>
                            <h5 style={{fontSize: 10}}>X Card</h5>
                            <h5 style={{fontSize: 10}}>$ 1,440.2</h5>
                        </div>
                    </div>
                    <Button href='profile' className='w-full flex my-2' style={{color: '#2395FF', alignItems: 'center', fontWeight: 'bold', fontSize: 10}}>
                        Profile
                    </Button>
                    <Button className='w-full flex my-2'style={{color: 'black', alignItems: 'center', fontWeight: 'bold', fontSize: 10}}>
                        My Review
                    </Button>
                    <Button className='w-full flex my-2'style={{color: 'black', alignItems: 'center', fontWeight: 'bold', fontSize: 10}}>
                        Settings
                    </Button>
                    <Button onClick={() => {removeCookie('token',{path: '/'})}} className='w-full flex my-2' style={{color: '#F24545', alignItems: 'center', fontWeight: 'bold', fontSize: 10}}>
                        Logout
                    </Button>
                </div>
                <div className='w-3/4 mx-5 my-10 p-5 ' style={{justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', borderRadius: 10}}>
                    <h3 style={{color: '#2395FF', fontSize: 10}}>P R O F I L E</h3>
                    <h1 style={{color: 'black', fontWeight: 'bold'}}>Profile</h1>
                    <div className='mt-5 flex'>
                        <div className='w-1/2'>
                            <h1 style={{color: 'black', fontWeight: 'bold', fontSize: 12}}>Contact</h1>
                            <TextField name='email' value={user.email} onChange={handleChange} className='w-full pe-10' size='small' id="standard-basic" label="Email" variant="standard" sx={{width: 'full', marginTop: '20px'}} />
                            <MuiTelInput name='phone' value={user.phone} onChange={(e) => {setUser({...user,phone:e});console.log(e)}} className='w-full pe-10' size='small' id="standard-basic" label="Phone Number" variant="standard" sx={{width: 'full', marginTop: '20px'}} />
                        </div>
                        <div className='w-1/2'>
                            <h1 style={{color: 'black', fontWeight: 'bold', fontSize: 12}}>Biodata</h1>
                            <TextField name='name' onChange={handleChange} value={user.name} className='w-full pe-10' size='small' id="standard-basic" label="Fullname" variant="standard" sx={{width: 'full', marginTop: '20px'}} />
                            <TextField name='city' onChange={handleChange} value={user.city} className='w-full pe-10' size='small' id="standard-basic" label="City" variant="standard" sx={{width: 'full', marginTop: '20px'}} />
                            <TextField name='address' onChange={handleChange} value={user.address} className='w-full pe-10' size='small' id="standard-basic" label="Address" variant="standard" sx={{width: 'full', marginTop: '20px'}} />
                            <TextField name='post_code' onChange={handleChange} value={user.post_code} className='w-full pe-10' size='small' id="standard-basic" label="Post Code" variant="standard" sx={{width: 'full', marginTop: '20px'}} />
                            <Button onClick={() => UpdateForm()} className='me-10' variant="contained" style={{backgroundColor: '#2395FF', float: 'right'}} sx={{width: '1/3', marginTop: '20px', marginBottom: '20px'}}>Verify</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
      </>
    )
}
  
export default ProfilePage