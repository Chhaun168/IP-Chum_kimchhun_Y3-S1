import { http } from "./http";
import type { Loan } from "../types";

export const loansApi = {
  async getAll(): Promise<Loan[]> {
    return http.get<Loan[]>("/loans");
  },
  async create(loan: Omit<Loan, "id">): Promise<Loan> {
    return http.post<Loan>("/loans", loan);
  }
};