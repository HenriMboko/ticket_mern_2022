import React,{useState} from 'react'
import { useSelector } from "react-redux";
//import {useNavigate} from "react-router-dom";
//import Spinner from "../components/Spinner"
//import {toast} from "react-toastify";
//import {createTicket , reset} from "../features/ticket/ticketSlice"
//import BackButton from "../components/BackButton";


export default function NewTicket() {


    const {user} = useSelector((state)=>state.auth);
    //const {isLoading, isError, message, isSuccess} = useSelector((state)=>state.ticket)


    const [name] = useState(user.name);
    const [email] = useState(user.email);
    const [product, setProduct] = useState("");
    const [description, setDescription] = useState("");


    //const dispatch = useDispatch();
    //const navigate = useNavigate();

    // useEffect(()=>{
    //   if(isError){
    //     toast.error(message)
    //   }
    
    //   if(isSuccess){
    //     dispatch(reset())
    //     navigate('/tickets')
    //   }
    
    //   dispatch(reset())
    // },[dispatch, isError, isSuccess, navigate, message])
    


async function onSubmit(e){
  //e.preventDault()
  //dispatch(createTicket({product, description}))
}

// if(isLoading){
//   return <Spinner />
// }



  return (
    <>
    <section className="heading">
    <h2>New Ticket</h2>
    <p>Please fil out the from below</p>
    </section>

    <section className="form">
        <div className="form-group">
            <label htmlFor='name'>Customer Name</label>
            <input value={name} type="text" className="form-controler" disabled />
        </div>
        <div className="form-group">
            <label htmlFor='email'>Customer Email</label>
            <input value={email} type="text" className="form-controler" disabled />
        </div>

        <form onSubmit={onSubmit}>
        <div className="form-group">
        <label htmlFor='product'>Product</label>
        <select
         onChange={(e)=>setProduct(e.target.value)}
          name='product' type="text" id="product" value={product}>
             <option value="Ipad">Ipad</option>
            <option value="Iphone Pro">Iphone Pro</option>
            <option value="Imac">Imac</option>
            <option value="Hp Probook">Hp Probook</option>
          </select>
        </div>
        <div className="form-group">
        <label htmlFor='description'>Description of the issue</label>
        <textarea 
        onChange={(e)=>setDescription(e.target.value)} 
        value={description} 
        className='form-control'
         placeholder='Description' 
         name='description' 
         id='description'></textarea>
        </div>
        <div className="form-group">
            <button className='btn btn-group'>Submit</button>
        </div>
        </form>
    </section>
    
    </>
  )
}
