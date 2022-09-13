import { Box, Button, Input, Stack, styled, Typography } from '@mui/material';
import React, { memo, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { client } from '../App';
import Login from './Login';

const FormBoxContainer = styled(Box)({
  width: '100%',
  height:'100vh',
})

const FormBox = styled(Box)({
  width: '400px',
  height: 'auto',
  background: 'white',
  borderRadius: '5px',
  boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)',
})

const Register = () => {

  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password:"",
    password_confirmation: "",
  });

  const [error, setError] = useState({});

  const handleRegister = (event) => {
    event.preventDefault();
    setRegisterData({
      name:event.target.elements.name.value,
      email:event.target.elements.email.value,
      password:event.target.elements.password.value,
      password_confirmation:event.target.elements.confirmPassword.value
    });

    client.post('/register',registerData)
        .then((response) => {
            setRegisterData({
              name: "",
              email: "",
              password:"",
              password_confirmation: "",
            });
            setError({});
            navigate("/login")
            console.log(response);
        })
        .catch((er) => {
          setError(er.response.data.errors);
        })

  }
 

  return (
    <FormBoxContainer sx={{padding:{xs:"20px"}}} display="flex"  justifyContent="center" alignItems="center">
        <FormBox p={5} >
          <form onSubmit={handleRegister} style={{display:"flex", flexDirection:"column", alignItems: 'center'}}>

                    <Typography marginBottom={3} color="secondary" variant="h5" fontWeight="700">Register</Typography>

                    <Stack variants="column" mb={4} gap={3} sx={{ width: '100%'}}>

                            <div>
                                <Input  
                                  sx={{width: '100%'}}
                                  name='name'
                                  type='text'
                                  placeholder='username . . .'
                                  value={registerData.name}
                                  onChange={(event) => setRegisterData((prev) => ({...prev,name: event.target.value}))}
                                />
                                {error.name && <small style={{color:"red"}}>{error.name}</small>}
                            </div>

                            <div>
                                <Input  
                                  sx={{width: '100%'}}
                                  name='email'
                                  type='email'
                                  placeholder='email . . .'
                                  value={registerData.email}
                                  onChange={(event) => setRegisterData((prev) => ({...prev,email: event.target.value}))}
                                />
                                {error.email && <small style={{color:"red"}}>{error.email}</small>}
                            </div>

                            <div>
                                <Input  
                                  sx={{width: '100%'}}
                                  name='password'
                                  type='password'
                                  placeholder='password . . .'
                                  value={registerData.password}
                                  onChange={(event) => setRegisterData((prev) => ({...prev,password: event.target.value}))}
                                />
                                {error.password && <small style={{color:"red"}}>{error.password}</small>}
                            </div>

                            <div>
                                <Input  
                                  sx={{width: '100%'}}
                                  name='confirmPassword'
                                  type='password'
                                  placeholder='confirmPassword . . .'
                                  value={registerData.password_confirmation}
                                  onChange={(event) => setRegisterData((prev) => ({...prev,password_confirmation: event.target.value}))}
                                />
                                {error.password && <small style={{color:"red"}}>{error.password}</small>}
                            </div>
                    </Stack>

                    <Button type="submit" color="secondary" variant='contained'>Register</Button>

              </form>

          </FormBox>
    </FormBoxContainer>
  )
}

export default memo(Register)
