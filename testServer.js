require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/subscriber", async (req, res) => {
  const { email } = req.body;
  res.status(200).json({ email: email });
});

app.listen(PORT, () => {
  console.log(`Test Server running on http://localhost:${PORT}`);
});
