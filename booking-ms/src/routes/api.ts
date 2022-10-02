import express from "express";

const router = express.Router();

router.get("/booking", (req, res) => {
    res.send("Welcome to Booking-ms")

})

export default router