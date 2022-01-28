const express = require('express');
const entretients = require('../controllers/entretient.controller');

const router = express.Router();

router.post("/", entretients.create);
router.get("/", entretients.findAll);
router.get("/findDateORHour/", entretients.findDateORHour);
router.get("/:id", entretients.findOne);
router.put("/:id", entretients.update);
router.delete("/:id", entretients.delete);
router.delete("/", entretients.deleteAll);

module.exports = router