const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Users Page");
});

router.get("/new", (req, res) => {
  res.send("New User Page");

  res.render("index", { name: "Nati!" });
});

module.exports = router;
