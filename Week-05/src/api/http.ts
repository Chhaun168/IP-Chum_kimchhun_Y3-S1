const BASE_URL = "http://localhost:3000";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export const http = {
  async get<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${BASE_URL}${endpoint}`);
    if (!res.ok) throw new ApiError(res.status, `GET ${endpoint} failed`);
    return res.json();
  },

  async post<T>(endpoint: string, body: any): Promise<T> {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new ApiError(res.status, `POST ${endpoint} failed`);
    return res.json();
  },

  async patch<T>(endpoint: string, body: any): Promise<T> {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new ApiError(res.status, `PATCH ${endpoint} failed`);
    return res.json();
  }
};