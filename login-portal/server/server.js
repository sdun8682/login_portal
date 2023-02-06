/**
 * Setup for API calls with Axios and Express
 */
const { default: axios } = require("axios");
const cors = require("cors");

const express = require("express");
const { JsonWebTokenError } = require("jsonwebtoken");
const appAPI = express();

appAPI.use(express.json());

// Set up a channel to communicate with frontend
const portAPI = process.env.PORT || 5001;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

appAPI.use(cors(corsOptions));
require("dotenv").config();
appAPI.listen(portAPI);
console.log("Server started on port: ", portAPI);

/**
 * Setup for MongoDB Connection through Express
 */
const { MongoClient, ServerApiVersion } = require("mongodb");

/**
 * Setup for JWT
 */
var jwt = require("jsonwebtoken");
var fs = require("fs");

/**
 * Makes a call to the /login API to log a user into the platform with their email.
 */
appAPI.post("/login", async (req, res) => {
  // Access data in JSON object from client
  const userEmail = req.body.data.email;
  console.log(req.body);

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
    base_url_email_link: "http://localhost:3000/auth",
    expiry: "3600000",
    push_email: "No", // "yes" in production, "no" in development :)
    login_hint: userEmail,
    callback_url: "http://localhost:3000/",
  };

  try {
    // Call the /send API to send a magic link and pause execution until call is complete
    const response = await axios.post(url, userData, header);

    // To retrieve magic link in development without pushing real emails
    console.log(response.data.email_link);
    res.sendStatus(200);
  } catch (error) {
    console.error("ERROR: ", error);
  }

  /* Write user's data to MongoDB if they are not a returning user and not existing
  in the DB. This is done to ensure there are no duplicate emails in the DB. */
  if (!((await findUserbyEmail(userEmail)) || !req.body.data.returning)) {
    addNewUser(req.body.data.first, req.body.data.last, userEmail);
  }
});

/**
 * Performs user authentication step from magic link. Generates tokens (ID/Access/Refresh).
 *  Uses EZiD's /verify API.
 */
appAPI.post("/auth", async (req, res) => {
  const authCode = req.body.data.auth_code;
  const email = req.body.data.user_email;

  // Define user info to be passed to API call
  const authData = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    auth_code: authCode,
  };

  // call /verify API with user's data
  try {
    const response = await axios.post(
      "https://api.ezid.io/email-link/verify",
      authData
    );

    var accessToken = response.data.access_token;
    var idToken = response.data.id_token;
    var refreshToken = response.data.refresh_token;

    var token = verifyJWT(accessToken);

    // if token is expired, use the /refresh API to make tokens
    // valid again
    if (token === "JWT Expired") {
      const refresh = await axios.post(
        "https://api.ezid.io/email-link/refresh",
        {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          refresh_token: refreshToken,
        }
      );
      // If refreshing, overwrite the previous expired tokens
      accessToken = refresh.data.access_token;
      idToken = refresh.data.id_token;
      refreshToken = refresh.data.refresh_token;
      token = verifyJWT(accessToken);
    }

    // Add sub to database for identifying users from just their access token later.
    addSub(email, token.sub);

    // Set 1 hour expiry for the cookie containing the access token.
    const currentDate = new Date();
    const expiryDate = new Date(currentDate.getTime() + 3600000);

    // Create a cookie containing the Access Token and send to frontend.
    res
      .cookie("access", accessToken, {
        httpOnly: true,
        secure: false,
        expires: expiryDate,
        sameSite: "lax",
      })
      .sendStatus(200);
  } catch (error) {
    console.error("ERROR: ", error);
    // update status to reflect error
    res.sendStatus(401);
  }
});

/**
 * Clears cookies if a user chooses to log out.
 */
appAPI.get("/logout", async (req, res) => {
  res.clearCookie("access").sendStatus(200);
});

/**
 * Retrieves user's data based on the Access Token stored in a cookie. This is done by
 * extracting the sub of the user from the access token then using this to match to
 * a user's data in the database. This data is returned.
 * Only proceeds if checkCookies executes without errors meaning a cookie is present.
 */
appAPI.post("/getuser", checkCookies, async (req, res) => {
  const access_token = req.decoded_token;
  // extract user's information by access token from the database, send to frontend
  console.log(access_token.sub);
  const userData = await findUserbySub(access_token.sub);
  res.send(userData);
});

/**
 * Checks the request contains a cookie in the header. If not, returns an error.
 */
