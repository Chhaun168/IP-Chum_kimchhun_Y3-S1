<script setup lang="ts">
import type { Equipment } from '../types';

defineProps<{
  equipment: Equipment;
}>();

defineEmits<{
  (e: 'borrow', id: number): void;
}>();
</script>

<template>
  <div class="equipment-card">
    <h3>{{ equipment.name }}</h3>
    <p>{{ equipment.description }}</p>
    <p><strong>Status:</strong> {{ equipment.status }}</p>
    <p><strong>Total Qty:</strong> {{ equipment.totalQty }}</p>
    <button 
      :disabled="equipment.status === 'MAINTENANCE'" 
      @click="$emit('borrow', equipment.id)"
    >
      {{ equipment.status === 'AVAILABLE' ? 'Request Loan' : 'Under Maintenance' }}
    </button>
  </div>
</template>

<style scoped>
.equipment-card {
  border: 1px solid #e5e7eb;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 8px;
  background: #fff;
}
button {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}
button:disabled {
  background-color: #9ca3af;
  cursor: not-allowed;
}
</style>