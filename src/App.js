import { Box, styled } from '@mui/material';
import axios from 'axios';
import React from 'react';
import Router from './router/Router';

export const client = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
});


export const formBox = styled(Box)({
  width: '100%', 
  height: '100vh', 
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'red',
})


function App() {

  return (
    <div className="App">

          <Router />

    </div>
  );
}

export default App;
