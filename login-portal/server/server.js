const { default: axios } = require("axios");
const cors = require("cors");

const express = require("express");
const app = express();
app.use(express.json());

// Set up a channel to communicate with frontend
const port = process.env.PORT || 5001;

// const corsOptions = {
//   origin: "*",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

app.use(cors());

require("dotenv").config();

app.listen(port);
console.log("Server started on port: ", port);

app.post("/login", async (req, res) => {
  // Access data in JSON object from client
  const userEmail = req.body.data.email;
  console.log(`Entered email: ${userEmail}`);

  // Define arguments to be passed to the API
  const url = "https://api.ezid.io/email-link/send";
  const header = {
    "Content-Type": "application/json",
  };
  // Fill arguments according to the documentation
  const userData = {
    email: userEmail,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    base_url_email_link: "http://localhost:3000/",
    expiry: "3600000",
    push_email: "Yes",
    callback_url: "http://localhost:3000",
  };

  // console.log(process.env.CLIENT_ID, process.env.CLIENT_SECRET);

  try {
    // Call the /send API to send a magic link and pause execution until call is complete
    const response = await axios.post(url, userData, header);
    console.log(response.data);
    res.sendStatus(200); // return successful if the result of the API call was successful
  } catch (error) {
    // Log errors
    console.error("ERROR: ", error);
  }
});
