import { UploadFile } from '@mui/icons-material';
import { Box, Button, Modal, TextField, Typography } from '@mui/material'
import { Stack } from '@mui/system';
import React, { memo, useRef, useState } from 'react'
import { client } from '../App';

const style = {
  height:"auto",
  width:"auto",
  borderRadius:"5px",
  boxShadow:"5px 10px 5px rgba(0,0,0,0.5)",
  background:"#FFFFFF",
  padding:"20px"
}

const AddProduct = ({open, setOpen, config}) => {

  const handleFile = useRef();
  const [photosUpload, setPhotosUpload] =  useState([]);
  
  const [product, setProduct] = useState({
    name : "",
    price : "",
    stock: "",
    photos:[]
  });

  const handleFileUpload = ()  => {
      handleFile.current.click();
  }
  
  const handleClose = () => {
    setOpen(false);
  };


  const handleProduct = (event) => {
        event.preventDefault();
        setProduct({
          name:event.target.elements.name.value,
          price:event.target.elements.price.value,
          stock:event.target.elements.stock.value,
          photos:photosUpload
        });
       
        client.post('/product',config,product)
          .then(response => console.log(response))
          .catch(error => console.log(error));

        
  };

  return (
    
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{display:"flex" , justifyContent:"center" , alignItems:"center"}}
      >
        <Box sx={style}>

           <form action=""  onSubmit={handleProduct}>
            <Stack direction="column" justifyContent="space-between">
                  <Typography variant="h4" fontWeight={700} color="secondary" sx={{textAlign:"center"}}>Create Product</Typography>
                  
                  <Box sx={{marginTop:"20px", width:"100%", padding:"50px"}} >

                  <Stack direction="column" justifyContent="space-between" alignItems="center" gap={4}>
                          <Stack direction="column" gap={3} >
                                <TextField name="name" id="outlined-basic" label="Product Name . . . ." variant="outlined"  />
                               
                                <Stack direction="row" gap={1}>
                                  <TextField name="price" id="outlined-basic" label="Price . . . ." variant="outlined" />
                                  <TextField name="stock" id="outlined-basic" label="Stock . . . ." variant="outlined" />
                                </Stack>

                                <Button startIcon={<UploadFile/>} onClick={handleFileUpload} color="secondary" variant="outlined">
                                    Upload File
                                    <input type="file" onChange={(e) =>setPhotosUpload([e.target.files]) } name="photos[]"  ref={handleFile} multiple hidden />
                                </Button>
                            </Stack>
                  </Stack>

                  </Box>

                  <Button type="submit" variant="contained" color='secondary' size="large" >Add Product</Button>
              </Stack>
           </form>

        </Box>
    </Modal>
  )
}

export default memo(AddProduct);