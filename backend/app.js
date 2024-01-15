const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const uuid = require("uuid");

const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

const usersRoutes = require("./routes/users");
const referralLinksRoutes = require("./routes/referralLinks");

// Mount the routes
app.use("/users", usersRoutes);
app.use("/api/referral-links", referralLinksRoutes);

// Correct connection string syntax
const uri =
  "mongodb+srv://rushabhtrivedi003:BqL4zjzTlngQK1hJ@cluster0.nyvolft.mongodb.net/dbName?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.listen(port, () => console.log(`Server listening on port ${port}`));
