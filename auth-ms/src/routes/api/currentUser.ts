import express from "express";
import authMiddleware from "../../../middleware/auth";

import currentUser from "../../../middleware/currentUser";


const router = express.Router();


router.get("/users/current-user", currentUser, authMiddleware, (req, res) => {
    //  The currentUser middleware check the session token and set currentuser from the jwt payload
    const currentUser = req.currentUser

    res.send({ currentUser })
})


router.put("/users/current-user/update", (req, res) => {
    res.send("Update current user.")

})
export default router;