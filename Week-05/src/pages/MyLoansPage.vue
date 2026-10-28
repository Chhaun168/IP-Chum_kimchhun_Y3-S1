<script setup lang="ts">
import { onMounted } from "vue";
import { useLoansStore } from "../stores/loans";

const loansStore = useLoansStore();

onMounted(() => {
  loansStore.fetchAll();
});
</script>

<template>
  <div class="p-6 max-w-3xl mx-auto">
    <router-link to="/" class="text-blue-600 underline text-sm mb-4 inline-block">&larr; Back to Catalog</router-link>
    <h1 class="text-2xl font-bold mb-4">Active & Past Loans</h1>

    <div v-if="loansStore.loading" class="text-gray-500">Loading loans...</div>
    <div v-else-if="loansStore.error" class="text-red-500">{{ loansStore.error }}</div>
    <div v-else-if="loansStore.loans.length === 0" class="text-gray-500">No active loans found.</div>
    
    <ul v-else class="space-y-3">
      <li v-for="loan in loansStore.loans" :key="loan.id" class="border p-4 rounded shadow bg-white flex justify-between items-center">
        <div>
          <p class="font-semibold">Equipment ID: #{{ loan.equipmentId }} (Qty: {{ loan.quantity }})</p>
          <p class="text-sm text-gray-600">Borrower: {{ loan.borrowerName }} ({{ loan.borrowerEmail }})</p>
          <p class="text-xs text-gray-500 mt-1">Date: {{ loan.loanDate }}</p>
        </div>
        <span class="px-3 py-1 text-sm rounded font-medium bg-green-100 text-green-700">{{ loan.status }}</span>
      </li>
    </ul>
  </div>
</template>