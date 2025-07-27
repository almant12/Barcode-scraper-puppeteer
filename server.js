import express from "express";
import scrapeRoute from "./routes/scrape.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use("/scrape", scrapeRoute);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(
    `✅ Express Puppeteer server running at http://localhost:${PORT}`
  );
});
