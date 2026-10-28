import { http } from "./http";
import type { Equipment } from "../types";

export const equipmentApi = {
  async getAll(): Promise<Equipment[]> {
    return http.get<Equipment[]>("/equipment");
  },
  async getOne(id: number): Promise<Equipment> {
    return http.get<Equipment>(`/equipment/${id}`);
  },
  async setAvailableStock(id: number, stock: number): Promise<Equipment> {
    return http.patch<Equipment>(`/equipment/${id}`, { availableStock: stock });
  }
};