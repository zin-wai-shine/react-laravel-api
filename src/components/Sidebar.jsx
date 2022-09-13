import { Add, DarkMode, Home, ListAlt, Logout, ProductionQuantityLimits, Settings } from '@mui/icons-material'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Switch, } from '@mui/material'
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';


const ListItemStyle = styled(ListItem)({
    marginBottom:"50px",
    borderRadius:"50px"
});

const ListItemTextStyle = styled(ListItemText)({
    
});

const Sidebar = ({mode, setMode}) => {

  const cookies = new Cookies();
  const navigate = useNavigate();

    const handleLogout = () => {
        cookies.remove("token");
        navigate("/login");
        window.location.reload();
  };

  return (
    <Box   p={2} flex={1} sx={{ height:"100vh", display:{xs:"none",sm:"none", md:"none", lg:"block"}, borderRight:"1px solid rgb(182, 182, 182)"}}>
        <Box>
        <Box position="fixed" padding={2} >
                <List > 
                    
                        <Link to="/"  style={{ textDecoration:"none" }} style={{ textDecoration:"none" }}>
                                    <ListItemStyle disablePadding sx={{marginTop:"50px"}}>
                                            
                                            <ListItemButton sx={{borderRadius:"50px",backgroundColor:mode === "light" ? "#D6D6D6" : "#000"}}>
                                                <ListItemIcon>
                                                    <Home  />
                                                </ListItemIcon>
                                                <ListItemTextStyle  primary="Home"/>
                                            </ListItemButton>
                                        
                                </ListItemStyle>
                        </Link>

                        <Link to="/"  style={{ textDecoration:"none" }}>
                            <ListItemStyle disablePadding>
                                    <ListItemButton sx={{borderRadius:"50px",backgroundColor:mode === "light" ? "#D6D6D6" : "#000"}}>
                                        <ListItemIcon>
                                            <ProductionQuantityLimits  />
                                        </ListItemIcon>
                                    
                                            <ListItemTextStyle  primary="Products"/>
                                        
                                    </ListItemButton>
                            </ListItemStyle>
                        </Link>
                
                        <Link to="/products_list"  style={{ textDecoration:"none" }}>
                            <ListItemStyle disablePadding>
                                    <ListItemButton  sx={{borderRadius:"50px",backgroundColor:mode === "light" ? "#D6D6D6" : "#000"}}>
                                        <ListItemIcon>
                                            <ListAlt  />
                                        </ListItemIcon>
                                    
                                            <ListItemTextStyle  primary="Product List"/>
                                        
                                    </ListItemButton>
                            </ListItemStyle>
                        </Link>

                   
                        <ListItemStyle disablePadding>
                                    <ListItemButton  sx={{borderRadius:"50px",backgroundColor:mode === "light" ? "#D6D6D6" : "#000"}}>
                                        <ListItemIcon>
                                            <DarkMode  />
                                        </ListItemIcon>
                                    
                                            <Switch onChange={(e) => setMode(mode === "light" ? "dark" : "light")}/>
                                        
                                    </ListItemButton>
                            </ListItemStyle>
                    

                       <Link to=""  style={{ textDecoration:"none" }}>
                        <ListItemStyle disablePadding>
                                    <ListItemButton sx={{borderRadius:"50px",backgroundColor:mode === "light" ? "#D6D6D6" : "#000"}}>
                                        <ListItemIcon>
                                            <Settings  />
                                        </ListItemIcon>
                                    
                                            <ListItemTextStyle  primary="Setting"/>
                                        
                                    </ListItemButton>
                            </ListItemStyle>
                       </Link>

                        <ListItemStyle disablePadding sx={{marginTop:"50px"}}>
                                <ListItemButton onClick={handleLogout} sx={{borderRadius:"50px",backgroundColor:"red"}}>
                                    <ListItemIcon>
                                        <Logout  />
                                    </ListItemIcon>
                                        <ListItemTextStyle  primary="Logout"/>
                                </ListItemButton>
                        </ListItemStyle>


                </List>
            </Box>
        </Box>
    </Box>
  )
}

export default Sidebar