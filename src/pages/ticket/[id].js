import * as React from 'react';
import Button from '@mui/material/Button';
import Image from 'next/image';
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import JsBarcode from 'jsbarcode';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import jwtDecode from "jwt-decode";
import axios from 'axios';
import Head from 'next/head';

import { UserNavbar } from '../../components/navbar'
import Footer from '../../components/footer'

function TicketPage() {
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const {id} = router.query
    const [data, setData] = React.useState({})

    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    const GetData = async () => {
        await axios.get(process.env.API_URL+`/booking/detail/${id}`, {
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
    },[id])

    React.useEffect(() => {
        if (!cookies.token) {
            router.replace('../auth/login')
        }
    },[cookies.token])

    React.useEffect(() => {
        if (data) {
            JsBarcode("#barcode",id);
            console.log(data)
        }
    },[data])

    return (
      <>
        <Head>
          <title>Ticket</title>
        </Head>
        <UserNavbar />
        <div className='w-full flex' style={{backgroundColor: '#2395FF', justifyContent: 'center'}}>
            <div className='w-4/5 mx-5 my-10 px-5 py-10' style={{backgroundColor: 'white'}}>
                <div className='flex' style={{justifyContent: 'space-between'}}>
                    <h1 style={{color: 'black', fontWeight: 'bold'}}>Booking Pass</h1>
                    <h1 style={{color: '#2395FF', fontWeight: 'bold'}}>•••</h1>
                </div>
                {data.data ? data?.data?.map((item,index) => {
                    return (
                        <div key={index+1} className='flex mt-5'>
                            <div className='w-2/3 py-5' style={{borderColor: '#E6E6E6', borderRadius: 7, borderWidth: 2, borderRightStyle: 'none'}}>
                                <div className='flex p-3' style={{justifyContent: 'space-evenly', alignItems: 'center'}}>
                                    <Image className='me-5' src="/asset/garuda.png" width={150} height={100} />
                                    <h1 className='me-5' style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>{item.origin_country}</h1>
                                    <Image className='me-5' src="/asset/airplane.svg" width={20} height={20} />
                                    <h1 style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>{item.destination_country}</h1>
                                </div>
                                <div className='flex px-10 pb-2 pt-10'>
                                    <div className='w-1/2'>
                                        <h3 style={{color: '#979797', fontSize: 10, fontWeight: '500'}}>Code</h3>
                                        <h3 style={{color: 'black', fontSize: 12, fontWeight: '500'}}>{item.origin_code}</h3>
                                    </div>
                                    <div className='w-1/2'>
                                        <h3 style={{color: '#979797', fontSize: 10, fontWeight: '500'}}>Class</h3>
                                        <h3 style={{color: 'black', fontSize: 12, fontWeight: '500'}}>{item.class}</h3>
                                    </div>
                                </div>
                                <div className='flex px-10 py-2'>
                                    <div className='w-1/2'>
                                        <h3 style={{color: '#979797', fontSize: 10, fontWeight: '500'}}>Terminal</h3>
                                        <h3 style={{color: 'black', fontSize: 12, fontWeight: '500'}}>{item.terminal}</h3>
                                    </div>
                                    <div className='w-1/2'>
                                        <h3 style={{color: '#979797', fontSize: 10, fontWeight: '500'}}>Gate</h3>
                                        <h3 style={{color: 'black', fontSize: 12, fontWeight: '500'}}>{item.gate}</h3>
                                    </div>
                                </div>
                                <div className='px-10 pt-2'>
                                    <h3 style={{color: '#979797', fontSize: 10, fontWeight: '500'}}>Departure</h3>
                                    <h3 style={{color: 'black', fontSize: 12, fontWeight: '500'}}>{`${weekday[new Date(item.takeoff).getDay()]}, ${new Date(item.takeoff).getDate()} ${month[new Date(item.takeoff).getMonth()]} ${new Date(item.takeoff).getFullYear()} - ${new Date(item.takeoff).getHours()  < 10 ? '0'+ new Date(item.takeoff).getHours() : new Date(item.takeoff).getHours()} : ${new Date(item.takeoff).getMinutes() < 10 ? '0'+ new Date(item.takeoff).getMinutes() : new Date(item.takeoff).getMinutes()}`}</h3>
                                </div>
                            </div>
                            <div className='w-1/3' style={{borderColor: '#E6E6E6', borderRadius: 7, borderWidth: 2, position: "relative", borderLeftStyle: 'dashed'}}>
                                <Image id='barcode' style={{transform: 'rotate(270deg)', objectFit: "contain", padding: 10, height: 'full', marginTop: 120}} fill />
                            </div>
                        </div>    
                    )
                }) : <h1 style={{color: 'black', fontWeight: '400'}}>Loading</h1>}
                
            </div>
        </div>
        <Footer />
      </>
    )
}
  
export default TicketPage