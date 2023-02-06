# What is this project?

This is a login portal I created using React, Node, Express and MongoDB, along with EZiD's APIs. Users are authenticated into the platform via JWTs that are stored in cookies. Use the commands below to give it a try!

## Available Scripts

To RUN my project, use:

### 1. `cd server` then `npm start`

This will run the server (backend) of the application.

### 2. In a new terminal, `cd client` then `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view the frontend in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

This will allow you to interact with the app.

## Things not included in this Repository

Not all files necessary to run the app are included here. In the server folder, make a new file called `.env` and enter the following:
`MONGO=<your_uri> 
CLIENT_ID=<your_client_id>
ClIENT_SECRET=<your_client_secret>`

For Mongo, you will need a DB called Cluster0 with a collection inside it called Users > Auth if you want my code to run as is. Otherwise, some modifications will need to be made in the CRUD operations at the bottom of `server.js`.

Then you're good to go!
