const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Users Page");
});

router.get("/new", (req, res) => {
  res.send("New User Page");
});

module.exports = router;
