const dotenv = require("dotenv");
const MailerLite = require("@mailerlite/mailerlite-nodejs").default;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const axios = require("axios");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors());
app.use(bodyParser.json());

const API_KEY = process.env.MAILERLITE_API_KEY;
const GROUP_ID = process.env.GROUP_ID;
const CLIENT_ID = process.env.IMGUR_CLIENT_ID;

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

app.post("/api/upload-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("No image uploaded");
    }

    const imageBuffer = req.file.buffer;

    const imgurResponse = await axios.post(
      "https://api.imgur.com/3/image",
      imageBuffer,
      {
        headers: {
          Authorization: `Client-ID ${CLIENT_ID}`,
          "Content-Type": "application/octet-stream",
        },
      }
    );

    if (imgurResponse.data.success) {
      const imgUrl = imgurResponse.data.data.link;

      res.json({
        success: true,
        message: "Form submitted successfully!",
        imageUrl: imgUrl,
      });
    } else {
      res.status(500).send("Failed to upload image to Imgur");
    }
  } catch (error) {
    console.error(
      "Error uploading image:",
      error.response?.data || error.message
    );
    res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
