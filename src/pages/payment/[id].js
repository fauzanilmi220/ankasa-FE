import * as React from 'react';
import Button from '@mui/material/Button';
import Image from 'next/image';
import { PaymentInputsWrapper, usePaymentInputs } from 'react-payment-inputs';
import images from 'react-payment-inputs/images';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';

import { UserNavbar } from '../../components/navbar'
import Footer from '../../components/footer'

function PaymentPage() {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const router = useRouter()
    const {id} = router.query
    const [dataBooking, setDataBooking] = React.useState({})

    const {
        wrapperProps,
        getCardImageProps,
        getCardNumberProps,
        getExpiryDateProps,
        getCVCProps
    } = usePaymentInputs();

    const GetData = async () => {
        await axios.get(process.env.API_URL+'/booking/detail/'+id,{
            headers:{
                "Authorization": `Bearer ${cookies.token}`
            }
        }).then(function(response) {
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

    React.useEffect(() => {
        if (!cookies.token) {
            router.replace('../auth/login')
        }
    },[cookies.token])

    const PaymentForm = async () => {
        let data = {
          id: id,
          is_paid: 1
        }
        await axios.put(process.env.API_URL+'/booking/paidUpdate',data,{
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
          <title>Ticket Payment</title>
        </Head>
        <UserNavbar />
        <div className='w-full flex' style={{backgroundColor: '#2395FF', justifyContent: 'center'}}>
            <div className='flex w-4/5 mx-5 my-10 px-5 py-10' style={{backgroundColor: 'white'}}>
                <div className='w-1/2 p-3'>
                    <h3 style={{color: 'black', fontSize: 12, fontWeight: '500'}}>Payment Method</h3>
                    <div className='flex p-3' style={{justifyContent: 'space-between', backgroundColor: '#F6F6F6', alignItems: 'center'}}>
                        <h3 style={{color: 'black', fontSize: 10, fontWeight: '500'}}>Paypal</h3>
                        <Image src={'/asset/paypal.png'} width={25} height={20} />
                    </div>
                    <div className='flex p-3' style={{justifyContent: 'space-between', backgroundColor: '#F6F6F6', alignItems: 'center'}}>
                        <h3 style={{color: 'black', fontSize: 10, fontWeight: '500'}}>Credit Card</h3>
                        <div className='flex w-1/3' style={{justifyContent: 'flex-end', alignItems: 'center'}}>
                            <Image className='mx-1' src={'/asset/mastercard.png'} width={25} height={10} />
                            <Image className='mx-1' src={'/asset/visa.png'} width={25} height={25} />
                            <Image className='mx-1' src={'/asset/stripe.png'} width={25} height={10} />
                            <Image className='mx-1' src={'/asset/mastercard.png'} width={25} height={10} />
                        </div>
                    </div>
                    <div className='py-5'>
                    <PaymentInputsWrapper className='w-full' {...wrapperProps}>
                        <svg {...getCardImageProps({ images })} />
                        <input style={{color: 'black'}} {...getCardNumberProps()} />
                        <input style={{color: 'black'}} {...getExpiryDateProps()} />
                        <input style={{color: 'black'}} {...getCVCProps()} />
                    </PaymentInputsWrapper>
                    </div>
                    <h3 style={{color: '#6B6B6B', fontSize: 10, fontWeight: '500'}}>Your Transaction is secured with ssl certificate</h3>
                </div>
                <div className='w-1/2 p-3'>
                    <h3 style={{color: 'black', fontSize: 12, fontWeight: '500'}}>Summary</h3>
                    {dataBooking?.data?.map((item,index) => (
                        <div className='flex' style={{borderBlockEndColor: '#E6E6E6', borderBlockEndWidth: 1, justifyContent: 'space-between', alignItems: 'center'}}>
                            <div className='p-3'>
                                <h3 style={{color: 'black', fontSize: 10, fontWeight: '500'}}>Pro(Billed Monthly)</h3>
                                <h3 style={{color: '#2395FF', fontSize: 10, fontWeight: '500'}}>Save 20% with annual billing</h3>
                            </div>
                            <h1 className='flex' style={{color: 'black', fontWeight: '500', alignItems: 'flex-end'}}>{`$ ${item.price}.00`}<p style={{fontSize: 7}}>/Month</p></h1>
                        </div>
                    ))}
                    
                    <div className='p-3' style={{borderBlockEndColor: '#E6E6E6', borderBlockEndWidth: 1, justifyContent: 'space-between', alignItems: 'center'}}>
                        <div className='flex py-1' style={{justifyContent: 'space-between'}}>
                            <h3 style={{color: 'black', fontSize: 10, fontWeight: '500'}}>Refferal Bonouses</h3>
                            <p style={{color: 'black', fontWeight: '500', fontSize: 10}}>-$2.00</p>
                        </div>
                        <div className='flex py-1' style={{justifyContent: 'space-between'}}>
                            <h3 style={{color: 'black', fontSize: 10, fontWeight: '500'}}>Vat</h3>
                            <p style={{color: 'black', fontWeight: '500', fontSize: 10}}>-20%</p>
                        </div>
                    </div>
                    <div className='flex' style={{borderBlockEndColor: '#E6E6E6', borderBlockEndWidth: 1, justifyContent: 'space-between', alignItems: 'flex-start'}}>
                        <div className='p-3'>
                            <h3 style={{color: 'black', fontSize: 10, fontWeight: '500'}}>Today you pay(US Dollar)</h3>
                            <h3 style={{color: 'black', fontSize: 10, fontWeight: '500'}}>After 30 days $9.59</h3>
                        </div>
                        <p className='p-3' style={{color: 'black', fontWeight: '500', fontSize: 10}}>$0</p>
                    </div>
                    <Button onClick={() => PaymentForm()} className='w-full p-3' variant="contained" style={{backgroundColor: '#2395FF'}} sx={{width: 'full', marginTop: '20px', fontSize: 8}}>Try it free for 30 days</Button>
                    <h3 className='flex' style={{color: '#2395FF', fontSize: 10, fontWeight: '500', justifyContent: 'center'}}>Have a promo code?</h3>
                </div>
            </div>
        </div>
        <Footer />
      </>
    )
}
  
export default PaymentPage