async function checkCookies(req, res, next) {
  if (!req.headers.cookie) {
    console.log("You are not authorised.");
    res.sendStatus(401); // Throw unauthorised if no access token is present
  } else {
    // extract access token and verify it is real
    const decodedToken = verifyJWT(req.headers.cookie.split("=")[1]);
    req.decoded_token = decodedToken;
    next();
  }
}

/* VERIFY a JWT TOKEN -> Check it was signed by EZiD for Authenticity. 
Authentication is done by checking it with EZiD's public key. (Asymmetric auth) */
function verifyJWT(token) {
  const cert = fs.readFileSync("public_key.pem");

  try {
    var decoded = jwt.verify(token, cert);
  } catch (error) {
    console.log("JWT ERROR: ", error);
    if (error == "TokenExpiredError: jwt expired") {
      console.log("JWT Expired");
      decoded = "JWT Expired";
    } else {
      console.log("JWT Verification Failed");
      decoded = "JWT Verification Failed";
    }
  }
  return decoded;
}

/* ----- CRUD Operations in MongoDB Database ------ */

/**
 * CREATE -> Record a new user's data in MongoDB collection
 */
async function addNewUser(firstName, lastName, email) {
  const uri = process.env.MONGO;
  // console.log("\n\n URI: ", uri, "\n\n");
  const client = new MongoClient(uri);

  console.log(process.env.MONGO);
  try {
    await client.connect((err) => {
      const collection = client.db("Cluster0").collection("users.auth");
    });
  } catch (err) {
    console.error("ERROR: ", err);
  } finally {
    // perform actions on the collection object
    const res = await client.db("Cluster0").collection("users.auth").insertOne({
      first_name: firstName,
      last_name: lastName,
      email_address: email,
    });
    console.log(`New listing created with id ${res.insertedId}`);
    await client.close();
  }
}

/**
 * READ -> Check if user exists by email (for now - later will be by sub.)
 * @returns TRUE if user exists, FALSE if user doesn't exist.
 */
async function findUserbyEmail(email) {
  const uri = process.env.MONGO;
  const client = new MongoClient(uri);

  try {
    await client.connect((err) => {
      const collection = client.db("Cluster0").collection("users.auth");
    });
  } catch (err) {
    console.error("ERROR: ", err);
  } finally {
    // perform actions on the collection object
    const res = await client
      .db("Cluster0")
      .collection("users.auth")
      .find({ email_address: email })
      .toArray();

    // console.log("RES: ", res, res.length);
    await client.close();
    if (res.length === 0) {
      return false;
    } else {
      return true;
    }
  }
}

/**
 * READ -> Retrieve user's details based on their sub.
 * @returns the name(s), email and sub of the user if they exist, or NULL if they do not.
 */
async function findUserbySub(userSub) {
  const uri = process.env.MONGO;
  const client = new MongoClient(uri);

  try {
    await client.connect((err) => {
      const collection = client.db("Cluster0").collection("users.auth");
    });
  } catch (err) {
    console.error("ERROR: ", err);
  } finally {
    // perform actions on the collection object
    const res = await client
      .db("Cluster0")
      .collection("users.auth")
      .find({ sub: userSub })
      .toArray();

    await client.close();
    if (res.length === 0) {
      return null;
    } else {
      return res[0];
    }
  }
}

/**
 * UPDATE -> Add a user's unique sub given their email.
 */
async function addSub(userEmail, userSub) {
  const uri = process.env.MONGO;
  const client = new MongoClient(uri);

  try {
    await client.connect((err) => {
      const collection = client.db("Cluster0").collection("users.auth");
    });
  } catch (err) {
    console.error("ERROR: ", err);
  } finally {
    // perform actions on the collection object
    const res = await client
      .db("Cluster0")
      .collection("users.auth")
      .updateOne(
        { email_address: userEmail },
        {
          $set: {
            sub: userSub,
          },
        }
      );
    setTimeout(() => {
      client.close();
    }, 1500);
  }
}

/**
 * DELETE -> Removes a user from the database given their email.
 */
async function removeUser(email) {
  const uri = process.env.MONGO;
  const client = new MongoClient(uri);

  try {
    await client.connect((err) => {
      const collection = client.db("Cluster0").collection("users.auth");
    });
  } catch (err) {
    console.error("ERROR: ", err);
  } finally {
    // perform actions on the collection object
    const res = await client
      .db("Cluster0")
      .collection("users.auth")
      .deleteOne({ email_address: email });
    await client.close();
  }
}
