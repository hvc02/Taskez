require("dotenv").config();
const express = require("express");
const cors = require("cors");

const user = require("./routes/user");
const auth = require("./middleware/auth");

// App config
const app = express();
const port = process.env.PORT;

// Database connection
require("./utils/database").connect();

// Middleware
app.use(express.json());
app.use(cors({ credentials: true }));

app.use("/api/user", user);

//Routes
app.get("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

// Listener
app.listen(port, () => console.log(`Listening on port: ${port}`));
