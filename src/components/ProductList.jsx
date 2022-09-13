import { Add, Delete, Edit, Home, Info } from '@mui/icons-material';
import { Box, Breadcrumbs, Fab, IconButton, Paper, Stack, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import { client } from '../App';
import AddProduct from './AddProduct';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

const ProductList = () => {

    const cookies  = new Cookies();
    const token = cookies.get("token");
    const config = {
        headers: {'Authorization': 'Bearer ' + token}
    };

    const [open, setOpen] = useState(false);
    const [products , setProducts] = useState([]);

    
    const handleDelete = (event) => {
      client.delete("/product/"+event, config)
      .then((res) => {
          window.location.reload();
      })
      .catch(error => {
        console.log(error);
      })
    }

    useEffect(() => {
        
        client.get('/product',config)
                 .then((res) => {
                    setProducts(res.data.data);
                    toast.success("delete is successful", {
                      position: "bottom-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      });
                 })
                 .catch(error => console.log(error));

    }, []);


  return (
    <Box>
               <Box sx={{boxShadow:"3px 3px 5px rgba(0, 0, 0, 0.5)", padding:"10px", marginBottom:"30px", borderRadius:"5px" }}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link to="/"><Home/></Link>
                        <Typography color="text.primary">Product Lists</Typography>
                    </Breadcrumbs>
               </Box>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">#</StyledTableCell>
                            <StyledTableCell align="left">Name</StyledTableCell>
                            <StyledTableCell align="left">Price</StyledTableCell>
                            <StyledTableCell align="left">Stock</StyledTableCell>
                            <StyledTableCell align="left">Owner</StyledTableCell>
                            <StyledTableCell align="left">Controller</StyledTableCell>
                            <StyledTableCell align="left">Date / Time</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        
                       {products.map(data => (
                        <StyledTableRow key={data.id}>
                            <StyledTableCell align="left">{data.id}</StyledTableCell>
                            <StyledTableCell align="left">{data.name}</StyledTableCell>
                            <StyledTableCell align="left">{data.price_status}</StyledTableCell>
                            <StyledTableCell align="left">{data.stock_status}</StyledTableCell>
                            <StyledTableCell align="left">{data.owner.name}</StyledTableCell>
                            <StyledTableCell align="center">
                                 <Stack direction="row" gap={1}>
                                 <IconButton sx={{border:"1px solid #1976D2"}} > <Info color="primary"/></IconButton>
                                  <IconButton sx={{border:"1px solid #CE93D8"}}> <Edit color="secondary" sx={{fontsize:"20px"}}/></IconButton>
                                  <IconButton sx={{border:"1px solid #F44336"}} onClick={() => handleDelete(data.id)}><Delete color="error"/></IconButton>
                                 </Stack>
                            </StyledTableCell>
                            <StyledTableCell left="left">{data.date}</StyledTableCell>
                        </StyledTableRow>
                       ))}
          
        </TableBody>
      </Table>
    </TableContainer>

      
      <AddProduct open={open} setOpen={setOpen} token={token} config={config} />
      
      <Fab color="primary" aria-label="add" sx={{position:"fixed", bottom:"20px"}} onClick={() => setOpen(true)}>
        <Add />
      </Fab>

    </Box>
  )
}

export default memo(ProductList)