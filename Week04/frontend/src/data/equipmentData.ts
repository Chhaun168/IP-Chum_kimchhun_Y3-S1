import type { Category, Equipment, Loan, User } from '../types';

export const initialCategories: Category[] = [
  { id: 1, name: 'Microcontrollers', description: 'Arduino, ESP32, and development boards' },
  { id: 2, name: 'Sensors', description: 'Temperature, ultrasonic, and motion sensors' },
  { id: 3, name: 'Accessories', description: 'Jumper wires, breadboards, and power supplies' },
];

export const initialEquipment: Equipment[] = [
  {
    id: 1,
    name: 'Arduino Uno R3',
    categoryId: 1,
    description: 'Microcontroller board based on the ATmega328P',
    status: 'AVAILABLE',
    totalQty: 10,
  },
  {
    id: 2,
    name: 'ESP32 Wi-Fi & Bluetooth Module',
    categoryId: 1,
    description: 'Low-cost, low-power system on a chip with Wi-Fi and dual-mode Bluetooth',
    status: 'AVAILABLE',
    totalQty: 5,
  },
  {
    id: 3,
    name: 'Ultrasonic Sensor HC-SR04',
    categoryId: 2,
    description: 'Distance measuring sensor module',
    status: 'MAINTENANCE',
    totalQty: 8,
  },
];

export const initialUsers: User[] = [
  { id: 1, name: 'Chum Kimchhun', email: 'kimchhun@student.itc.edu.kh', role: 'STUDENT', createdAt: '2026-10-01' },
  { id: 2, name: 'Lab Assistant John', email: 'john.lab@itc.edu.kh', role: 'LAB_ASSISTANT', createdAt: '2026-09-15' },
];

export const initialLoans: Loan[] = [
  {
    id: 1,
    userId: 1,
    equipmentId: 1,
    startDate: '2026-10-24',
    endDate: '2026-10-31',
    status: 'PENDING',
    createdAt: '2026-10-24',
  },
];