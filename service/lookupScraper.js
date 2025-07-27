import puppeteer from "puppeteer";
import { USER_AGENT } from "../utils/config.js";

export async function scrapeLookupProduct(barcode) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setUserAgent(USER_AGENT);

  const url = `https://www.barcodelookup.com/${barcode}`;

  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

  const product = await extractProductInfo(page);

  await browser.close();

  return { ...product, url };
}

async function extractProductInfo(page) {
  return await page.evaluate(() => {
    const details = document.querySelector(".product-details");
    const title = details?.querySelector("h4")?.innerText.trim() || null;
    const ean = details?.querySelector("h1")?.innerText.trim() || null;
    const barcode =
      details
        ?.querySelector(".product-text-label .product-text")
        ?.innerText.trim() || null;

    const imgs = document.querySelectorAll("#largeProductImage img");
    const images = Array.from(imgs).map((img) => img.src);

    const descriptionDiv = [
      ...document.querySelectorAll("div.product-text-label"),
    ].find((div) => div.textContent.trim().startsWith("Description:"));

    const description =
      descriptionDiv?.querySelector("span.product-text")?.innerText.trim() ||
      null;

    return {
      title,
      ean,
      barcode,
      images,
      description,
    };
  });
}
