const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/client");

router.get("/clients/:userId", userCtrl.getClients);
router.post("/clients/:userId", userCtrl.addClients)
router.delete("/clients/:userId", userCtrl.deleteClients)
router.put("/clients/:userId", userCtrl.updateClients)

module.exports = router;