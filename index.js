import express from "express";
import connectToMongoDb from "./connect.js";
import urlRoute from "./routes/url.js";
import URL from "./models/index.js"; 

const app = express();
const PORT = 8001;

app.use(express.json());

connectToMongoDb("mongodb://localhost:27017/shortUrl")
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => {
    console.log(err);
  });

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOne({ shortId });
  if (entry) {
    res.redirect(entry.redirectURL);
  } else {
    res.status(404).json({ error: "Short URL not found" });
  }
});

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
