import express from "express";
import { handelGenerateShortUrl } from "../controllers/url.js";

const router = express.Router();

router.post("/", handelGenerateShortUrl);

export default router;
