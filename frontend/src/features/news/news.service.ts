import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/api/v1";

const client = axios.create({ baseURL: BASE_URL, timeout: 15000 });

export interface PublicNews {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image?: string;
  publishedAt?: string;
  createdAt: string;
}

export async function fetchPublishedNews(): Promise<PublicNews[]> {
  const { data } = await client.get("/news", {
    params: { status: "published", limit: 50 },
  });
  return data.data || [];
}

export async function fetchNewsBySlug(slug: string): Promise<PublicNews | null> {
  const { data } = await client.get("/news", {
    params: { status: "published", limit: 100 },
  });
  const list: PublicNews[] = data.data || [];
  return list.find((n) => n.slug === slug) || null;
}