import React from 'react';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HeaderComponent from './components/HeaderComponent';
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import NewTicket from './pages/NewTicket';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className='container'>
          <HeaderComponent />
          <Routes>
            <Route path='/' element=<HomePage /> />
            <Route path='/login' element=<LoginPage /> />
            <Route path='/register' element=<RegisterPage /> />
            <Route path='/new-ticket' element={<PrivateRoute />}>
              <Route path='/new-ticket' element={<NewTicket />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
