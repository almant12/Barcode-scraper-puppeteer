export async function extractLink(page) {
  return await page.evaluate(() => {
    const el = document.querySelector("a.lnk_view");
    return el ? el.href : null;
  });
}

export async function extractProductFromPage(page) {
  return await page.evaluate(() => {
    const getText = (selector) => {
      const el = document.querySelector(selector);
      return el ? el.textContent.trim() : null;
    };

    const getAttr = (selector, attr) => {
      const el = document.querySelector(selector);
      return el ? el.getAttribute(attr) : null;
    };

    const tableRows = Array.from(
      document.querySelectorAll(".table-data-sheet tr")
    );
    const dataSheet = {};

    tableRows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      if (cells.length === 2) {
        const key = cells[0].textContent.trim();
        const value = cells[1].textContent.trim();
        dataSheet[key] = value;
      }
    });

    const thumbLinks = Array.from(
      document.querySelectorAll("#thumbs_list_frame a")
    );
    const highQualityThumbs = thumbLinks
      .map((a) => {
        const rel = a.getAttribute("rel");
        const match = rel && rel.match(/largeimage:\s*'([^']+)'/);
        return match ? match[1] : null;
      })
      .filter(Boolean);

    const images = Array.from(new Set([...highQualityThumbs]));
    return {
      existProduct: !document.querySelector(".alert.alert"),
      title: getText("h1[itemprop='name']"),
      reference: getText("#product_reference span[itemprop='sku']"),
      condition: getText("#product_condition .editable"),
      price: getText(".our_price_display"),
      images,
      dataSheet,
    };
  });
}
