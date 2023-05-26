import * as React from 'react';
import Button from '@mui/material/Button';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import jwtDecode from "jwt-decode";
import axios from 'axios';
import Head from 'next/head';

import { UserNavbar } from '../../components/navbar'
import Footer from '../../components/footer'

function MyBookingPage() {
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [data, setData] = React.useState({})

    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    const GetData = async () => {
        await axios.get(process.env.API_URL+'/booking/myBooking', {
            headers:{
                "Authorization": `Bearer ${cookies.token}`
            }
        }).then(function(response) {
            setData(response.data)
          }).catch(function(error) {
            console.log(error)
        })
      }

    React.useEffect(() => {
        GetData()
    },[])

    React.useEffect(() => {
        if (data) {
            console.log(data)
        }
    },[data])

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

    return (
      <>
        <Head>
          <title>My Booking</title>
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
                <div className='w-3/4 mx-5 my-10'>
                    <div className='w-full mb-5 p-5' style={{justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', borderRadius: 10}}>
                        <h3 className='flex' style={{color: '#2395FF', fontSize: 10}}><p className='me-2'>M Y</p> B O O K I N G</h3>
                        <div className='flex' style={{justifyContent: 'space-between', alignItems: 'flex-end'}}>
                            <h1 style={{color: 'black', fontWeight: 'bold'}}>My Booking</h1>
                            <h3 className='flex' style={{color: '#2395FF', fontSize: 10, fontWeight: '700'}}>Order History</h3>
                        </div>
                    </div>
                    {data.data && data?.data?.map((item,index) => {
                        return (
                            <div className='w-full mb-5 p-5' style={{justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', borderRadius: 10}}>
                                <h3 style={{color: 'black', fontSize: 10, fontWeight: '500'}}>{`${weekday[new Date(item.takeoff).getDay()]}, ${new Date(item.takeoff).getDate()} ${month[new Date(item.takeoff).getMonth()]} ${new Date(item.takeoff).getFullYear()} - ${new Date(item.takeoff).getHours()  < 10 ? '0'+ new Date(item.takeoff).getHours() : new Date(item.takeoff).getHours()} : ${new Date(item.takeoff).getMinutes() < 10 ? '0'+ new Date(item.takeoff).getMinutes() : new Date(item.takeoff).getMinutes()}`}</h3>
                                <div className='flex w-1/4 py-2' style={{alignItems: 'center'}}>
                                    <h1 className='me-5' style={{color: 'black', fontWeight: 'bold'}}>{item.origin_country}</h1>
                                    <Image className='me-5' src="/asset/airplane.svg" width={15} height={15} />
                                    <h1 style={{color: 'black', fontWeight: 'bold'}}>{item.destination_country}</h1>
                                </div>
                                <h3 style={{color: '#979797', fontSize: 10, fontWeight: '500'}}>{`${item.plane_name}, ${item.origin_code}`}</h3>
                                <div className='flex mt-2 pt-3' style={{justifyContent: 'space-between', alignItems: 'center', borderBlockStartColor: '#E6E6E6', borderBlockStartWidth: 1}}>
                                    {item.is_paid == 0 ? (
                                        <>
                                            <div className='flex w-1/3' style={{justifyContent: 'space-between', alignItems: 'center'}}>
                                                <h3 style={{color: '#7A7A7A', fontSize: 10, fontWeight: '500'}}>Status</h3>
                                                <h3 className='px-5 py-2' style={{color: 'white', fontSize: 12, fontWeight: '500', backgroundColor: '#FF7F23', borderRadius: 7}}>Waiting for payment</h3>
                                            </div>
                                            <Button href={`../payment/${item.booking_id}`} className='flex' style={{color: '#2395FF', fontSize: 10, fontWeight: '700'}}>View Details</Button>
                                        </>
                                    ) : (
                                        <>
                                            <div className='flex w-1/3' style={{justifyContent: 'space-between', alignItems: 'center'}}>
                                                <h3 style={{color: '#7A7A7A', fontSize: 10, fontWeight: '500'}}>Status</h3>
                                                <h3 className='px-5 py-2' style={{color: 'white', fontSize: 12, fontWeight: '500', backgroundColor: '#4FCF4D', borderRadius: 7}}>Payment Success</h3>
                                            </div>
                                            <Button href={`../ticket/${item.booking_id}`} className='flex' style={{color: '#2395FF', fontSize: 10, fontWeight: '700'}}>View Details</Button>
                                        </>
                                    )}
                                </div>
                            </div>     
                        )
                    })}
                </div>
            </div>
        </div>
        <Footer />
      </>
    )
}
  
export default MyBookingPage