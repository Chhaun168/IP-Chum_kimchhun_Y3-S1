<script setup lang="ts">
import { ref } from 'vue';
import type { Equipment } from '../types';

const props = defineProps<{
  equipment: Equipment | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'submit-loan', payload: { equipmentId: number; startDate: string; endDate: string }): void;
}>();

const startDate = ref('');
const endDate = ref('');
const errorMessage = ref('');

function handleSubmit() {
  if (!startDate.value || !endDate.value) {
    errorMessage.value = 'Please select both start and end dates.';
    return;
  }
  if (new Date(endDate.value) <= new Date(startDate.value)) {
    errorMessage.value = 'End date must be after start date.';
    return;
  }
  if (props.equipment) {
    emit('submit-loan', {
      equipmentId: props.equipment.id,
      startDate: startDate.value,
      endDate: endDate.value,
    });
    startDate.value = '';
    endDate.value = '';
    errorMessage.value = '';
  }
}
</script>

<template>
  <div v-if="equipment" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h3>Request Loan: {{ equipment.name }}</h3>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Start Date</label>
          <input v-model="startDate" type="date" required />
        </div>
        <div class="form-group">
          <label>End Date</label>
          <input v-model="endDate" type="date" required />
        </div>
        <div class="actions">
          <button type="button" class="btn-cancel" @click="$emit('close')">Cancel</button>
          <button type="submit" class="btn-submit">Submit Request</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
}
h3 {
  margin-top: 0;
  margin-bottom: 16px;
}
.form-group {
  margin-bottom: 14px;
  display: flex;
  flex-direction: column;
}
.form-group label {
  font-size: 13px;
  margin-bottom: 4px;
  color: #374151;
}
.form-group input {
  padding: 8px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
}
.error {
  color: #dc2626;
  font-size: 13px;
  margin-bottom: 12px;
}
.actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 20px;
}
.btn-cancel {
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}
.btn-submit {
  background: #2563eb;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
}
</style>