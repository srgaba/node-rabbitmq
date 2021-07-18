import express from "express";
import queue from "./queue";

const app = express();

app.use(express.json());

app.post("/task", (req, res) => {
  queue.sendToQueue("fila1", req.body);
  res.json({ message: "Your request will be processed!" });
});

app.listen(3333);
