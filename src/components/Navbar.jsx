import { AppBar, Avatar, Button, Stack, styled, Typography } from '@mui/material'
import { deepPurple } from '@mui/material/colors';
import React from 'react'
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';


const Navbar = () => {

const cookies = new Cookies();

  const CustomAppBar = styled(AppBar)({
    padding:"5px 10px",
    color:"#FFFFFF",
  });
  


  return (
    <div>
        <CustomAppBar position="fixed">
            <Stack direction="row" sx={{display:"flex", justifyContent:"space-between"}}>
                <Typography variant="h5" fontWeight={700}>Anchor</Typography>

               {
                cookies.get("token") ? 
                <Stack position="row" align="center" >
                    <Avatar sx={{bgcolor:deepPurple[800]}}>Z</Avatar>
                </Stack>
                :
                <Stack direction="row" spacing={1} align="center">
                    <Link to="/login" style={{color: 'white', textDecoration: 'none'}}>
                        <Button  variant="contained" color="secondary"> Login</Button>
                    </Link>

                    <Link to="/register" style={{color: 'white', textDecoration: 'none'}}>
                        <Button  variant="contained" color="secondary">Register</Button>
                    </Link>
                </Stack>
               }
            </Stack>
        </CustomAppBar>
    </div>
  )
}

export default Navbar