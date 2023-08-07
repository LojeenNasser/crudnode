const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const taskRouter = require("./routes/TaskRoutes"); 

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/tasks", taskRouter);

// normal route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Connect to mongodb
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error.message);
  }
}

startServer();

module.exports = app;
