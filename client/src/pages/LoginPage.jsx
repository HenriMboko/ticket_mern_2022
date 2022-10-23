import React from 'react'
import { useState , useEffect } from 'react';
import {FaSignInAlt} from "react-icons/fa";
import {toast} from "react-toastify"
import {useSelector, useDispatch} from "react-redux"
import { login , reset } from '../features/auth/authnSlice';
import {useNavigate} from "react-router-dom";
import Spinner from "../components/Spinner";

export default function LoginPage() {

const [formData, setformData] = useState({

  email : "",
  password : "",

})

const navigate = useNavigate();

const { email, password} = formData;

const {user, isLoading, isError, message, isSuccess} = useSelector(state =>state.auth)

const dispatch = useDispatch()


const handlCHange = (e) =>{
  setformData({...formData, [e.target.name]: e.target.value})
}

useEffect(() => {
  if(isError){
    toast.error(message)
  }

  //redirect When logged in 
  if(isSuccess || user){
    navigate('/')
  }

  dispatch(reset())
}, [isError ,  isSuccess, user ,message, navigate, dispatch])



async function handlSubmit(e){
  e.preventDefault();


  const userData = {
    email,
    password
  }

  dispatch(login(userData))
  
}

if(isLoading){
  return <Spinner/>
}

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt/> Login
        </h1>
        <p>Please login to get support</p>
      </section>

      <section className="form">
        <form onSubmit={handlSubmit}>
          
          <div className='form-group'>
            <input 
            type="email" 
            className="form-control"
            id="email"
            name = "email"
            value={formData.email}
            placeholder = "Enter Your Email"
            onChange={handlCHange}
            required
             />
          </div>
          <div className='form-group'> 
            <input 
            type="password" 
            className="form-control"
            id="password"
            name = "password"
            value={formData.password}
            placeholder = "Enter Your Password"
            onChange={handlCHange}
            required
             />
          </div>
    
          <div className='form-group'>
            <button type='submit' className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}
