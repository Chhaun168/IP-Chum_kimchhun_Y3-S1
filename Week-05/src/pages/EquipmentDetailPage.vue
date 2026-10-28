<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useEquipmentStore } from "../stores/equipment";
import { useLoansStore } from "../stores/loans";
import { validateLoan, hasErrors } from "../validation";
import type { LoanInput, Equipment } from "../types";

const props = defineProps<{ id: string }>();
const equipmentStore = useEquipmentStore();
const loansStore = useLoansStore();

const equipment = ref<Equipment | null>(null);
const form = ref<LoanInput>({ borrowerName: "", borrowerEmail: "", quantity: 1 });
const errors = ref<Record<string, string>>({});
const successMessage = ref("");
const errorMessage = ref("");

onMounted(async () => {
  if (equipmentStore.items.length === 0) {
    await equipmentStore.fetchAll();
  }
  equipment.value = equipmentStore.items.find((e) => e.id === Number(props.id)) || null;
});

async function handleBorrow() {
  if (!equipment.value) return;
  errors.value = validateLoan(form.value, equipment.value.availableStock);
  if (hasErrors(errors.value)) return;

  try {
    errorMessage.value = "";
    await loansStore.borrow(equipment.value, form.value);
    successMessage.value = "Equipment successfully borrowed!";
    form.value = { borrowerName: "", borrowerEmail: "", quantity: 1 };
  } catch (err: any) {
    errorMessage.value = err.message || "Failed to submit loan request.";
  }
}
</script>

<template>
  <div class="p-6 max-w-xl mx-auto">
    <router-link to="/" class="text-blue-600 underline text-sm mb-4 inline-block">&larr; Back to Catalog</router-link>
    
    <div v-if="!equipment" class="text-gray-500">Loading equipment details...</div>
    <div v-else>
      <h1 class="text-3xl font-bold mb-2">{{ equipment.name }}</h1>
      <p class="text-gray-600 mb-1">Model: {{ equipment.model }} | Category: {{ equipment.category }}</p>
      <p class="text-gray-700 mb-4">{{ equipment.description }}</p>
      <p class="font-semibold mb-6">Available Stock: <span class="text-green-600">{{ equipment.availableStock }}</span> / {{ equipment.totalStock }}</p>

      <div class="border p-5 rounded-lg bg-gray-50 shadow">
        <h2 class="text-xl font-bold mb-4">Borrowing Form</h2>
        <form @submit.prevent="handleBorrow" class="space-y-4">
          <div>
            <label class="block font-medium text-sm mb-1">Borrower Name</label>
            <input v-model="form.borrowerName" type="text" class="border w-full p-2 rounded bg-white" placeholder="Enter your name" />
            <span v-if="errors.borrowerName" class="text-red-500 text-xs">{{ errors.borrowerName }}</span>
          </div>

          <div>
            <label class="block font-medium text-sm mb-1">Borrower Email</label>
            <input v-model="form.borrowerEmail" type="email" class="border w-full p-2 rounded bg-white" placeholder="name@student.itc.edu.kh" />
            <span v-if="errors.borrowerEmail" class="text-red-500 text-xs">{{ errors.borrowerEmail }}</span>
          </div>

          <div>
            <label class="block font-medium text-sm mb-1">Quantity</label>
            <input v-model.number="form.quantity" type="number" class="border w-full p-2 rounded bg-white" />
            <span v-if="errors.quantity" class="text-red-500 text-xs">{{ errors.quantity }}</span>
          </div>

          <button type="submit" class="w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 transition">
            Confirm Loan Request
          </button>
        </form>

        <p v-if="successMessage" class="text-green-600 font-semibold mt-4 text-center">{{ successMessage }}</p>
        <p v-if="errorMessage" class="text-red-600 font-semibold mt-4 text-center">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>