import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/api/v1";

export interface GalleryCategory {
  id: string;
  label: string;
  count: number;
}

export interface GalleryImage {
  id: string;
  title: string;
  alt: string;
  category: string;
  categoryLabel: string;
  src: string;
  thumbnail: string;
  width: number;
  height: number;
}

export interface GalleryData {
  categories: GalleryCategory[];
  images: GalleryImage[];
}

/** Map an admin-uploaded record into the shape the gallery page expects. */
interface UploadedItem {
  _id: string;
  title: string;
  description?: string;
  category: string;
  coverImage?: { url: string };
}

const labelFor = (category: string) =>
  category
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

/** Cloudinary delivery tweaks: auto format + auto quality, sized for the grid. */
const optimize = (url: string, width: number) =>
  url.includes("/upload/")
    ? url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`)
    : url;

async function fetchUploaded(): Promise<GalleryImage[]> {
  try {
    const { data } = await axios.get(`${API_BASE}/gallery`, {
      params: { status: "published", limit: 200 },
      timeout: 10000,
    });
    const items: UploadedItem[] = data.data ?? [];
    return items
      .filter((item) => item.coverImage?.url)
      .map((item) => ({
        id: `uploaded-${item._id}`,
        title: item.title,
        alt: item.description || item.title,
        category: item.category,
        categoryLabel: labelFor(item.category),
        src: optimize(item.coverImage!.url, 1600),
        thumbnail: optimize(item.coverImage!.url, 600),
        width: 320,
        height: 200,
      }));
  } catch {
    // If the API is unavailable the static gallery still renders.
    return [];
  }
}

export async function fetchGallery(signal?: AbortSignal): Promise<GalleryData> {
  const response = await fetch("/data/gallery.json", { signal });
  if (!response.ok) throw new Error("The photo gallery could not be loaded.");
  const staticData = (await response.json()) as GalleryData;

  const uploaded = await fetchUploaded();

  // Newest uploads first, then the existing archive.
  const images = [...uploaded, ...(staticData.images ?? [])];

  // Rebuild category counts so the filter chips stay accurate.
  const counts = new Map<string, { label: string; count: number }>();
  for (const image of images) {
    const existing = counts.get(image.category);
    if (existing) existing.count += 1;
    else counts.set(image.category, { label: image.categoryLabel, count: 1 });
  }

  const categories: GalleryCategory[] = [...counts.entries()].map(([id, value]) => ({
    id,
    label: value.label,
    count: value.count,
  }));

  return { categories, images };
}