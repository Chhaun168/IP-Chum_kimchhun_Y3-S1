# M1 Conceptual Answers

### 1. You refresh the browser on `/events/2` and the page loads. Which program answered that request in development, and what must the production server do so it still works after deployment?
In development, Vite's dev server answers the request and handles history fallback routing automatically[cite: 6]. In production, the web server (such as Nginx or Apache) must be configured to redirect all incoming route requests back to `index.html` so the client-side router can take over; otherwise, the server will return a 404 error[cite: 6].

### 2. The guard stops students from opening `/events/new`. Can a student still create an event? How, and what must stop them?
Yes, a student can still bypass client-side guards by sending direct HTTP requests or using tools like `curl` to interact with the backend API[cite: 6]. To prevent this, authorization checks and validation must be strictly enforced on the server side[cite: 6].

### 3. EventDetailPage loads its event in a watch on the id with immediate: true, not in onMounted. What bug would onMounted alone cause?
When navigating from one detail page to another (e.g., from `/events/1` to `/events/2`), Vue reuses the same component instance instead of destroying and recreating it[cite: 6]. Because `onMounted` only runs once upon initial creation, it would fail to fetch or update the data for the new ID[cite: 6].

### 4. Why does EventsPage use storeToRefs(store) instead of const { events } = store?
Destructuring state properties directly from a Pinia store (`const { events } = store`) strips away their reactivity[cite: 6]. `storeToRefs` wraps store state and getters into individual reactive refs so that components maintain reactivity when properties are destructured[cite: 6].

### 5. Booking makes two requests: POST the booking, then PATCH the seat count. What happens to the data if the second one fails? How could the server avoid this?
If the first request succeeds (creating the booking) but the second fails (updating the seat count), the database data becomes inconsistent and out of sync[cite: 6]. The server can avoid this by using database transactions or atomic operations, ensuring that all related operations either succeed together or roll back entirely if any step fails[cite: 6].