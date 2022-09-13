import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../components/Home'
import Login from '../components/Login'
import Register from '../components/Register'
import Cookies from 'universal-cookie'
import NotFound from '../components/NotFound'
import Navbar from '../components/Navbar'
import { Box, createTheme, Stack, ThemeProvider } from '@mui/material'
import Sidebar from '../components/Sidebar'
import Rightbar from '../components/Rightbar'
import AddProduct from '../components/AddProduct'
import ProductList from '../components/ProductList'

const Router = () => {

  const [mode, setMode] = useState("light");

  const darkMode = createTheme({
    palette: {
      mode:mode
    }
  })

  const cookies =new Cookies();

  return (
    <ThemeProvider theme={darkMode}>
      <BrowserRouter>
          <Navbar />

          {cookies.get("token") ?
            <Box mt={6} bgcolor={"background.default"} color={"text.primary"}>
                 <Stack direction="row" gap={1}>
                      
                    <Sidebar mode={mode} setMode={setMode}/>

                      <Box  p={2}  flex={5} sx={{ height:"100vh"}}>
                          <Routes>
                              <Route path="/" element={<Home />}></Route>
                              <Route path="/home" element={<Home />}></Route>
                              <Route path="/products_list" element={<ProductList />}></Route>
                              <Route path="*" element={<NotFound />}></Route>
                          </Routes> 
                      </Box>

                  
                     <Rightbar />
                     
                 </Stack>
            </Box>
              
            :
            <Routes>
                <Route path="/login" element={<Login />}></Route>  
                <Route path="/register" element={<Register />}></Route>
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        }
    
    </BrowserRouter>
    </ThemeProvider>
    
  )
}

export default Router;