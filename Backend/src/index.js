import express from "express";
import cors from "cors";
import path from "path";

import indexRoutes from "./routes/indexRoutes.js";
import constant from "./config/constant.js";
import db from "./config/db.js";

const app = express();
const port = constant.PORT;

// CORS policy
app.use(cors());

// Parse JSON / url-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// For static files
app.use(express.static(path.resolve("public")));

// Create Server
app.listen(port, (error) => {
  if (error) {
    console.error("Server not connected!");
  } else {
    console.log(`Server is running on Port ${port}.`);
    db();
  }
});

// Routing
app.use("/api", indexRoutes);
