import express from "express";
import { currentUserMiddlewar, authMiddleware } from "@rooma/common-ms";


const router = express.Router();


router.get("/users/current-user", currentUserMiddlewar, authMiddleware, (req, res) => {
    //  The currentUser middleware check the session token and set currentuser from the jwt payload
    const currentUser = req.currentUser
    console.log('currentUser :::>>>', currentUser)
    res.send({ currentUser })
})


router.put("/users/current-user/update", (req, res) => {
    res.send("Update current user.")

})
export default router;