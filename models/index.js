import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  shortId: { type: String, required: true, unique: true },
  redirectURL: { type: String, required: true },
});

const shortURL = mongoose.model("URL", urlSchema);
export default shortURL;
