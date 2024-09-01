const express = require("express"); // Certifique-se de que o módulo 'express' está instalado
const http = require("http"); // 'http' é um módulo nativo do Node.js, não precisa ser instalado
const WebSocket = require("ws"); // Certifique-se de que o módulo 'ws' está instalado
const path = require("path"); // 'path' é um módulo nativo do Node.js, não precisa ser instalado
const dotenv = require("dotenv"); // Certifique-se de que o módulo 'dotenv' está instalado

dotenv.config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, "public")));

wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.on("error", console.error);

  ws.on("message", (data) => {
    console.log("Received:", data.toString());
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data.toString());
      }
    });
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
