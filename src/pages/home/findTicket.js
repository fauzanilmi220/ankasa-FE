import * as React from 'react';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Slider } from '@material-ui/core';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Head from 'next/head';

import { UserNavbar, Navbar } from '../../components/navbar'
import Footer from '../../components/footer'

function FindTicketPage() {
    const [price, setPrice] = React.useState([145, 300]);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const [value, setValue] = React.useState('')
    const [dom, setDom] = React.useState(false)
    const [data, setData] = React.useState({})

    const handleChange = (newValue) => {
        setValue(newValue)
    }

    const GetData = async () => {
        await axios.get(process.env.API_URL+'/ticket').then(function(response) {
            setData(response.data)
          }).catch(function(error) {
            console.log(error)
        })
      }

    React.useEffect(() => {
        GetData()
        setDom(true)
    },[])

    React.useEffect(() => {
        if (data) {
            console.log(data)
        }
    },[data])

    return (
      <>
        <Head>
          <title>Search Ticket</title>
        </Head>
        {cookies.token && dom ? <UserNavbar /> : <Navbar />}
        <div className='w-full' style={{backgroundColor: '#F6F6F6'}}>
            <div className='flex w-full p-10' style={{backgroundColor: '#2395FF', alignItems: 'center', borderEndEndRadius: 20, borderEndStartRadius: 20}}>
                <div className='flex w-1/3' style={{alignItems: 'center'}}>
                    <div className='flex w-1/3 px-5' style={{justifyContent: 'flex-end'}}>
                        <Image src="/asset/plane_white.svg" width={50} height={50} />
                    </div>
                    <div className='w-2/3'>
                        <div className='flex' style={{justifyContent: 'space-between'}}>
                            <p style={{color: 'white', fontSize: 10, fontWeight: '500'}}>From</p>
                            <p style={{color: 'white', fontSize: 10, fontWeight: '500'}}>To</p>
                        </div>
                        <div className='flex' style={{justifyContent: 'space-between', alignItems: 'center'}}>
                            <h3 style={{color: 'white', fontSize: 15, fontWeight: '500'}}>Medan (IDN)</h3>
                            <Image src="/asset/btb.svg" width={15} height={15} />
                            <h3 style={{color: 'white', fontSize: 15, fontWeight: '500'}}>Tokyo (JPN)</h3>
                        </div>
                        <p className='py-3' style={{color: 'white' ,fontSize: 12}}>Monday, 20 July 20 • 6 Passenger • Economy</p>
                    </div>    
                </div>
                <div className='w-2/3 flex' style={{justifyContent: 'flex-end'}}>
                    <h3 style={{color: 'white', fontSize: 15, fontWeight: '500'}}>Change Search</h3>
                </div>
            </div>
            <div className='flex'>
                <div className='w-1/4 p-5'>
                    <div className='flex'style={{justifyContent: 'space-between', alignItems: 'center'}}>
                        <h1 style={{color: 'black', fontWeight: 'bold'}}>Filter</h1>
                        <h3 style={{color: '#2395FF', fontWeight: 'bold', fontSize: 12}}>Reset</h3>
                    </div>
                    <div className='w-full p-5 my-3' style={{backgroundColor: 'white', borderRadius: 10}}>
                        <Accordion disableGutters>
                            <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                                <p className="font-bold">Transit</p>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="flex flex-row" style={{justifyContent: 'space-between', alignItems: 'center'}}>
                                    <label className="p-1 text-black w-5/6">Direct</label>
                                    <FormControlLabel className='w-1/6' control={<Checkbox />} style={{color: '#595959'}} />
                                </div>
                                <div className="flex flex-row" style={{justifyContent: 'space-between', alignItems: 'center'}}>
                                    <label className="p-1 text-black w-5/6">Transit</label>
                                    <FormControlLabel className='w-1/6' control={<Checkbox />} style={{color: '#595959'}} />
                                </div>
                                <div className="flex flex-row" style={{justifyContent: 'space-between', alignItems: 'center'}}>
                                    <label className="p-1 text-black w-5/6">Transit 2+</label>
                                    <FormControlLabel className='w-1/6' control={<Checkbox />} style={{color: '#595959'}} />
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion disableGutters>
                            <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                                <p className="font-bold">Facilities</p>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="flex flex-row" style={{justifyContent: 'space-between', alignItems: 'center'}}>
                                    <label className="p-1 text-black w-5/6">Luggage</label>
                                    <FormControlLabel className='w-1/6' control={<Checkbox />} style={{color: '#595959'}} />
                                </div>
                                <div className="flex flex-row" style={{justifyContent: 'space-between', alignItems: 'center'}}>
                                    <label className="p-1 text-black w-5/6">In-Flight Meal</label>
                                    <FormControlLabel className='w-1/6' control={<Checkbox />} style={{color: '#595959'}} />
                                </div>
                                <div className="flex flex-row" style={{justifyContent: 'space-between', alignItems: 'center'}}>
                                    <label className="p-1 text-black w-5/6">Wi-fi</label>
                                    <FormControlLabel className='w-1/6' control={<Checkbox />} style={{color: '#595959'}} />
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion disableGutters>
                            <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                                <p className="font-bold">Departure Time</p>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="flex flex-row" style={{justifyContent: 'space-between', alignItems: 'center'}}>
                                    <label className="p-1 text-black w-5/6">00:00 - 06:00</label>
                                    <FormControlLabel className='w-1/6' control={<Checkbox />} style={{color: '#595959'}} />
                                </div>
                                <div className="flex flex-row" style={{justifyContent: 'space-between', alignItems: 'center'}}>
                                    <label className="p-1 text-black w-5/6">06:00 - 12:00</label>
                                    <FormControlLabel className='w-1/6' control={<Checkbox />} style={{color: '#595959'}} />
                                </div>
                                <div className="flex flex-row" style={{justifyContent: 'space-between', alignItems: 'center'}}>
                                    <label className="p-1 text-black w-5/6">12:00 - 18:00</label>
                                    <FormControlLabel className='w-1/6' control={<Checkbox />} style={{color: '#595959'}} />
                                </div>
                                <div className="flex flex-row" style={{justifyContent: 'space-between', alignItems: 'center'}}>
                                    <label className="p-1 text-black w-5/6">18:00 - 24:00</label>
                                    <FormControlLabel className='w-1/6' control={<Checkbox />} style={{color: '#595959'}} />
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion disableGutters>
                            <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                                <p className="font-bold">Transit</p>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="flex flex-row" style={{justifyContent: 'space-between', alignItems: 'center'}}>
                                    <label className="p-1 text-black w-5/6">00:00 - 06:00</label>
                                    <FormControlLabel className='w-1/6' control={<Checkbox />} style={{color: '#595959'}} />
                                </div>
                                <div className="flex flex-row" style={{justifyContent: 'space-between', alignItems: 'center'}}>
                                    <label className="p-1 text-black w-5/6">06:00 - 12:00</label>
                                    <FormControlLabel className='w-1/6' control={<Checkbox />} style={{color: '#595959'}} />
                                </div>
                                <div className="flex flex-row" style={{justifyContent: 'space-between', alignItems: 'center'}}>
                                    <label className="p-1 text-black w-5/6">12:00 - 18:00</label>
                                    <FormControlLabel className='w-1/6' control={<Checkbox />} style={{color: '#595959'}} />
                                </div>
                                <div className="flex flex-row" style={{justifyContent: 'space-between', alignItems: 'center'}}>
                                    <label className="p-1 text-black w-5/6">18:00 - 24:00</label>
                                    <FormControlLabel className='w-1/6' control={<Checkbox />} style={{color: '#595959'}} />
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion disableGutters>
                            <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                                <p className="font-bold">Airlines</p>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="flex flex-row" style={{justifyContent: 'space-between', alignItems: 'center'}}>
                                    <label className="p-1 text-black w-5/6">Garuda Indonesia</label>
                                    <FormControlLabel className='w-1/6' control={<Checkbox />} style={{color: '#595959'}} />
                                </div>
                                <div className="flex flex-row" style={{justifyContent: 'space-between', alignItems: 'center'}}>
                                    <label className="p-1 text-black w-5/6">Air Asia</label>
                                    <FormControlLabel className='w-1/6' control={<Checkbox />} style={{color: '#595959'}} />
                                </div>
                                <div className="flex flex-row" style={{justifyContent: 'space-between', alignItems: 'center'}}>
                                    <label className="p-1 text-black w-5/6">Lion Air</label>
                                    <FormControlLabel className='w-1/6' control={<Checkbox />} style={{color: '#595959'}} />
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion disableGutters>
                            <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                                <p className="font-bold">Ticket Price</p>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className="flex flex-row" style={{justifyContent: 'space-between', alignItems: 'center'}}>
                                    <p style={{color: '#6B6B6B', fontSize: 10, fontWeight: '500'}}>Lowest</p>
                                    <p style={{color: '#6B6B6B', fontSize: 10, fontWeight: '500'}}>Highest</p>
                                </div>
                                <div className="flex flex-row" style={{justifyContent: 'space-between', alignItems: 'center'}}>
                                <Slider
                                    valueLabelDisplay="auto"
                                    value={price}
                                    onChange={(e,value) => setPrice(value)}
                                    step={5}
                                    min={0}
                                    max={600}
                                />
                                </div>
                                <div className="flex flex-row" style={{justifyContent: 'space-between', alignItems: 'center'}}>
                                    <h3 style={{color: '#2395FF', fontWeight: 'bold', fontSize: 15}}>$ {price[0]},00</h3>
                                    <h3 style={{color: '#2395FF', fontWeight: 'bold', fontSize: 15}}>$ {price[1]},00</h3>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                </div>
                <div className='w-3/4 p-5'>
                    <div className='flex'style={{justifyContent: 'space-between', alignItems: 'center'}}>
                        <div className='flex' style={{alignItems: 'center'}}>
                            <h1 style={{color: 'black', fontWeight: 'bold'}}>Select Ticket</h1>
                            <h3 className='ps-1' style={{color: '#979797', fontWeight: 'bold', fontSize: 12}}>({data?.data?.length || 0} flight found)</h3>
                        </div>
                        <div className='flex' style={{alignItems: 'center'}}>
                            <h3 style={{color: 'black', fontWeight: 'bold', fontSize: 12}}>Sort by</h3>
                            <Image className='ps-1' src="/asset/ttb.svg" width={12} height={12} />
                        </div>
                    </div>
                    {data.data && data?.data?.map((item,index) => {
                        return (
                        <div className='w-full p-5 my-3' style={{backgroundColor: 'white', borderRadius: 10}}>
                            <div className='flex' style={{alignItems: 'center'}}>
                                <Image className='me-5' src="/asset/garuda.png" width={100} height={50} />
                                <h1 style={{color: 'black', fontWeight: '400'}}>{item.plane_name}</h1>
                            </div>
                            <div className='flex' style={{alignItems: 'center'}}>
                                <div className='w-1/5 p-1'>
                                    <div className='flex pt-3' style={{justifyContent: 'space-between', alignItems: 'center'}}>
                                        <h1 className='me-5' style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>{item.origin_country}</h1>
                                        <Image className='me-5' src="/asset/airplane.svg" width={20} height={20} />
                                        <h1 style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>{item.destination_country}</h1>
                                    </div>
                                    <div className='flex' style={{justifyContent: 'space-between', alignItems: 'center'}}>
                                        <h3 style={{color: '#979797', fontWeight: '500', fontSize: 10}}>{`${new Date(item.takeoff).getHours()  < 10 ? '0'+ new Date(item.takeoff).getHours() : new Date(item.takeoff).getHours()} : ${new Date(item.takeoff).getMinutes() < 10 ? '0'+ new Date(item.takeoff).getMinutes() : new Date(item.takeoff).getMinutes()}`}</h3>
                                        <h3 style={{color: '#979797', fontWeight: '500', fontSize: 10}}>{`${new Date(item.landing).getHours()  < 10 ? '0'+ new Date(item.landing).getHours() : new Date(item.landing).getHours()} : ${new Date(item.landing).getMinutes() < 10 ? '0'+ new Date(item.landing).getMinutes() : new Date(item.landing).getMinutes()}`}</h3>
                                    </div>
                                </div>
                                <div className='w-1/5 p-1'>
                                    <div className='flex flex-col pt-3' style={{alignItems: 'center'}}>
                                        <h3 style={{color: '#595959', fontWeight: '500', fontSize: 15}}>{item.duration}</h3>
                                        <h3 style={{color: '#595959', fontWeight: '500', fontSize: 10}}>{ item.transit ? `(${item.transit} transit)` : '(Direct)'}</h3>
                                    </div>
                                </div>
                                <div className='flex w-1/5' style={{justifyContent: 'space-evenly'}}>
                                    <Image src="/asset/luggage.svg" width={25} height={25} />
                                    <Image src="/asset/burger.svg" width={20} height={20} />
                                    <Image src="/asset/wifi.svg" width={20} height={20} />
                                </div>
                                <div className='flex w-1/5' style={{justifyContent: 'center'}}>
                                    <h5 className='flex' style={{color: '#2395FF', fontWeight: '500', alignItems: 'flex-end'}}>$ {item.price},00 <p style={{fontSize: 15, color: '#979797', paddingLeft: 3}}>/pax</p></h5>
                                </div>
                                <div className='w-1/5'>
                                    <Button href={`../booking/${item.ticket_id}`} className='w-full' variant="contained" style={{backgroundColor: '#2395FF'}} >Select</Button>
                                </div>
                            </div>
                            <h3 className='pt-3' style={{color: '#2395FF', fontWeight: 'bold', fontSize: 12}}>View Details</h3>
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
  
export default FindTicketPage