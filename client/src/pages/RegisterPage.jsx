import React ,{useEffect} from 'react'
import { useState } from 'react';
import {FaUser} from "react-icons/fa";
import {toast} from "react-toastify"
import {useSelector, useDispatch} from "react-redux"
import { register ,reset } from '../features/auth/authnSlice';
import {useNavigate} from "react-router-dom";
import Spinner from '../components/Spinner';


export default function RegisterPage() {

const [formData, setformData] = useState({
  name: "",
  email : "",
  password : "",
  password2 : "",
})

const navigate = useNavigate()


const {name, email,password, password2} = formData;

const dispatch = useDispatch()

const {user, isLoading, isError ,  message, isSuccess} = useSelector(state =>state.auth)



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



const handlCHange = (e) =>{
  setformData({...formData, [e.target.name]: e.target.value})
}




async function handlSubmit(e){
  e.preventDefault();
  if(password !== password2 ){
    toast.error("Password do not match")
  }else{
    const userDate = {
      name,
      email,
      password,
    }

    dispatch(register(userDate))
  }
}

if(isLoading){
  return <Spinner/>
}


  return (
    <>
      <section className="heading">
        <h1>
          <FaUser/> Register 
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form onSubmit={handlSubmit}>
          <div className='form-group'>
            <input 
            type="text" 
            className="form-control"
            id="name"
            name = "name"
            value={formData.name}
            placeholder = "Enter Your name"
            onChange={handlCHange}
            required
             />
          </div>
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
            <input 
            type="password" 
            className="form-control"
            id="password2"
            name = "password2"
            value={formData.password2}
            placeholder = "Confirm Your Password"
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
