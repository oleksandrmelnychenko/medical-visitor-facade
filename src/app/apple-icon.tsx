import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default async function AppleIcon() {
  const iconPath = path.join(process.cwd(), "public", "apple-touch-icon.png");
  const icon = await readFile(iconPath);

  return new Response(icon, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
