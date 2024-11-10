require("dotenv").config();
const MailerLite = require("@mailerlite/mailerlite-nodejs").default;
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const USER_ID = '1234';

app.post("/api/subscriber", async (req, res) => {
  const { email } = req.body;
  res.status(200).json({ email: email });
});

app.post("/api/sendMail", async (req, res) => {
  const { user } = req.body;
  if (user !== USER_ID) {
    res.status(500).json({ error: "Unauthorized User" });
    return;
  }
  res.status(200).json({user: user});
});

app.get("/api/ping", async (req, res) => {
  res.status(200).json({message: "Test Pong"});
});

app.listen(PORT, () => {
  console.log(`Test Server running on http://localhost:${PORT}`);
});
