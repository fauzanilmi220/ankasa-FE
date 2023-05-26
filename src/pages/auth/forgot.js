import * as React from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useMediaQuery } from "@material-ui/core";

function ForgotPasswordPage() {
    const [showImg, setShowImg] = React.useState(true);

    let monitor = useMediaQuery("(min-width:958px)");
    
    React.useEffect(() => {
      if (monitor) {
        setShowImg(true)
      } else {
        setShowImg(false)
      }
    },[monitor])

    return (
      <div className='flex flex-row w-100'>
        {showImg && <img src='/asset/banner_auth.png' className='h-screen' />}
        <div style={{width: '100%'}}>
          <Container className='h-screen px-20' style={{backgroundColor:'white'}}>
            <div className='flex flex-row pt-10'>
              <img src='/asset/logo.png' style={{height:'30px'}}/>
              <h5 style={{color:'grey', fontWeight: 'bold', fontSize: '20px', marginLeft: 15}}>Ankasa</h5>
            </div>
            <div className='flex flex-col'>
              <h3 style={{color:'black', fontWeight: 'bold', fontSize: '30px', marginTop: 100}}>Forgot Password</h3>
              <TextField id="standard-basic" label="Email" variant="standard" sx={{width: 'full', marginTop: '20px'}} />
              <Button href='verify' variant="contained" style={{backgroundColor: '#2395FF'}} sx={{width: 'full', marginTop: '20px', marginBottom: '20px'}}>Send</Button>
              <Button style={{color: '#595959'}} disabled>You’ll get message soon on your email</Button>
            </div>
          </Container>
        </div>
      </div>
    )
}
  
export default ForgotPasswordPage