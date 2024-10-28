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

const EMAIL_CONTENT =
  '<!doctype html>\n<html lang="" dir="ltr" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">\n<head><!--{$head_top}-->\n    <meta charset="utf-8">\n    \n    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes">\n    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no">\n    <meta name="x-apple-disable-message-reformatting">\n    <!--[if !mso]>\n    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n    <![endif]-->\n    <!--[if mso]>\n    <style>\n        * { font-family: sans-serif !important; }\n    </style>\n    <noscript>\n        <xml>\n            <o:OfficeDocumentSettings>\n                <o:PixelsPerInch>96</o:PixelsPerInch>\n            </o:OfficeDocumentSettings>\n        </xml>\n    </noscript>\n    <![endif]-->\n    <style type="text/css">\n        /* Outlines the grids, remove when sending */\n        /*table td { border: 1px solid cyan; }*/\n        /* RESET STYLES */\n        html, body { margin: 0 !important; padding: 0 !important; width: 100% !important; height: 100% !important; }\n        body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility;}\n        .document { margin: 0 !important; padding: 0 !important; width: 100% !important; }\n        img { border: 0; outline: none; text-decoration: none;  -ms-interpolation-mode: bicubic; }\n        table { border-collapse: collapse; }\n        table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }\n        body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }\n        h1, h2, h3, h4, h5, p { margin:0;}\n        /* iOS BLUE LINKS */\n        a[x-apple-data-detectors] {\n            color: inherit !important;\n            text-decoration: none !important;\n            font-size: inherit !important;\n            font-family: inherit !important;\n            font-weight: inherit !important;\n            line-height: inherit !important;\n        }\n        /* ANDROID CENTER FIX */\n        div[style*="margin: 16px 0;"] { margin: 0 !important; }\n        /* MEDIA QUERIES */\n        @media all and (max-width:639px){\n            .wrapper{ width:100%!important; }\n            .container{ width:100%!important; min-width:100%!important; padding: 0 !important; }\n            .row{padding-left: 20px!important; padding-right: 20px!important;}\n            .col-mobile {width: 20px!important;}\n            .col{display: block!important; width: 100%!important;}\n            .mobile-center{text-align: center!important; float: none!important;}\n            .mobile-mx-auto {margin: 0 auto!important; float: none!important;}\n            .mobile-left{text-align: center!important; float: left!important;}\n            .mobile-hide{display: none!important;}\n            .img{ width:100% !important; height:auto !important; }\n            .ml-btn { width: 100% !important; max-width: 100%!important;}\n            .ml-btn-container { width: 100% !important; max-width: 100%!important;}\n            *[class="mobileOff"] { width: 0px !important; display: none !important; }\n            *[class*="mobileOn"] { display: block !important; max-height:none !important; }\n            .mlContentTable{ width: 100%!important; min-width: 10%!important; margin: 0!important; float: none!important; }\n            .mlContentButton a { display: block!important; width: auto!important; }\n            .mlContentOuter { padding-bottom: 0px!important; padding-left: 15px!important; padding-right: 15px!important; padding-top: 0px!important; }\n            .mlContentSurvey { float: none!important; margin-bottom: 10px!important; width:100%!important; }\n            .multiple-choice-item-table { width: 100% !important; min-width: 10% !important; float: none !important; }\n            .ml-default, .ml-card, .ml-fullwidth { width: 100%; min-width: 100%; }\n        }\n\n        /* Carousel style */\n        @media screen and (-webkit-min-device-pixel-ratio: 0) {\n            .webkit {\n                display: block !important;\n            }\n        }  @media screen and (-webkit-min-device-pixel-ratio: 0) {\n            .non-webkit {\n                display: none !important;\n            }\n        }  @media screen and (-webkit-min-device-pixel-ratio: 0) {\n            /* TARGET OUTLOOK.COM */\n            [class="x_non-webkit"] {\n                display: block !important;\n            }\n        }  @media screen and (-webkit-min-device-pixel-ratio: 0) {\n            [class="x_webkit"] {\n                display: none !important;\n            }\n        }\n    </style>\n    \n    <style type="text/css">@import url("https://assets.mlcdn.com/fonts-v2.css?version=1729754");</style>\n<style type="text/css">\n            @media screen {\n                body {\n                    font-family: \'Inter\', sans-serif;\n                }\n            }\n        </style><meta name="robots" content="noindex, nofollow">\n<title>New Tate Take!</title>\n<!--{$head_bottom}--></head>\n<body style="margin: 0 !important; padding: 0 !important; background-color:#f4e285;"><!--{$body_top}-->\n\n    \n        \n        \n    \n\n    \n\n        \n            \n\n            \n            \n            \n            \n            \n            \n        \n\n        \n            \n\n            \n        \n\n        \n            \n\n            \n        \n\n    \n\n    \n\n        \n\n        \n\n        \n            \n            \n            \n            \n            \n        \n\n        \n            \n            \n            \n            \n            \n        \n\n        \n            \n            \n            \n            \n            \n        \n\n        \n            \n            \n            \n            \n            \n        \n\n        \n            \n            \n            \n            \n            \n        \n\n        \n            \n            \n            \n            \n            \n        \n\n        \n            \n            \n            \n            \n        \n\n        \n            \n            \n        \n\n        \n            \n            \n            \n        \n\n        \n            \n            \n            \n            \n            \n            \n            \n            \n            \n            \n        \n\n        \n            \n            \n            \n            \n            \n            \n            \n            \n            \n            \n        \n\n        \n\n            \n                \n                \n                \n                \n                \n            \n\n            \n                \n                \n                \n            \n\n            \n                \n                \n                \n                \n                \n            \n\n            \n                \n                \n                \n                \n                \n            \n\n            \n                \n                \n                \n                \n                \n            \n\n            \n                \n                \n                \n                \n            \n\n            \n                \n                \n            \n\n            \n                \n                \n            \n\n        \n    \n\n    <div class="document" role="article" aria-roledescription="email" aria-label="" lang="" dir="ltr" style="background-color:#f4e285; line-height: 100%; font-size:medium; font-size:max(16px, 1rem);">\n\n        <!--[if gte mso 9]>\n        <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t" if="variable.bodyBackgroundImage.value">\n            <v:fill type="tile" src="" color="#f4e285"/>\n        </v:background>\n        <![endif]-->\n\n        <div style="display: none; max-height: 0px; overflow: hidden;">\n            \n        </div>\n\n        \n\n        <table width="100%" align="center" cellspacing="0" cellpadding="0" border="0">\n            <tr>\n                <td class="" background="" bgcolor="#f4e285" align="center" valign="top" style="padding: 0 8px;">\n\n                    <table class="container" align="center" width="640" cellpadding="0" cellspacing="0" border="0" style="max-width: 640px;">\n    <tr>\n        <td align="center">\n            \n\n                \n\n                <table align="center" width="100%" cellpadding="0" cellspacing="0" border="0">\n                    <tr>\n                        <td colspan="2" height="20" style="line-height: 20px"></td>\n                    </tr>\n                    <tr>\n                        \n                        <td align="left" style="font-family: \'Inter\', sans-serif; color: #111111; font-size: 12px; line-height: 18px;">\n                            A new Tate Take just dropped!\n                            \n                        </td>\n                        <td align="right" style="font-family: \'Inter\', sans-serif; color: #111111; font-size: 12px; line-height: 18px;">\n                            <a style="color: #111111; font-weight: normal; font-style: normal; text-decoration: underline;" href="{$url}">View in browser</a> \n                        </td>\n                    </tr>\n                    <tr>\n                        <td colspan="2" height="20" style="line-height: 20px;"></td>\n                    </tr>\n                </table>\n\n                \n\n                \n                    \n                    \n                    \n                \n\n                \n                    \n                    \n                \n\n            \n        </td>\n    </tr>\n</table>\n\n\n                    <table width="640" class="wrapper" align="center" border="0" cellpadding="0" cellspacing="0" style="\n                        max-width: 640px;\n                        border:1px solid #EAECED;\n                        border-radius:8px; border-collapse: separate!important; overflow: hidden;\n                        ">\n                        <tr>\n                            <td align="center">\n\n                                \n    <!-- {% if true %} -->\n<table class="ml-default" width="100%" bgcolor="" border="0" cellspacing="0" cellpadding="0">\n    <tr>\n        <td style="">\n            \n                \n                \n\n                \n                \n\n                <table class="container ml-4 ml-default-border" width="640" bgcolor="#5b8e7d" align="center" border="0" cellspacing="0" cellpadding="0" style="\n                width: 640px; min-width: 640px;\n                ;\n                \n                ">\n                    <tr>\n                        <td class="ml-default-border container" height="40" style="line-height: 40px; min-width: 640px;"></td>\n                    </tr>\n                    <tr>\n                        <td>\n\n    \n    \n    \n    \n\n\n<table align="center" width="100%" border="0" cellspacing="0" cellpadding="0">\n    <tr>\n        <td class="row mobile-center" align="center" style="padding: 0 50px;">\n            \n\n    \n\n\n\n\n\n\n<img src="https://storage.mlcdn.com/account_image/1158887/35d8BNZHAmNc2EuPoz837vU8mNzMbWjnqhRdJSlq.png" border="0" alt="" width="340" class="logo" style="max-width: 340px; display: inline-block;">\n\n\n\n\n\n\n\n\n        </td>\n    </tr>\n    <tr>\n        <td height="25" style="line-height: 25px;"></td>\n    </tr>\n    \n    <tr>\n        <td class="row mobile-center" style="padding: 0 50px;" align="center">\n            \n\n    \n\n\n<table class="menu mobile-mx-auto" width="" cellpadding="0" cellspacing="0" border="0">\n    <tr>\n        \n    </tr>\n</table>\n\n\n\n\n        </td>\n    </tr>\n    \n</table>\n\n\n    \n    \n    \n    \n    \n\n\n\n    \n    \n\n\n\n\n                            </td>\n                    </tr>\n                    <tr>\n                        <td height="40" style="line-height: 40px;"></td>\n                    </tr>\n                </table>\n                \n                    \n                    \n                \n            \n        </td>\n    </tr>\n</table>\n<!-- {% endif %} -->\n\n\n    <!-- {% if true %} -->\n<table class="ml-default" width="100%" bgcolor="" border="0" cellspacing="0" cellpadding="0">\n    <tr>\n        <td style="">\n            \n                \n                \n                \n                \n                \n                \n                \n                \n\n                <table class="ml-default-border" width="100%" align="center" bgcolor="#5b8e7d" border="0" cellspacing="0" cellpadding="0" style="\n                ;\n                \n                ">\n                    <tr>\n                        <td class="ml-default-border" background="" style="background-size: cover; background-position: center center;" valign="top" align="center">\n\n                            \n                            <table class="container ml-6" width="640" align="center" border="0" cellpadding="0" cellspacing="0" style="color: #fff; width: 640px; min-width: 640px;">\n                                <tr>\n                                    <td class="container" height="20" style="line-height: 20px; min-width: 640px;"></td>\n                                </tr>\n                                <tr>\n                                    <td>\n\n    \n    \n\n\n\n\n\n\n    <table class="container" width="640" border="0" cellspacing="0" cellpadding="0">\n        \n        <tr>\n            <td class="col-mobile" width="50" height="0" style="line-height: 0;"></td>\n            <td>\n                <table width="100%" border="0" cellspacing="0" cellpadding="0">\n                    \n                    <tr>\n                        <td>\n                            <h1 style="font-family: \'Inter\', sans-serif; color: #fff; font-size: 36px; line-height: 125%; font-weight: bold; font-style: normal; text-decoration: none; ;margin-bottom: 10px; text-align: center;">New Tate Take just dropped</h1>\n<p style="font-family: \'Inter\', sans-serif; color: #fff; font-size: 16px; line-height: 165%; margin-top: 0; margin-bottom: 0; text-align: center;">Only real Tateheads get the emails</p>\n                        </td>\n                    </tr>\n                    <tr>\n                        <td height="30" style="line-height:30px;"></td>\n                    </tr>\n                    <tr>\n                        <td align="center">\n                            \n\n    \n    \n    \n    \n\n    <table class="ml-btn-container" cellpadding="0" cellspacing="0" border="0" width="auto">\n    <tr>\n        <td align="center" valign="middle">\n            \n            \n            \n            \n            \n            \n            \n            <!-- Primary button starting -->\n            <div>\n                <!--[if mso]>\n                <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://tatetakes.com/feed" target="_self"\n                         style="width: 120px;\n                         v-text-anchor:middle;" arcsize="12%" stroke="f" strokecolor="#000000" strokeweight="2px">\n                    <v:fill color="#bc4b51" opacity="100%"/>\n                    <w:anchorlock/>\n                    <v:shadow on="f" color="#000000" offset="0px 2px 0px 0px"></v:shadow>\n                    <v:textbox inset="25px,14px,25px,14px" style="mso-fit-shape-to-text:true;">\n                        <center>\n                            <span style="font-family:sans-serif;color:#fff;font-size:14px;line-height:14px;mso-line-height-rule:exactly;font-weight: normal; font-style: normal; text-decoration: none;">\n                                <div>View Post<br></div>\n                            </span>\n                        </center>\n                    </v:textbox>\n                </v:roundrect>\n                <![endif]-->\n            </div>\n            <!-- Primary button ending -->\n            \n            \n            \n            \n            \n            <!-- Secondary button start -->\n            \n            <!-- Secondary button end -->\n\n            <!-- Desktop button start -->\n            \n                        <!--[if !mso]>-->\n                            <table class="ml-btn ml-btn-primary ml-btn-filled" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse: separate; width: auto;">\n                    <tr>\n                        <th align="center" valign="middle" style="background-color: #bc4b51; border-radius: 6px; mso-padding-top-alt: 14px; mso-padding-bottom-alt: 14px; mso-padding-left-alt: 25px; mso-padding-right-alt: 25px; -webkit-font-smoothing: auto; word-break: break-all;">\n                            <!-- Firefox fix -->\n                            \n                            <!-- /Firefox fix -->\n\n                            <a href="https://tatetakes.com/feed" target="_self" style="display: block; padding: 14px 25px; font-family: \'Inter\', sans-serif; color: #fff; font-size: 14px; letter-spacing: 0.025em; text-decoration: none; border-radius: 6px; line-height: 16px; mso-line-height-rule: at-least; word-break: break-word; min-width: 70px; font-weight: normal; font-style: normal;">\n                                <div>View Post<br></div>\n                            </a>\n                        </th>\n                    </tr>\n                </table>\n                        <!--<![endif]-->\n                        <!-- Desktop button end -->\n        </td>\n    </tr>\n</table>\n\n\n\n\n\n\n                        </td>\n                    </tr>\n                    \n                    \n                </table>\n            </td>\n            <td class="col-mobile" width="50" height="0" style="line-height: 0;"></td>\n        </tr>\n    </table>\n\n\n\n\n    \n    \n    \n    \n    \n\n\n\n    \n    \n    \n    \n    \n\n\n\n    \n    \n    \n    \n    \n\n\n\n    \n    \n    \n    \n    \n\n\n\n    \n    \n    \n    \n\n\n\n    \n    \n\n\n\n\n\n\n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n\n\n\n\n\n\n\n\n    \n    \n    \n    \n    \n    \n    \n    \n    \n    \n\n\n\n\n\n\n\n                                        </td>\n                                </tr>\n                                <tr>\n                                    <td height="40" style="line-height: 40px;"></td>\n                                </tr>\n                            </table>\n\n                            \n                            \n                                \n                            \n\n                        </td>\n                    </tr>\n                </table>\n\n            \n        </td>\n    </tr>\n</table>\n<!-- {% endif %} -->\n\n\n    <!-- {% if true %} -->\n<table class="ml-default" width="100%" bgcolor="" border="0" cellspacing="0" cellpadding="0">\n    <tr>\n        <td style="">\n            \n\n                \n                \n\n                \n                \n\n                <table class="container ml-8 ml-default-border" width="640" bgcolor="#5b8e7d" align="center" border="0" cellspacing="0" cellpadding="0" style="\n                width: 640px; min-width: 640px;\n                ;\n                \n                ">\n                    <tr>\n                        <td class="ml-default-border container" height="40" style="line-height: 40px; min-width: 640px;"></td>\n                    </tr>\n                    <tr>\n                        <td class="row" style="padding: 0 50px;">\n\n\n    \n    \n\n<table align="center" width="100%" cellpadding="0" cellspacing="0" border="0">\n    <tr>\n        <td class="col" align="left" width="250" valign="top" style="text-align: left!important;">\n            \n                <h5 style="font-family: \'Inter\', sans-serif; color: #f4a259; font-size: 15px; line-height: 125%; font-weight: bold; font-style: normal; text-decoration: none; margin-bottom: 6px;">Tate Takes</h5>\n            \n            <p style="font-family: \'Inter\', sans-serif; color: #fff; font-size: 14px; line-height: 150%; display: inline-block; margin-bottom: 0;">Original Takes from Tate</p>\n\n            \n        </td>\n        <td class="col" width="40" height="30" style="line-height: 30px;"></td>\n        <td class="col" align="left" width="250" valign="top" style="text-align: left!important;">\n            <p style="font-family: \'Inter\', sans-serif; color: #fff; font-size: 14px; line-height: 150%; margin-bottom: 6px; display: inline-block;">You received this email because you signed up on my website. How foolish. <br></p>\n\n            <table width="100%" cellpadding="0" cellspacing="0" border="0">\n                <tr>\n                    <td height="8" style="line-height: 8px;"></td>\n                </tr>\n                <tr>\n                    <td align="left">\n                        <p style="font-family: \'Inter\', sans-serif; color: #fff; font-size: 14px; line-height: 150%; display: inline-block; margin-bottom: 0;">\n                            <a href="{$unsubscribe}" style="color: #bc4b51; font-weight: normal; font-style: normal; text-decoration: underline;">Unsubscribe</a>\n                            \n                            \n                            \n                        </p>\n                    </td>\n                </tr>\n            </table>\n        </td>\n    </tr>\n</table>\n\n\n\n\n\n\n\n\n    \n    \n    \n    \n    \n\n\n\n    \n    \n    \n    \n\n\n\n    \n    \n\n\n\n\n\n    \n    \n    \n\n\n\n                            </td>\n                    </tr>\n                    <tr>\n                        <td height="40" style="line-height: 40px;"></td>\n                    </tr>\n                </table>\n                \n                    \n                    \n                \n            \n        </td>\n    </tr>\n</table>\n<!-- {% endif %} -->\n\n\n\n                            </td>\n                        </tr>\n                    </table>\n\n                    <table cellpadding="0" cellspacing="0" border="0" align="center" width="640" style="max-width: 640px; width: 100%;">\n    <tr class="ml-hide-branding">\n        <td height="40" style="line-height: 40px;"></td>\n    </tr>\n    <tr class="ml-hide-branding">\n        <td align="center">\n            <a href="https://www.mailerlite.com" target="_blank" style="text-decoration: none;">\n                <img width="100" border="0" alt="Sent by MailerLite" src="https://assets.mlcdn.com/ml/logo/sent-by-mailerlite.png" style="display: block;">\n            </a>\n        </td>\n    </tr>\n    <tr class="ml-hide-branding">\n        <td height="40" style="line-height: 40px;"></td>\n    </tr>\n</table>\n\n\n                </td>\n            </tr>\n        </table>\n\n    </div>\n\n    \n\n    \n\n<!--{$body_bottom}--></body>\n</html>';

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
  const { user } = req.body;
  if (user !== USER_ID) {
    res.status(500).json({ error: "Unauthorized User" });
    return;
  }

  const createParams = {
    name: "New Tate Take",
    type: "regular",
    emails: [
      {
        subject: "New Tate Take!",
        from_name: "Tate Takes",
        from: "tate@tatetakes.com",
        content: EMAIL_CONTENT,
      },
    ],
    groups: [GROUP_ID],
  };

  mailerlite.campaigns
    .create(createParams)
    .then((response) => {
      const campaign = response.data.data.id;
      const params = {
        delivery: "instant",
      };

      mailerlite.campaigns
        .schedule(campaign, params)
        .then((response) => {
          console.log(response.data);
          res.status(response.status).json(response.data);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
            res
              .status(error.response ? error.response.status : 500)
              .json({ error: "Error occurred" });
          }
        });
    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        res
          .status(error.response ? error.response.status : 500)
          .json({ error: "Error occurred" });
      }
    });
});

app.get("/api/ping", async (req, res) => {
  res.status(200).json({message: "Pong"});
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
