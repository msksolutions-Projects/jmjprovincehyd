import axios from "axios";
import type { AxiosError } from "axios";
import { z } from "zod";

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name."),
  email: z.string().trim().min(1, "Email is required.").email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || /^[\d\s+()-]{6,20}$/.test(v), "Enter a valid phone number."),
  subject: z.string().trim().min(3, "Please add a short subject."),
  message: z.string().trim().min(20, "Please tell us a little more — at least 20 characters."),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please confirm before sending." }),
  }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export interface ContactResponse {
  ok: true;
  reference: string;
}

const USE_MOCK = import.meta.env.VITE_USE_MOCK_API !== "false";
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api/v1";

const client = axios.create({ baseURL: BASE_URL, timeout: 15_000 });

client.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const status = error.response?.status;
    const message =
      status === 429
        ? "Too many messages have been sent. Please wait a moment and try again."
        : status && status >= 500
          ? "The server is not responding. Please try again shortly."
          : error.code === "ECONNABORTED"
            ? "The request took too long. Please try again."
            : (error.response?.data?.message ??
              "We could not send your message. Please try again, or call the office directly.");
    return Promise.reject(new Error(message));
  },
);

/**
 * Sends an enquiry to the provincial office.
 * Runs against a mock until the Express API is available — switch by setting
 * VITE_USE_MOCK_API=false.
 */
export async function sendContactMessage(values: ContactFormValues): Promise<ContactResponse> {
  if (USE_MOCK) {
    await new Promise((resolve) => setTimeout(resolve, 700));
    if (values.email.endsWith("@example.invalid")) {
      throw new Error("We could not send your message. Please try again.");
    }
    return { ok: true, reference: `JMJ-${Date.now().toString(36).toUpperCase()}` };
  }
  const { data } = await client.post<ContactResponse>("/contact", values);
  return data;
}
