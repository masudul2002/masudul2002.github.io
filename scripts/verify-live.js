async function test() {
  const res = await fetch("https://masudul2002-github-io.vercel.app/");
  const html = await res.text();
  const iconMatches = html.match(/<link[^>]*rel=["'][^"']*icon[^"']*["'][^>]*>/gi) || [];
  console.log("=== Favicon Links ===");
  iconMatches.forEach((m) => console.log(m));

  const manifestMatch = html.match(/<link[^>]*rel=["']manifest["'][^>]*>/gi) || [];
  console.log("=== Manifest Link ===");
  manifestMatch.forEach((m) => console.log(m));

  const ogMatches = html.match(/<meta[^>]*(?:og:image|twitter:image)[^>]*>/gi) || [];
  console.log("=== OpenGraph Image Meta ===");
  ogMatches.forEach((m) => console.log(m));

  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  console.log("=== Page Title ===");
  console.log(titleMatch ? titleMatch[1] : "N/A");
}

test().catch(console.error);
