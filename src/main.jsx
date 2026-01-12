import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {Provider} from 'react-redux';
import { reduxStore } from './store/index.js'
import { ToastContainer } from 'react-toastify';
import 'flowbite';
import './index.css'
import "flowbite";




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={reduxStore}>
      <BrowserRouter>
        <ToastContainer />
        <App/>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
