const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRoutes = require("./Routes/user.js");
const productRoutes = require("./Routes/product.js");

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

const PORT = process.env.PORT || 8080;

// Additional CORS configuration with credentials
app.use(
  cors({
    credentials: true,
    // origin: "http://localhost:3000", // You can specify the allowed origin here if needed
  })
);

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://pachourisuhani:Suhani_30@suhaniecommerce.gszwqdq.mongodb.net/suhani?",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));

// Routes
app.use("/", userRoutes);
app.use("/", productRoutes);

// Start the server
app.listen(PORT, () => console.log("Server is running at port : " + PORT));
