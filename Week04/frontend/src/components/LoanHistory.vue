<script setup lang="ts">
import type { Loan, Equipment } from '../types';

defineProps<{
  loans: Loan[];
  equipmentList: Equipment[];
}>();

function getEquipmentName(equipmentId: number, equipmentList: Equipment[]): string {
  const item = equipmentList.find((e) => e.id === equipmentId);
  return item ? item.name : 'Unknown Equipment';
}

function getStatusBadgeClass(status: string): string {
  switch (status) {
    case 'APPROVED':
      return 'badge-approved';
    case 'PENDING':
      return 'badge-pending';
    case 'REJECTED':
      return 'badge-rejected';
    case 'RETURNED':
      return 'badge-returned';
    default:
      return '';
  }
}
</script>

<template>
  <div class="loan-history">
    <h2>My Loan Requests & History</h2>
    <div v-if="loans.length === 0" class="empty-state">
      <p>No loan requests found.</p>
    </div>
    <div v-else class="table-container">
      <table>
        <thead>
          <tr>
            <th>Equipment</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="loan in loans" :key="loan.id">
            <td>{{ getEquipmentName(loan.equipmentId, equipmentList) }}</td>
            <td>{{ loan.startDate }}</td>
            <td>{{ loan.endDate }}</td>
            <td>
              <span :class="['badge', getStatusBadgeClass(loan.status)]">
                {{ loan.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.loan-history {
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
</style>