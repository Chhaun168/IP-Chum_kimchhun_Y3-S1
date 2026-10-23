export type Role = 'STUDENT' | 'LAB_ASSISTANT';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export type EquipmentStatus = 'AVAILABLE' | 'MAINTENANCE';

export interface Equipment {
  id: number;
  name: string;
  categoryId: number;
  description: string;
  status: EquipmentStatus;
  totalQty: number;
}

export type LoanStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'RETURNED';

export interface Loan {
  id: number;
  userId: number;
  equipmentId: number;
  startDate: string;
  endDate: string;
  status: LoanStatus;
  createdAt: string;
}