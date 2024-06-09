const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

const os = require("os");
require('dotenv').config();

// Get network interfaces
const networkInterfaces = os.networkInterfaces();

// Function to get the local IP address
function getLocalIP() {
  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];

    for (const interfaceInfo of interfaces) {
      if (interfaceInfo.family === "IPv4" && !interfaceInfo.internal) {
        return interfaceInfo.address;
      }
    }
  }
  return "127.0.0.1"; // Fallback to localhost
}

// Get the local IP address
const localIP = getLocalIP();
console.log(`Local IP Address: ${localIP}`);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

// Utility function to read data from the JSON file
const readData = () => {
  const data = fs.readFileSync(path.join(__dirname, "score.json"), "utf8");
  return JSON.parse(data);
};

// Utility function to write data to the JSON file
const writeData = (data) => {
  fs.writeFileSync(
    path.join(__dirname, "score.json"),
    JSON.stringify(data, null, 2),
    "utf8"
  );
};

// API route example
app.get("/api/data", (req, res) => {
  const score = readData();
  res.json(score);
});

// API route example
app.post("/api/data", (req, res) => {
  const data = readData();
  console.log(req.body, data);
  const newMessage = {
    id: data?.length ? data[data?.length - 1].id + 1 : 1,
    name: req.body.name,
    time: req.body.time,
    tech: req.body.tech,
  };
  data.push(newMessage);
  writeData(data);
  res.status(201).json(newMessage);
});

// API route example
app.delete("/api/data", (req, res) => {
  const data = readData();
  const scoreId = parseInt(req.body.id, 10);

  console.log("data", data);
  const newData = data.filter((score) => score.id !== scoreId);
  writeData(newData);
  res.status(204).send(newData);
});

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, "client/dist")));

// Catch-all handler to serve the React app for any route not handled by the backend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/dist/index.html"));
});

app.listen(PORT, localIP, () => {
  console.log(`Server is running on port http://${localIP}:${PORT}`);
});
