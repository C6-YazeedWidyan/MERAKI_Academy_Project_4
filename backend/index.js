const express = require("express");
const cors = require("cors");

require("dotenv").config();
require("./models/db");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Import Routers

const roleRouter = require("./routes/roles");
const usersRouter = require("./routes/users");
const gamesRouter = require("./routes/games");
const loginRouter = require("./routes/login");
const categoryRouter = require("./routes/category");
const cartRouter = require("./routes/cart");
const wishListRouter = require("./routes/wishlist");
const orderRouter = require("./routes/order");
const websiteStatsRouter = require("./routes/websiteStats");
const googleRouter = require("./routes/googleLogin");
const paymentRouter = require("./routes/payment");

// Routes Middleware

app.use("/roles", roleRouter);
app.use("/users", usersRouter);
app.use("/games", gamesRouter);
app.use("/login", loginRouter);
app.use("/category", categoryRouter);
app.use("/cart", cartRouter);
app.use("/wishlist", wishListRouter);
app.use("/order", orderRouter);
app.use("/adminpanel", websiteStatsRouter);
app.use("/googlelogin", googleRouter);
app.use("/payment", paymentRouter);

// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
