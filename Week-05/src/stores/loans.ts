import { defineStore } from "pinia";
import { ref } from "vue";
import type { Loan, LoanInput, Equipment } from "../types";
import { loansApi } from "../api/loans";
import { equipmentApi } from "../api/equipment";
import { useEquipmentStore } from "./equipment";
import { ApiError } from "../api/http";

export const useLoansStore = defineStore("loans", () => {
  const loans = ref<Loan[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  function stockLeft(equipment: Equipment): number {
    return equipment.availableStock;
  }

  async function fetchAll() {
    loading.value = true;
    error.value = null;
    try {
      loans.value = await loansApi.getAll();
    } catch (err: any) {
      error.value = err.message || "Failed to load loans.";
    } finally {
      loading.value = false;
    }
  }

  async function borrow(equipment: Equipment, input: LoanInput): Promise<Loan> {
    const left = stockLeft(equipment);
    if (input.quantity > left) {
      throw new ApiError(409, "Not enough equipment stock left.");
    }

    const createdLoan = await loansApi.create({
      equipmentId: equipment.id,
      borrowerName: input.borrowerName,
      borrowerEmail: input.borrowerEmail,
      quantity: input.quantity,
      loanDate: new Date().toISOString().split("T")[0],
      status: "Active",
    });

    const newStock = equipment.availableStock - input.quantity;
    const updatedEquipment = await equipmentApi.setAvailableStock(equipment.id, newStock);

    useEquipmentStore().replace(updatedEquipment);
    loans.value.unshift(createdLoan);

    return createdLoan;
  }

  return {
    loans,
    loading,
    error,
    stockLeft,
    fetchAll,
    borrow,
  };
});