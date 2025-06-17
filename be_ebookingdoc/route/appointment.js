const express = require("express");
const router = express.Router();
const controller = require("../src/controller/appointment_controller");
const { checkLogin } = require("../src/api/middleware/check_login");



router.get("/", checkLogin, async (req, res, next) => {
    try {
      res.json(await controller.getAppointments());
    } catch (error) {
      next(error);
    }
  });

  router.post("/crate-appointments", checkLogin, async (req, res, next) => {
    try {
      res.json(await controller.createAppointments(req.body));
    } catch (error) {
      next(error);
    }
  });



  

module.exports = router;