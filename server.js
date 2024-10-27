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

const API_KEY = process.env.MAILERLITE_API_KEY;
const GROUP_ID = process.env.GROUP_ID;
const USER_ID = process.env.USER_ID;

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

app.post("/api/sendMail", async (req, res) => {
  const params = {
    name: "New Tate Take",
    type: "regular",
    emails: [
      {
        subject: "New Tate Take",
        from_name: "Tate Takes",
        from: "tate@tatetakes.com",
        content:
          '<!DOCTYPE html>\n<html>\n<head>\n  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  <meta http-equiv="X-UA-Compatible" content="IE=edge" />\n  <meta name="format-detection" content="address=no" />\n  <meta name="format-detection" content="telephone=no" />\n  <meta name="format-detection" content="email=no" />\n  <meta name="x-apple-disable-message-reformatting" />\n  <title>Untitled</title>\n  <!-- Style goes here -->\n  <style type="text/css">\n\n  </style>\n</head>\n<body style="margin: 0; padding: 0;">\n<!-- Main table -->\n<table border="0" cellspacing="0" cellpadding="0" width="100%">\n  <tr>\n    <td style="padding: 0 40px;">\n      <!-- Child table -->\n      <table align="center" border="0" cellspacing="0" cellpadding="0" width="100%" style="width: 100%; min-width: 100%;">\n        <tr>\n          <td>\n            <p> This is a test content </p>\n            <a href="{$unsubscribe}">Unsubscribe</a>\n          </td>\n        </tr>\n      </table>\n\n    </td>\n  </tr>\n</table>\n<!-- Footer -->\n</body>\n</html>',
      },
    ],
    groups: [GROUP_ID],
  };

  const { user } = req.body;
  if (user === USER_ID) {
  mailerlite.campaigns
    .create(params)
    .then((response) => {
      const CAMPAIGN_ID = response.data.data.id;
      const params = {
        delivery: "instant",
      };

      mailerlite.campaigns
        .schedule(CAMPAIGN_ID, params)
        .then((response) => {
          res.status(response.status).json(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Could not send");
          console.log(error);
          res.status(500).json({ error: "Error occurred" });
        });
    })
    .catch((error) => {
      if (error.response) {
        console.error("Error making campaign:", error);
        res
          .status(error.response ? error.response.status : 500)
          .json({ error: "Error occurred" });
      }
    });
  } else {
    console.error("Unautherized user");
        res
          .status(500)
          .json({ error: "Error occurred" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
