const express = require('express');
const candidats = require('../controllers/candidat.controller');

const router = express.Router();

router.post("/", candidats.create);
router.get("/", candidats.findAll);
router.get("/:id", candidats.findOne);
router.put("/:id", candidats.update);
router.delete("/:id", candidats.delete);
router.delete("/", candidats.deleteAll);

module.exports = router