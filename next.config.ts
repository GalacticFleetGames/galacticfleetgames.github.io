import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export -> `out/` folder, served by GitHub Pages.
  output: "export",
  // GitHub Pages has no image-optimization server, so disable it.
  images: { unoptimized: true },
  // Emit `/about/index.html` so routes resolve cleanly on a static host.
  trailingSlash: true,
};

export default nextConfig;
