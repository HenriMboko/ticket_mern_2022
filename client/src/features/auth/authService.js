import axios from 'axios';

const API_URL = " /api/users/register";
const API_URL_BASE = "/api/users/login"

//regisetr user services
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data))
    }

    return response.data
}

//Login user services
const loginUser = async (userData) => {
    const response = await axios.post(API_URL_BASE, userData)

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data))
    }

    return response.data
}

//logout user services

const logout = () => localStorage.removeItem("user")



const authService = {
    register,
    loginUser,
    logout
}

export default authService