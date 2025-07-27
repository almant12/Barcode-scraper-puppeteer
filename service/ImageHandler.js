import fetch from "node-fetch";

export async function fetchImageAsBase64(url) {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        Referer: "https://tienda.tarracoimportexport.com/",
        Accept:
          "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch image, status: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mimeType = response.headers.get("content-type") || "image/jpeg";

    return `data:${mimeType};base64,${buffer.toString("base64")}`;
  } catch (e) {
    console.warn(`Failed to fetch image: ${url}`, e.message);
    return null;
  }
}

