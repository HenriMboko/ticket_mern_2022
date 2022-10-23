const tickeRoute = require("express").Router();
const { getTicket, createTicket } = require("../controllers/ticketController")
const { protect } = require("../middleware/authMiddleware")


//tickeRoute.route('/').get(protect, getTicket).post(protect, createTicket)

tickeRoute.get("/", protect, getTicket);
tickeRoute.post("/createtickets", protect, createTicket);

module.exports = tickeRoute;