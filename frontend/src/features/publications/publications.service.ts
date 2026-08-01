export interface Publication {
  title: string;
  file: string;
  originalFilename: string;
  bytes: number;
}

export async function fetchPublications(signal?: AbortSignal): Promise<Publication[]> {
  const response = await fetch("/data/publications.json", { signal });
  if (!response.ok) throw new Error("The publications list could not be loaded.");
  return (await response.json()) as Publication[];
}

export const formatBytes = (bytes: number) =>
  bytes > 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)} MB`
    : `${Math.round(bytes / 1024)} KB`;
