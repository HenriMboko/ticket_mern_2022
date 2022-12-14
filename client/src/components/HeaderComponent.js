import React from 'react';

import { FaSignInAlt, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authnSlice';

export default function HeaderComponent() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);


    async function oneLogout() {
        dispatch(logout());
        dispatch(reset());
        navigate('/')
    }


    return (
        <header className='header'>
            <div className='logo'>
                <Link to="/" Support >Support Desk</Link>
                <ul>
                    {user ? (
                        <li>
                            <button className='btn' onClick={oneLogout}><FaSignOutAlt />Logout</button>
                        </li>
                    ) : (
                        <>
                            <li>
                                <Link to="/login">
                                    <FaSignInAlt />Login
                                </Link>
                            </li>
                            <li>
                                <Link to="/register">
                                    <FaUser />Register
                                </Link>
                            </li>
                        </>

                    )}
                </ul>
            </div>
        </header>
    )
}
