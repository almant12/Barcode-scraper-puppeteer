import puppeteer from "puppeteer";
import { USER_AGENT } from "../utils/config.js";
import { extractLink, extractProductFromPage } from "../utils/scraper.js";

export async function scrapeTarracoProduct(barcode) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setUserAgent(USER_AGENT);

  const searchUrl = `https://tienda.tarracoimportexport.com/index.php?controller=search&orderby=position&orderway=desc&search_query=${encodeURIComponent(
    barcode
  )}&submit_search=OK`;

  await page.goto(searchUrl, { waitUntil: "domcontentloaded" });

  const productLink = await extractLink(page);

  if (!productLink) {
    await browser.close();
    throw new Error("Product not found for this barcode");
  }

  await page.goto(productLink, { waitUntil: "networkidle2" });

  const product = await extractProductFromPage(page);

  await browser.close();

  return { ...product, productLink };
}
