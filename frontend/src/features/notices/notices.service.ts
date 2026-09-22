import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000/api/v1";

const client = axios.create({ baseURL: BASE_URL, timeout: 15000 });

export interface PublicNotice {
  _id: string;
  title: string;
  content: string;
  category: string;
  urgency: string;
  publishedAt?: string;
  createdAt: string;
  expiryDate?: string;
}

export async function fetchPublishedNotices(): Promise<PublicNotice[]> {
  const { data } = await client.get("/notices", {
    params: { status: "published", limit: 50 },
  });
  return data.data || [];
}
