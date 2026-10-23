<script setup lang="ts">
import type { Loan, Equipment, User } from '../types';

defineProps<{
  loans: Loan[];
  equipmentList: Equipment[];
  users: User[];
}>();

const emit = defineEmits<{
  (e: 'update-loan-status', loanId: number, status: 'APPROVED' | 'REJECTED'): void;
  (e: 'mark-returned', loanId: number): void;
}>();

function getUserName(userId: number, users: User[]): string {
  const user = users.find((u) => u.id === userId);
  return user ? user.name : 'Unknown User';
}

function getEquipmentName(equipmentId: number, equipmentList: Equipment[]): string {
  const item = equipmentList.find((e) => e.id === equipmentId);
  return item ? item.name : 'Unknown Equipment';
}
</script>

<template>
  <div class="assistant-dashboard">
    <h2>Lab Assistant Dashboard - Manage Loan Requests</h2>
    
    <div v-if="loans.length === 0" class="empty-state">
      <p>No loan requests to manage.</p>
    </div>
    
    <div v-else class="table-container">
      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Equipment</th>
            <th>Dates</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="loan in loans" :key="loan.id">
            <td>{{ getUserName(loan.userId, users) }}</td>
            <td>{{ getEquipmentName(loan.equipmentId, equipmentList) }}</td>
            <td>{{ loan.startDate }} to {{ loan.endDate }}</td>
            <td>
              <span :class="['badge', `badge-${loan.status.toLowerCase()}`]">
                {{ loan.status }}
              </span>
            </td>
            <td>
              <div v-if="loan.status === 'PENDING'" class="action-buttons">
                <button class="btn-approve" @click="emit('update-loan-status', loan.id, 'APPROVED')">
                  Approve
                </button>
                <button class="btn-reject" @click="emit('update-loan-status', loan.id, 'REJECTED')">
                  Reject
                </button>
              </div>
              <div v-else-if="loan.status === 'APPROVED'">
                <button class="btn-return" @click="emit('mark-returned', loan.id)">
                  Mark Returned
                </button>
              </div>
              <span v-else class="text-muted">Completed</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.assistant-dashboard {
  margin-top: 32px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}
h2 {
  font-size: 18px;
  color: #1f2937;
  margin-bottom: 16px;
}
.empty-state {
  color: #6b7280;
  font-style: italic;
}
.table-container {
  overflow-x: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
th, td {
  padding: 10px 12px;
  border-bottom: 1px solid #e5e7eb;
}
th {
  background-color: #f9fafb;
  font-size: 13px;
  color: #374151;
}
.badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}
.badge-pending {
  background-color: #fef3c7;
  color: #d97706;
}
.badge-approved {
  background-color: #d1fae5;
  color: #059669;
}
.badge-rejected {
  background-color: #fee2e2;
  color: #dc2626;
}
.badge-returned {
  background-color: #e0e7ff;
  color: #4f46e5;
}
.action-buttons {
  display: flex;
  gap: 6px;
}
.btn-approve {
  background: #059669;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}
.btn-reject {
  background: #dc2626;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}
.btn-return {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}
.text-muted {
  color: #9ca3af;
  font-size: 13px;
}
</style>