# Lab Equipment Lending System - Frontend Implementation (Part E)

## 1. Project Overview
This project implements the custom Vue 3 Single Page Application (SPA) frontend for the **Lab Equipment Lending System**. It provides an intuitive interface for students to browse available laboratory equipment, submit loan requests with start/end dates, track borrowing history, and allows lab assistants to review, approve, or reject pending requests while managing equipment inventory availability.

---

## 2. Architecture & Component Hierarchy
The application is structured using a modular component-driven architecture with Vue 3 `script setup` and TypeScript:
- **`App.vue`**: Root component managing global reactive state (`equipmentList`, `loans`, `users`, `currentRole`), category filtering, and role toggling.
- **`EquipmentList.vue`**: Container component rendering a grid of equipment cards.
- **`EquipmentCard.vue`**: Reusable component displaying equipment details, category info, status badges, and an interactive "Request Loan" action button.
- **`LoanHistory.vue`**: Displays a student's active and historical loan requests with status color coding (Pending, Approved, Rejected, Returned).
- **`LoanModal.vue`**: Interactive modal form capturing desired start and end dates with validation rules.
- **`AssistantDashboard.vue`**: Management dashboard for Lab Assistants to review pending student requests, approve/reject loans, and mark active loans as returned.

---

## 3. Key Features & Workflows
1. **Category Filtering**: Students can instantly filter equipment items by category (e.g., Microcontrollers, Sensors, Accessories).
2. **Student Loan Requests**: Clicking "Request Loan" opens a modal dialog to select valid borrowing dates, appending a new `PENDING` loan entry.
3. **Role-Based View Toggle**: Includes a testing toolbar to switch between **Student View** and **Lab Assistant View**.
4. **Inventory Syncing**: Approving a loan automatically updates the equipment status to `MAINTENANCE` (unavailable), while marking an item as `RETURNED` restores its availability.

---

## 4. Testing & Quality Assurance
Unit tests were implemented using **Vitest** and **Vue Test Utils** inside `src/__tests__/`:
- **`EquipmentCard.spec.ts`**: Verifies correct rendering of equipment properties, statuses, and button disabled states for items under maintenance.
- **`App.spec.ts`**: Ensures proper mounting and main application title rendering.
- All unit tests pass successfully (`npm run test:unit`).