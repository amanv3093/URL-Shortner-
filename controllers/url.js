import { nanoid } from "nanoid";
import URL from "../models/index.js";

async function handelGenerateShortUrl(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  console.log("url", body.url);
  const shortID = nanoid(8);

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortID });
}

export { handelGenerateShortUrl };
