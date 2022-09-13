import { Box } from '@mui/material'
import React from 'react'

const Rightbar = () => {

  

  return (
    <Box  p={2}  flex={2} sx={{ height:"100vh", display:{xs:"none",sm:"block", md:"block"}, borderLeft:"1px solid rgb(182, 182, 182)"}}>
            <Box position="fixed">
                RightBar
            </Box>
    </Box>
  )
}

export default Rightbar