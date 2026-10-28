<script setup lang="ts">
import { onMounted } from "vue";
import { useLoansStore } from "./stores/loans";

const loansStore = useLoansStore();

onMounted(() => {
  loansStore.fetchAll();
});
</script>

<template>
  <header class="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
    <nav class="flex gap-6 items-center">
      <router-link to="/" class="font-bold text-lg text-yellow-400">Lab Equipment System</router-link>
      <router-link to="/my-loans" class="text-gray-300 hover:text-white transition">
        My Loans <span v-if="loansStore.loans.length" class="bg-blue-600 text-xs px-2 py-0.5 rounded-full">({{ loansStore.loans.length }})</span>
      </router-link>
    </nav>
  </header>
  <main class="min-h-screen bg-gray-50">
    <RouterView />
  </main>
</template>