# KD Pressing: static website

One HTML file per page, each with its own URL, title, description, canonical link and structured data.
All links, CSS and images use relative paths, so the site works at a domain root, in a GitHub Pages project folder, or any sub-folder.

## Deploy on GitHub Pages
1. Upload the **contents** of this folder, so `index.html` is at the top level of the repository (not inside an extra folder).
2. Settings > Pages > Deploy from a branch > `main` / root.
3. Open `https://USERNAME.github.io/REPO/`.
4. Keep the hidden `.nojekyll` file; make sure it is uploaded too.
5. Canonical, sitemap and share-image addresses point to https://www.kdpressing.com. Until that domain is connected (Settings > Pages > Custom domain), search engines are told the real home is the domain, so the github.io address will not rank on its own. If your domain differs, find and replace `https://www.kdpressing.com` in all files.

## Deploy on any other host
Upload the folder contents to the web root, set `404.html` as the not-found page, redirect non-www to www (or the reverse) with a 301, enable HTTPS and compression, and cache `/assets/` for a year.

## After going live
- Add the site to Google Search Console and Bing Webmaster Tools, submit `/sitemap.xml`, request indexing of the home page.
- Claim a Google Business Profile for the Waluj address (same name, address and phone as on the site) and add opening hours; then add `openingHours` to the JSON-LD.
- List the company on IndiaMART, TradeIndia, Justdial and local industry directories with the same details; add social/directory links as `sameAs` in the Organization JSON-LD.
- Test with the Google Rich Results Test and the Schema.org validator.

## Files
- `robots.txt`, `sitemap.xml`: crawler files
- `llms.txt`, `llms-full.txt`: plain-text summary and full page text for AI answer engines
- `assets/og-image.jpg`: 1200x630 social share image
