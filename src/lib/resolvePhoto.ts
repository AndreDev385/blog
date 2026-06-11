import paulina from "@/assets/paulina.jpeg";
import type { ImageMetadata } from "astro";

/**
 * Resolve a testimonial photo path from content frontmatter
 * into a browser-accessible URL via Astro's asset pipeline.
 *
 * Usage:
 *   import { resolvePhoto } from "@/lib/resolvePhoto";
 *   <img src={resolvePhoto(photoPath)} />
 *
 * Add new imports here when adding testimonial photos.
 */
const assetMap: Record<string, ImageMetadata> = {
	"paulina.jpeg": paulina,
};

/**
 * Given a raw frontmatter path like "../../../assets/paulina.jpeg",
 * extract the filename and return the resolved, hashed URL.
 * Falls back to the original path if no matching asset is found.
 */
export function resolvePhoto(rawPath?: string): string | undefined {
	if (!rawPath) return undefined;
	const filename = rawPath.split("/").pop() || "";
	const asset = assetMap[filename];
	return asset?.src ?? rawPath;
}
