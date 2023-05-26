import * as React from 'react';
import Button from '@mui/material/Button';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import { MuiTelInput } from 'mui-tel-input';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import jwtDecode from "jwt-decode";
import axios from 'axios';
import Head from 'next/head';

import { UserNavbar } from '../../components/navbar'
import Footer from '../../components/footer'

function DetailBookingPage() {
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const {id} = router.query
    const [dataBooking, setDataBooking] = React.useState({})

    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    const GetData = async () => {
        await axios.get(process.env.API_URL+`/ticket/detail/${id}`).then(function(response) {
            setDataBooking(response.data)
          }).catch(function(error) {
            console.log(error)
        })
      }

    React.useEffect(() => {
        GetData()
    },[id])

    React.useEffect(() => {
        if (dataBooking) {
            console.log(dataBooking)
        }
    },[dataBooking])

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

    const BookingForm = async () => {
        let data = {
            ticket_id: id,
            is_paid: 0,
            insurance: 0,
            insurance_price: 0,
            total: dataBooking.data[0].price,
            subtotal: dataBooking.data[0].price,
            total_passenger: 1
        }
        await axios.post(process.env.API_URL+'/booking/create',data,{
            headers:{
                "Authorization": `Bearer ${cookies.token}`
            }
        }).then(function(response) {
          router.push('../user/myBooking')
          console.log(response)
        }).catch(function(error) {
          console.log(error)
        })
    }

    return (
      <>
        <Head>
          <title>Booking Ticket</title>
        </Head>
        <UserNavbar />
        <div className='w-full' style={{backgroundColor: '#F6F6F6'}}>
            <div className='flex w-full p-5' style={{backgroundColor: '#2395FF'}}>
                <div className='w-2/3 px-5 pt-4 pb-10'>
                    <h1 style={{color: 'white', fontWeight: 'bold'}}>Contact Person Details</h1>
                </div>
                <div className='flex w-1/3 px-2 pt-4 pb-10' style={{justifyContent: 'space-between'}}>
                    <h1 style={{color: 'white', fontWeight: 'bold'}}>Flight Details</h1>
                    <h3 style={{color: 'white', fontSize: 12, fontWeight: '500'}}>View Details</h3>
                </div>
            </div>
            <div className='flex w-full p-5' style={{marginTop: -70}}>
                <div className='w-2/3 p-10 ' style={{borderRadius: 10, backgroundColor: 'white'}}>
                    <TextField disabled value={user.name} className='w-full' id="standard-basic" label="Full Name" variant="standard" sx={{marginBottom: '15px'}} />
                    <TextField disabled value={user.email} className='w-full' id="standard-basic" label="Email" variant="standard" sx={{marginTop: '15px', marginBottom: '15px'}} />
                    <MuiTelInput disabled value={user.phone} className='w-full' id="standard-basic" label="Phone Number" variant="standard" sx={{marginTop: '15px', marginBottom: '15px'}} />                 
                </div>
                {dataBooking.data ? dataBooking?.data?.map((item,index) =>{
                    return (
                        <div key={index+1} className='w-1/3 p-10 ms-5' style={{borderRadius: 10, backgroundColor: 'white'}}>
                            <div className='flex' style={{alignItems: 'center'}}>
                                <Image className='me-5' src="/asset/garuda.png" width={100} height={50} />
                                <h1 style={{color: 'black', fontWeight: '400'}}>Garuda Indonesia</h1>
                            </div>
                            <div className='flex py-7' style={{alignItems: 'center'}}>
                                <h1 className='me-5' style={{color: 'black', fontWeight: 'bold'}}>{`${item.origin_city} (${item.origin_country})`}</h1>
                                <Image className='me-5' src="/asset/airplane.svg" width={15} height={15} />
                                <h1 style={{color: 'black', fontWeight: 'bold'}}>{`${item.destination_city} (${item.destination_country})`}</h1>
                            </div>
                            <p className='py-3' style={{color: '#979797' ,fontSize: 12}}>{`${weekday[new Date(item.takeoff).getDay()]}, ${new Date(item.takeoff).getDate()} ${month[new Date(item.takeoff).getMonth()]} ${new Date(item.takeoff).getFullYear()} • ${new Date(item.takeoff).getHours()  < 10 ? '0'+ new Date(item.takeoff).getHours() : new Date(item.takeoff).getHours()} : ${new Date(item.takeoff).getMinutes() < 10 ? '0'+ new Date(item.takeoff).getMinutes() : new Date(item.takeoff).getMinutes()} - ${new Date(item.landing).getHours()  < 10 ? '0'+ new Date(item.landing).getHours() : new Date(item.landing).getHours()} : ${new Date(item.landing).getMinutes() < 10 ? '0'+ new Date(item.landing).getMinutes() : new Date(item.landing).getMinutes()}`}</p>
                            <p className='py-1' style={{color: '#2395FF' ,fontSize: 12}}>Refundable</p>
                            <p className='py-1' style={{color: '#2395FF' ,fontSize: 12}}>Can reschedule</p>
                            <div className='flex pt-5' style={{borderBlockStartColor: '#E6E6E6', borderBlockStartWidth: 1, justifyContent: 'space-between', alignItems: 'flex-start'}}>
                                <h1 style={{color: 'black', fontWeight: 'bold'}}>Total Payment</h1>
                                <h1 style={{color: '#2395FF', fontWeight: 'bold'}}>{`$ ${item.price},00`}</h1>
                            </div>
                        </div>   
                    )
                }) : <h1 style={{color: 'black', fontWeight: '400'}}>Loading</h1>}
            </div>
            <h1 className='py-10 px-7' style={{color: 'black', fontWeight: 'bold', fontSize: 20, marginTop: -20}}>Passenger Details</h1>
            <div className='flex w-full px-5' style={{marginTop: -20}}>
                <div className='w-2/3 px-10 py-5' style={{borderRadius: 10, backgroundColor: 'white'}}>
                    <TextField className='w-full' id="standard-basic" label="Title" variant="standard" sx={{marginBottom: '15px',marginTop: '15px', marginBottom: '15px'}} />
                    <TextField className='w-full' id="standard-basic" label="Full Name" variant="standard" sx={{marginTop: '15px',marginBottom: '15px'}} />
                    <TextField className='w-full' id="standard-basic" label="Nationallity" variant="standard" sx={{marginTop: '15px', marginBottom: '30px'}} />
                </div>
            </div>
            <h1 className='py-10 px-7' style={{color: 'black', fontWeight: 'bold', fontSize: 20, marginTop: -5}}>Passenger Details</h1>
            <div className='flex w-full px-5' style={{marginTop: -20}}>
                <div className='w-2/3 px-10 py-5' style={{borderRadius: 10, backgroundColor: 'white'}}>
                    <div className='flex' style={{justifyContent: 'space-between'}}>
                        <FormControlLabel control={<Checkbox />} label="Travel Insurance" style={{color: '#595959'}} />
                        <h1 className='flex' style={{color: '#2395FF', fontWeight: '500', alignItems: 'flex-end'}}>$2.00 <p style={{fontSize: 7, color: '#979797'}}>/pax</p></h1>
                    </div>
                    <div className='py-5' style={{borderBlockStartColor: '#E6E6E6', borderBlockStartWidth: 1, justifyContent: 'space-between', alignItems: 'center'}}>
                        <p className='py-1' style={{color: '#000000' ,fontSize: 12}}>Get travel compensation up to $ 10.000,00</p>
                    </div>
                </div>
                
            </div>
            <div className='flex w-2/3' style={{justifyContent: 'center'}}>
                <Button onClick={() => BookingForm()} className='w-1/3 m-5' variant="contained" style={{backgroundColor: '#2395FF'}} sx={{marginTop: '20px', marginBottom: '20px'}}>Proceed to Payment</Button>
            </div>
            
        </div>
        <Footer />
      </>
    )
}
  
export default DetailBookingPage