# Daily Delights Hub - Next.js + Tailwind (JavaScript)

Starter project for a mobile-first single-page ordering UI that opens WhatsApp with a pre-filled order.

Quick start:

1. Install dependencies:
   - npm install
2. Run dev:
   - npm run dev
3. Open:
   - http://localhost:3000

Notes:

- Replace the placeholder `businessNumber` in `pages/index.js` with the real international phone number (no X placeholders).
- Images: this starter references simple SVG placeholders in `public/images/`. Replace or add higher-resolution raster images (jpg/webp) for production.
- Tailwind is already configured. If you want to change colors or fonts, update `tailwind.config.js` and `styles/globals.css`.

Optional next steps:

- Add server-side order logging (API route) before opening WhatsApp for better persistence.
- Swap to Next.js Image optimization (next/image) when using hosted images and proper domains.
- Add unit tests and TypeScript if desired.
  ``` ````

```svg name=public/images/pizza-1.svg
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice">
  <rect width="100%" height="100%" fill="#fff7f3"/>
  <g transform="translate(120,40)">
    <circle cx="200" cy="140" r="140" fill="#ffedd5" stroke="#f97316" stroke-width="8"/>
    <circle cx="200" cy="140" r="110" fill="#fff1e6"/>
    <g fill="#f97316">
      <circle cx="160" cy="120" r="12"/>
      <circle cx="230" cy="170" r="12"/>
      <circle cx="200" cy="90" r="12"/>
    </g>
    <text x="20" y="320" font-size="36" font-family="sans-serif" fill="#b45309">Campus Cheesy</text>
  </g>
</svg>
```

```svg name=public/images/pizza-2.svg
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice">
  <rect width="100%" height="100%" fill="#fff7f3"/>
  <g transform="translate(120,40)">
    <circle cx="200" cy="140" r="140" fill="#fff1f0" stroke="#fb7185" stroke-width="8"/>
    <circle cx="200" cy="140" r="110" fill="#fff4f6"/>
    <g fill="#fb7185">
      <circle cx="170" cy="110" r="12"/>
      <circle cx="220" cy="150" r="12"/>
      <circle cx="240" cy="110" r="12"/>
    </g>
    <text x="20" y="320" font-size="36" font-family="sans-serif" fill="#7f1d1d">Chicken Overload</text>
  </g>
</svg>
```

```svg name=public/images/pizza-3.svg
<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice">
  <rect width="100%" height="100%" fill="#f0fdf4"/>
  <g transform="translate(120,40)">
    <circle cx="200" cy="140" r="140" fill="#dcfce7" stroke="#16a34a" stroke-width="8"/>
    <circle cx="200" cy="140" r="110" fill="#ecfdf5"/>
    <g fill="#16a34a">
      <circle cx="180" cy="120" r="12"/>
      <circle cx="230" cy="160" r="12"/>
      <circle cx="200" cy="95" r="12"/>
    </g>
    <text x="20" y="320" font-size="36" font-family="sans-serif" fill="#065f46">Veggie Supreme</text>
  </g>
</svg>
```

What I provided and next steps:

- I created a complete Next.js project scaffold (package.json + Next/Tailwind config + PostCSS) and split the UI into tidy components under components/, with data in data/, page under pages/, and lightweight SVG images under public/images/.
- This is JS-based (no TypeScript) and uses Tailwind utility classes. Images use native lazy loading and are responsive-friendly for the starter layout.
- To run: npm install, then npm run dev. Replace the businessNumber in pages/index.js with the real number before going live.
- If you want, I can:
  - add an API route to persist orders before opening WhatsApp,
  - wire up next/image for optimized image delivery,
  - add an image generation script that produces multiple raster sizes (using sharp),
  - or convert to the app/ router and TypeScript.

Which of those should I do next?
