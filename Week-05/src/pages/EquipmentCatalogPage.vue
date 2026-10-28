<script setup lang="ts">
import { onMounted } from "vue";
import { useEquipmentStore } from "../stores/equipment";

const equipmentStore = useEquipmentStore();

onMounted(() => {
  equipmentStore.fetchAll();
});
</script>

<template>
  <div class="p-6 max-w-5xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Lab Equipment Catalog</h1>
      <router-link :to="{ name: 'my-loans' }" class="text-blue-600 underline font-medium">View My Loans</router-link>
    </div>

    <div v-if="equipmentStore.loading" class="text-gray-500">Loading equipment...</div>
    <div v-else-if="equipmentStore.error" class="text-red-500">{{ equipmentStore.error }}</div>
    <div v-else-if="equipmentStore.items.length === 0" class="text-gray-500">No equipment available.</div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div v-for="item in equipmentStore.items" :key="item.id" class="border p-4 rounded shadow bg-white">
        <h2 class="font-semibold text-lg">{{ item.name }}</h2>
        <p class="text-gray-600 text-sm mb-1">Model: {{ item.model }}</p>
        <p class="text-gray-500 text-sm mb-3">Category: {{ item.category }}</p>
        <p class="text-sm font-medium mb-4">Available: <span class="text-green-600">{{ item.availableStock }}</span> / {{ item.totalStock }}</p>
        <router-link :to="{ name: 'equipment-detail', params: { id: item.id } }" class="bg-blue-600 text-white text-sm px-3 py-2 rounded block text-center hover:bg-blue-700">
          View Details & Borrow
        </router-link>
      </div>
    </div>
  </div>
</template>