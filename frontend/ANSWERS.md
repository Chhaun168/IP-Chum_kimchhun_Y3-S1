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
## 5. Conceptual Questions ("Explain it")

### Q1: In `EventList`, what goes wrong if you use the array index as `:key` and the list gets filtered while a card has local state?
Using the array index as `:key` causes Vue to identify list items strictly by their index position rather than their unique identity. When the list is filtered, Vue reuses existing component instances at those index positions, which can cause local component state (like an open modal or active toggle) to wrongly persist on a completely different item.

### Q2: Why is `visible` a `computed` property and not a function called from the template? What is the difference when you type in the search box?
A `computed` property caches its result based on its reactive dependencies and only re-evaluates when those specific dependencies change. A function called directly in a template executes on *every single re-render cycle* of the component. When typing into a search box, a function would re-run continuously on every single keystroke and render, whereas `computed` only updates when relevant inputs change.

### Q3: `EventCard` emits `book` instead of changing `event.booked`. Give two reasons.
1. **One-Way Data Flow (Props Down, Events Up):** Vue enforces unidirectional data flow to ensure predictable state mutation; child components should not mutate props directly.
2. **Single Source of Truth:** The parent component owns the source data array. Emitting an event lets the parent perform state updates, ensuring all components reading that data stay properly synchronized.

### Q4: You write `const { booked } = reactive(event); booked++`. The page does not change. Why?
Destructuring primitive values (like booleans or numbers) from a `reactive()` object extracts the plain underlying JavaScript value at that moment, severing the connection to Vue's reactive Proxy wrapper. Incrementing `booked` modifies a local primitive variable without triggering Vue's reactivity system.

### Q5: Where does `myBookings` live, and why not in `EventCard` or `EventList`?
`myBookings` lives in the top-level parent component (`App.vue`) or a centralized Pinia store. It needs to reside at a shared parent level so multiple independent child views (like the main catalog, loan history panel, or dashboard) can access and update the shared state without creating tight coupling or inconsistent local copies.