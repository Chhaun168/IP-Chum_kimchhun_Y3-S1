<script setup lang="ts">
import type { Equipment } from '../types';
import EquipmentCard from './EquipmentCard.vue';

defineProps<{
  items: Equipment[];
}>();

const emit = defineEmits<{
  (e: 'request-loan', id: number): void;
}>();

function onBorrow(id: number) {
  emit('request-loan', id);
}
</script>

<template>
  <div class="equipment-list">
    <EquipmentCard
      v-for="item in items"
      :key="item.id"
      :equipment="item"
      @borrow="onBorrow"
    />
  </div>
</template>

<style scoped>
.equipment-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>