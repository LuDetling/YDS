const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/client");

router.get("/clients", userCtrl.showClients);

module.exports = router;