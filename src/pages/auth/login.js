import * as React from 'react';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useMediaQuery } from "@material-ui/core";
import axios from 'axios';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import Head from 'next/head';

function LoginPage() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [showImg, setShowImg] = React.useState(true);
    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    let monitor = useMediaQuery("(min-width:958px)");

    React.useEffect(() => {
      if (cookies.token) {
          router.replace('../user/profile')
      }
    },[cookies.token])
    
    React.useEffect(() => {
      if (monitor) {
        setShowImg(true)
      } else {
        setShowImg(false)
      }
    },[monitor])

    const LoginForm = async () => {
      let data = {
        email: email,
        password: password
      }
      await axios.post(process.env.API_URL+'/users/login',data).then(function(response) {
        setCookie('token',response.data.data.token,{
          path: '/'
        })
        router.push('../user/profile')
        console.log(response)
      }).catch(function(error) {
        console.log(error)
      })
    }

    return (
      <div className='flex flex-row w-100'>
        <Head>
          <title>Login</title>
        </Head>
        {showImg && <img src='/asset/banner_auth.png' className='h-screen' />}
        <div style={{width: '100%'}}>
          <Container className='h-screen px-20' style={{backgroundColor:'white'}}>
            <div className='flex flex-row pt-10'>
              <img src='/asset/logo.png' style={{height:'30px'}}/>
              <h5 style={{color:'grey', fontWeight: 'bold', fontSize: '20px', marginLeft: 15}}>Ankasa</h5>
            </div>
            <div className='flex flex-col' style={{marginTop: 50}}>
              <h3 style={{color:'black', fontWeight: 'bold', fontSize: '30px', marginTop: 50}}>Login</h3>
              <TextField id="standard-basic" label="Username" onChange={(e) => setEmail(e.target.value)} variant="standard" sx={{width: 'full', marginTop: '20px'}} />
              <FormControl sx={{width: 'full', marginTop: '20px'}} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) => setPassword(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Button onClick={() => LoginForm()} className='w-full' variant="contained" style={{backgroundColor: '#2395FF'}} sx={{marginTop: '20px', marginBottom: '20px'}}>Sign In</Button>
              <Button style={{color: '#595959'}} disabled>Did you forgot your password?</Button>
              <Button href='forgot' variant="text">Tap here for reset</Button>
            </div>
          </Container>
        </div>
      </div>
    )
  }
  
  export default LoginPage