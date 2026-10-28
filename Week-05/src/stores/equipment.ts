import { defineStore } from "pinia";
import { ref } from "vue";
import type { Equipment } from "../types";
import { equipmentApi } from "../api/equipment";

export const useEquipmentStore = defineStore("equipment", () => {
  const items = ref<Equipment[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchAll() {
    loading.value = true;
    error.value = null;
    try {
      items.value = await equipmentApi.getAll();
    } catch (err: any) {
      error.value = err.message || "Failed to load equipment.";
    } finally {
      loading.value = false;
    }
  }

  function replace(updated: Equipment) {
    const index = items.value.findIndex((e) => e.id === updated.id);
    if (index !== -1) {
      items.value[index] = updated;
    }
  }

  return {
    items,
    loading,
    error,
    fetchAll,
    replace,
  };
});