# Barcode scraper puppeteer

This project is an Express-based microservice that uses Puppeteer to scrape product data from JavaScript-heavy websites. It is designed to work alongside a Laravel application that manages data storage and orchestration.

## Overview

- Scrapes product data from two dynamic websites by accepting a barocde in the request URL.
- Returns structured product information as JSON

## Tech Stack

- Nodejs
- Express: Lightweight HTTP server framework
- Puppeteer: Headless Chrome Node API to render and extract data from dynamic page

## Endpoints

```bash
GET /scrape/tarraco/:barcode
```

Scrapes product information from TarracoExportImport using the provided barcode.

```bash
GET /scrape/lookup/:barcode
```

Scrapes product information from BarcodeLookup using the provided barcode.

## How to Use

1. Clone the Repository

```bash
git clone https://github.com/your-vendor/puppeteer-scraper.git
cd puppeteer-scraper
```

2. Install Dependencies

```bash
npm install
```

3. Start the Server

```bash
npm start
```

The Service will be running at http://lcoalhost:3000 by default


## Notes
- This service does not store any data. It is stateless and returns only scraped content. 