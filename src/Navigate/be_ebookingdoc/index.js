const express = require("express");
const cors = require("cors");
const fs = require("fs").promises; // Use promises for async file operations
const path = require("path");
require("dotenv").config();
const main = require("./route/router");
const setupSwagger = require("./route/swagger");

const app = express();
app.use(express.json());
app.use(cors());

// Ensure log directory and file exist
const logDir = path.join(__dirname, "src", "api", "log");
const logFile = path.join(logDir, "log.txt");

async function ensureLogFile() {
  try {
    // Create log directory if it doesn't exist
    await fs.mkdir(logDir, { recursive: true });
    // Check if log file exists, create it if not
    try {
      await fs.access(logFile);
    } catch (error) {
      if (error.code === "ENOENT") {
        await fs.writeFile(logFile, "");
        console.log("Created log.txt");
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error("Error setting up log file:", error);
    throw error;
  }
}

// Initialize log file before starting server
ensureLogFile()
  .then(() => {
    app.get("/", (req, res) => {
      res.json({ code: 200, message: "ok" });
    });

    app.use("/resources", express.static(path.join(__dirname, "resources")));
    app.use("/api", main);
    setupSwagger(app);

    // Error handling middleware
    app.use(async (err, req, res, next) => {
      const statusCode = err.statusCode || 500;
      try {
        await fs.appendFile(
          logFile,
          `============================================================================
${new Date().toISOString()}
message: ${err.message}
stack: ${err.stack}\n`
        );
      } catch (logError) {
        console.error("Error writing to log file:", logError);
      }
      res.status(statusCode).json({
        code: statusCode,
        message: err.message,
      });
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}/`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize log file:", err);
    process.exit(1); // Exit if log setup fails, or handle differently
  });