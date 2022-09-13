
import { Box, Button, Input, Stack, styled, Typography } from '@mui/material';
import React, { memo }  from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { client } from '../App';

// Styles
  const FormBoxContainer = styled(Box)({
    width: '100%', 
    height: '100vh', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  })

  const FormBox = styled(Box)({
    backgroundColor:"#FFFFFF",
    borderRadius: "5px",
    boxShadow:"3px  3px 7px grey",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  })


const Login = () => {


// Concept Of Form And Send Data To Server
const cookies = new Cookies();
const navigate = useNavigate();
 
const [loginData, setDataLogin] = useState({email:"",password:""});
const [error, setError] = useState([]);

const handleLogin = (event) => {
    event.preventDefault();

            setDataLogin({
                email: event.target.elements.email.value,
                password: event.target.elements.password.value
            })

      client.post("/login", loginData)
            .then((response) => {
                const token = response.data.token;
                cookies.set("token",token);
                setDataLogin({email:"",password:""});
                setError([]);
                navigate("/home");
                window.location.reload();
            })
            .catch(er => {
              setError(er.response.data.errors);
            })
  };

  return (

    <FormBoxContainer sx={{padding:{xs:"20px"}}}>
        
        <FormBox width={400} height={400} p={4}>
              <form onSubmit={handleLogin} style={{ width: '100%',display: 'flex',flexDirection: 'column',alignItems: 'center' }}>  

                    <Typography variant="h4" mb={5} fontWeight={700} color="secondary">Login</Typography>

                    <Stack variants="column"width="100%" gap={5}>
                          <div>
                                <Input 
                                  sx={{ width: '100%'}}
                                  type="email" 
                                  value={loginData.email}
                                  onChange={e => setDataLogin((prev) =>({
                                    ...prev,email:e.target.value
                                  }))}
                                  name="email" 
                                  placeholder="Email"/>

                                {error.email && <small  style={{color:"red"}}>{error.email}</small>}
                          </div>

                          <div>
                              <Input 
                                sx={{ width: '100%'}}
                                type="password"
                                value={loginData.password}
                                onChange={e => setDataLogin((prev) =>({
                                  ...prev,password:e.target.value
                                }))}
                                name="password" 
                                placeholder="Password"/>

                              {error.password && <small style={{color:"red"}}>{error.password}</small>}
                          </div>

                  
                    </Stack>
                    <Button sx={{width: '50px', marginTop: '50px'}} size='small' variant='contained' color='secondary' type="submit">Login</Button>

                </form>
        </FormBox>
        
    </FormBoxContainer>

  )
}

export default  memo(Login);
