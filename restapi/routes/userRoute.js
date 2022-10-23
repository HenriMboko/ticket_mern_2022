const userRouter = require('express').Router();
const { registerUser, loginUser, getMe } = require("../controllers/userController");
const { protect } = require('../middleware/authMiddleware');


userRouter.get("/", (req, res) => {
    res.send("this get user");
})
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get('/me', protect, getMe)



module.exports = userRouter;