import express from "express";
import { scrapeTarracoProduct } from "../service/tarracoScraper.js";
import { scrapeLookupProduct } from "../service/lookupScraper.js";

const router = express.Router();

router.get("/tarraco/:barcode", async (req, res) => {
  const { barcode } = req.params;

  if (!barcode) {
    return res.status(400).json({ error: "Barcode is required" });
  }

  try {
    const result = await scrapeTarracoProduct(barcode);
    res.json(result);
  } catch (err) {
    console.error("Scrape error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/lookup/:barcode", async (req, res) => {
  const { barcode } = req.params;
  if (!barcode) {
    return res.status(400).json({ error: "Barcode is required" });
  }

  try {
    const result = await scrapeLookupProduct(barcode);
    res.json(result);
  } catch (err) {
    console.error("Scrape error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
