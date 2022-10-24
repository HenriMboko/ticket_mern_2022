const tickeRoute = require("express").Router();
const { getTicket, createTicket, getTicketById, updateTicket, deleteTicket } = require("../controllers/ticketController")
const { protect } = require("../middleware/authMiddleware")


//tickeRoute.route('/').get(protect, getTicket).post(protect, createTicket)

tickeRoute.get("/", protect, getTicket);
tickeRoute.post("/createtickets", protect, createTicket);
tickeRoute.get("/:id", protect, getTicketById);
tickeRoute.delete("/:id", protect, deleteTicket);
tickeRoute.put("/:id", protect, updateTicket);

module.exports = tickeRoute;