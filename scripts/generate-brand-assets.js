const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function createIco(pngBuffers) {
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = ICO
  header.writeUInt16LE(count, 4);

  const dirEntries = [];
  let currentOffset = 6 + count * 16;

  for (const { buffer, size } of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // color count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bpp
    entry.writeUInt32LE(buffer.length, 8); // size of image data
    entry.writeUInt32LE(currentOffset, 12); // offset of image data
    dirEntries.push(entry);
    currentOffset += buffer.length;
  }

  return Buffer.concat([
    header,
    ...dirEntries,
    ...pngBuffers.map((p) => p.buffer),
  ]);
}

async function main() {
  const srcImage = path.join(__dirname, "../public/images/MH.png");
  if (!fs.existsSync(srcImage)) {
    console.error("Source image not found:", srcImage);
    process.exit(1);
  }

  console.log("Reading source image:", srcImage);
  const trimmedBuf = await sharp(srcImage).trim().toBuffer();
  const trimmedMeta = await sharp(trimmedBuf).metadata();
  console.log("Trimmed dimensions:", trimmedMeta.width, "x", trimmedMeta.height);

  // 1. Crop just the vibrant MH monogram symbol (excluding the bottom subtext for high-clarity icon rendering)
  // Height is trimmedMeta.height (~527). The symbol occupies the upper 350px.
  const mhSymbolBuf = await sharp(trimmedBuf)
    .extract({ left: 0, top: 0, width: trimmedMeta.width, height: 350 })
    .trim()
    .toBuffer();

  // Create base square 512x512 transparent canvas with 6% safety margin
  const iconBase512 = await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: await sharp(mhSymbolBuf)
          .resize(470, 470, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .toBuffer(),
        gravity: "centre",
      },
    ])
    .png()
    .toBuffer();

  // Save 512x512, 192x192, 180x180, 48x48, 32x32, 16x16 PNGs
  const publicDir = path.join(__dirname, "../public");
  const appDir = path.join(__dirname, "../src/app");

  const sizes = [
    { name: "icon-512.png", size: 512, target: "public" },
    { name: "icon-192.png", size: 192, target: "public" },
    { name: "apple-touch-icon.png", size: 180, target: "public" },
    { name: "apple-icon.png", size: 180, target: "app" },
    { name: "favicon-32x32.png", size: 32, target: "public" },
    { name: "favicon-16x16.png", size: 16, target: "public" },
    { name: "icon.png", size: 512, target: "app" },
    { name: "icon.png", size: 512, target: "public" },
  ];

  for (const s of sizes) {
    const resized = await sharp(iconBase512).resize(s.size, s.size).png().toBuffer();
    const destDir = s.target === "app" ? appDir : publicDir;
    fs.writeFileSync(path.join(destDir, s.name), resized);
    console.log(`Generated ${s.name} (${s.size}x${s.size}) in ${s.target}`);
  }

  // 2. Generate valid multi-resolution ICO file (16, 32, 48)
  const icoSizes = [16, 32, 48];
  const icoPngBuffers = [];
  for (const sz of icoSizes) {
    const buf = await sharp(iconBase512).resize(sz, sz).png().toBuffer();
    icoPngBuffers.push({ buffer: buf, size: sz });
  }
  const icoBuffer = await createIco(icoPngBuffers);

  fs.writeFileSync(path.join(appDir, "favicon.ico"), icoBuffer);
  fs.writeFileSync(path.join(publicDir, "favicon.ico"), icoBuffer);
  console.log("Replaced favicon.ico in src/app and public (Multi-resolution: 16, 32, 48)");

  // 3. Generate high-resolution 1200x630 OpenGraph / Twitter preview banner
  const fullLogoForOg = await sharp(trimmedBuf)
    .resize(600, 360, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const ogSvg = Buffer.from(`
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="ogGlow" cx="50%" cy="40%" r="55%">
          <stop offset="0%" stop-color="#00f2ff" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="neonBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#00f2ff" stop-opacity="0.5"/>
          <stop offset="50%" stop-color="#3b82f6" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="#00f2ff" stop-opacity="0.5"/>
        </linearGradient>
      </defs>
      
      <rect x="0" y="0" width="1200" height="630" fill="url(#ogGlow)"/>
      <rect x="24" y="24" width="1152" height="582" rx="24" fill="none" stroke="url(#neonBorder)" stroke-width="2"/>
      
      <text x="600" y="475" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="22" font-weight="700" fill="#cbd5e1" text-anchor="middle" letter-spacing="3">SOFTWARE ENGINEER · FINTECH ENTHUSIAST</text>
      
      <rect x="470" y="515" width="260" height="42" rx="21" fill="rgba(0, 242, 255, 0.1)" stroke="#00f2ff" stroke-width="1.5" stroke-opacity="0.5"/>
      <text x="600" y="542" font-family="monospace, monospace" font-size="16" font-weight="700" fill="#00f2ff" text-anchor="middle" letter-spacing="2">masudulhasan.me</text>
    </svg>
  `);

  const ogFinal = await sharp({
    create: {
      width: 1200,
      height: 630,
      channels: 4,
      background: { r: 10, g: 15, b: 29, alpha: 1 },
    },
  })
    .composite([
      { input: ogSvg, top: 0, left: 0 },
      { input: fullLogoForOg, top: 85, left: 300 },
    ])
    .png()
    .toBuffer();

  fs.writeFileSync(path.join(appDir, "opengraph-image.png"), ogFinal);
  fs.writeFileSync(path.join(publicDir, "og-image.png"), ogFinal);
  console.log("Generated opengraph-image.png in src/app and public");

  console.log("ALL BRAND ASSETS GENERATED SUCCESSFULLY!");
}

main().catch((err) => {
  console.error("Error generating brand assets:", err);
  process.exit(1);
});
