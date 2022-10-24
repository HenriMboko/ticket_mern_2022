import axios from "axios";


const API_URL = "/api/tickets/createtickets";



const creatTickets = async (tickeData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(API_URL, tickeData, config);

    return response.data
}

const ticketService = {
    creatTickets
}


export default ticketService