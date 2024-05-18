import express from "express";
import mongoose from "mongoose";
import urlRoute from "./routes/url.js";
import shortURL from "./models/index.js";
import { fileURLToPath } from "node:url";
import path from "node:path";
const app = express();
const PORT = 8001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://amanv3093:Amanverma1@cluster0.c10dxnv.mongodb.net/shortUrl"
  )
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await shortURL.findOne({ shortId });

  if (entry) {
    res.redirect(entry.redirectURL);
  } else {
    res.status(404).json({ error: "Short URL not found" });
  }
});

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
