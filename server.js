require("dotenv").config();
const MailerLite = require("@mailerlite/mailerlite-nodejs").default;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const API_KEY = process.env.MAILERLITE_API_KEY;
const GROUP_ID = process.env.GROUP_ID;

const mailerlite = new MailerLite({
  api_key: API_KEY,
});

app.post("/api/subscriber", async (req, res) => {
  const { email } = req.body;

  const params = {
    email: email,
  };

  mailerlite.subscribers
    .createOrUpdate(params)
    .then((response) => {
      const SUBSCRIBER_ID = response.data.data.id;
      mailerlite.groups
        .assignSubscriber(SUBSCRIBER_ID, GROUP_ID)
        .then((response) => {
          res.status(response.status).json(response.data);
        })
        .catch((error) => {
          if (error.response) {
            console.error("Error adding to group:", error);
            res
              .status(error.response ? error.response.status : 500)
              .json({ error: "Error occurred" });
          }
        });
    })
    .catch((error) => {
      if (error.response) {
        console.error("Error adding subscriber:", error);
        res
          .status(error.response ? error.response.status : 500)
          .json({ error: "Error occurred" });
      }
    });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
