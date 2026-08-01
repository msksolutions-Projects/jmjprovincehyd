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

/** The manifest is a static build artefact served from /public. */
export async function fetchGallery(signal?: AbortSignal): Promise<GalleryData> {
  const response = await fetch("/data/gallery.json", { signal });
  if (!response.ok) throw new Error("The photo gallery could not be loaded.");
  const data = (await response.json()) as GalleryData;
  return { categories: data.categories ?? [], images: data.images ?? [] };
}
