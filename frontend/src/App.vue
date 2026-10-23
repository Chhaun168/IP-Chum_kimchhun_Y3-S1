<script setup lang="ts">
import { ref, computed } from 'vue';
import EquipmentList from './components/EquipmentList.vue';
import LoanHistory from './components/LoanHistory.vue';
import LoanModal from './components/LoanModal.vue';
import AssistantDashboard from './components/AssistantDashboard.vue';
import { initialEquipment, initialCategories, initialLoans, initialUsers } from './data/equipmentData';
import type { Equipment, Loan } from './types';

// Reactive state
const equipmentList = ref<Equipment[]>(initialEquipment.map(e => ({ ...e })));
const loans = ref<Loan[]>(initialLoans.map(l => ({ ...l })));
const users = ref(initialUsers);
const selectedCategory = ref<number | null>(null);
const activeEquipmentForLoan = ref<Equipment | null>(null);

// Role switching for testing: 'STUDENT' or 'LAB_ASSISTANT'
const currentRole = ref<'STUDENT' | 'LAB_ASSISTANT'>('STUDENT');

// Filtered equipment computed property
const filteredEquipment = computed(() => {
  if (selectedCategory.value === null) {
    return equipmentList.value;
  }
  return equipmentList.value.filter(e => e.categoryId === selectedCategory.value);
});

function handleOpenLoanModal(id: number) {
  const item = equipmentList.value.find(e => e.id === id);
  if (item && item.status === 'AVAILABLE') {
    activeEquipmentForLoan.value = item;
  }
}

function handleCloseModal() {
  activeEquipmentForLoan.value = null;
}

function handleCMSumbitLoan(payload: { equipmentId: number; startDate: string; endDate: string }) {
  const newLoan: Loan = {
    id: loans.value.length + 1,
    userId: 1, // Chum Kimchhun (Student)
    equipmentId: payload.equipmentId,
    startDate: payload.startDate,
    endDate: payload.endDate,
    status: 'PENDING',
    createdAt: new Date().toISOString().split('T')[0]!,
  };
  loans.value.unshift(newLoan);
  activeEquipmentForLoan.value = null;
  alert('Loan request submitted successfully!');
}

function handleUpdateLoanStatus(loanId: number, status: 'APPROVED' | 'REJECTED') {
  const loan = loans.value.find(l => l.id === loanId);
  if (loan) {
    loan.status = status;
    if (status === 'APPROVED') {
      const equipment = equipmentList.value.find(e => e.id === loan.equipmentId);
      if (equipment) {
        equipment.status = 'MAINTENANCE'; // Mark as unavailable during loan
      }
    }
  }
}

function handleMarkReturned(loanId: number) {
  const loan = loans.value.find(l => l.id === loanId);
  if (loan) {
    loan.status = 'RETURNED';
    const equipment = equipmentList.value.find(e => e.id === loan.equipmentId);
    if (equipment) {
      equipment.status = 'AVAILABLE'; // Make available again
    }
  }
}
</script>

<template>
  <main class="container">
    <header>
      <h1>Lab Equipment Lending System</h1>
      <p class="subtitle">Manage and borrow equipment for ITC software engineering coursework.</p>
      
      <!-- Role Switcher Bar -->
      <div class="role-switcher">
        <span>Current View Mode:</span>
        <button 
          :class="{ active: currentRole === 'STUDENT' }" 
          @click="currentRole = 'STUDENT'"
        >
          Student View
        </button>
        <button 
          :class="{ active: currentRole === 'LAB_ASSISTANT' }" 
          @click="currentRole = 'LAB_ASSISTANT'"
        >
          Lab Assistant View
        </button>
      </div>
    </header>

    <!-- STUDENT VIEW -->
    <div v-if="currentRole === 'STUDENT'">
      <div class="filter-tabs">
        <button 
          :class="{ active: selectedCategory === null }" 
          @click="selectedCategory = null"
        >
          All Categories
        </button>
        <button 
          v-for="cat in initialCategories" 
          :key="cat.id"
          :class="{ active: selectedCategory === cat.id }"
          @click="selectedCategory = cat.id"
        >
          {{ cat.name }}
        </button>
      </div>
      
      <EquipmentList :items="filteredEquipment" @request-loan="handleOpenLoanModal" />
      <LoanHistory :loans="loans" :equipmentList="equipmentList" />
    </div>

    <!-- LAB ASSISTANT VIEW -->
    <div v-else>
      <AssistantDashboard 
        :loans="loans" 
        :equipmentList="equipmentList" 
        :users="users"
        @update-loan-status="handleUpdateLoanStatus"
        @mark-returned="handleMarkReturned"
      />
    </div>

    <LoanModal 
      :equipment="activeEquipmentForLoan" 
      @close="handleCloseModal" 
      @submit-loan="handleCMSumbitLoan" 
    />
  </main>
</template>

<style scoped>
.container {
  max-width: 750px;
  margin: 40px auto;
  font-family: Arial, sans-serif;
  padding: 0 20px;
}
header {
  margin-bottom: 24px;
}
h1 {
  color: #1f2937;
  font-size: 24px;
  margin-bottom: 4px;
}
.subtitle {
  color: #4b5563;
  margin: 0 0 16px 0;
}
.role-switcher {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f3f4f6;
  padding: 10px 14px;
  border-radius: 6px;
  font-size: 14px;
}
.role-switcher button {
  background: white;
  border: 1px solid #d1d5db;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}
.role-switcher button.active {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}
.filter-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.filter-tabs button {
  background: #f3f4f6;
  border: 1px solid #d1d5db;
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}
.filter-tabs button.active {
  background: #2563eb;
  color: white;
  border-color: #2563eb;
}
</style>