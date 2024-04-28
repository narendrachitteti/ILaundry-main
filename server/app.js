const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');
const invoiceRoutes = require("./routes/invoiceRoutes");
const billRoutes = require("./routes/billsRoutes");
const userRoutes = require("./routes/userRoutes");
const staffRoutes = require("./routes/staffRoutes");
const registerRoutes = require("./routes/registerRoutes");
const contactRoutes = require("./routes/ContactRoutes");
const dotenv = require("dotenv");
const app = express();

dotenv.config({ path: "Config/.env" });

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Use Routes
app.use("/", invoiceRoutes);
app.use("/", userRoutes);
app.use("/", staffRoutes);
app.use("/api", registerRoutes);
app.use("/api", billRoutes);
app.use('/api/contact', contactRoutes); 

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
