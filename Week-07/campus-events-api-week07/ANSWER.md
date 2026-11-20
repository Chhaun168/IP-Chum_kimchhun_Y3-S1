# Week 7 Lab - Conceptual Answers

### 1. Why does Booking have an eventId column but Event has no bookingIds column? Where is the “many” side of a 1-N relation stored?

In a relational database, the "many" side of a 1-N relation is stored on the child table (`Booking`) using a foreign key (`eventId`) that references `Event.id`. Storing an array of `bookingIds` on `Event` would violate relational normalization and make foreign-key integrity and querying difficult. In Prisma, `bookings Booking[]` on `Event` is a virtual relation field that lets Prisma join related rows without adding a column to the `Event` table.

### 2. booked repeats information we could compute with COUNT and SUM over bookings. Why keep it, and what must the code do so it never becomes wrong?

Keeping `booked` directly on `Event` avoids running an aggregate `SUM` query across `Booking` rows every time events are listed or checked for availability. Because it is cached/derived state, the code must update `booked` inside the exact same database transaction whenever a booking is created or deleted, and rely on `onDelete: Cascade` when an event is removed so the count never drifts out of sync.

### 3. What is the difference between prisma migrate dev and prisma generate? Which one changes the database?

`prisma migrate dev` compares `prisma/schema.prisma` against the migration history, generates SQL migration files, and applies those structural changes to the PostgreSQL database (then automatically triggers `prisma generate`). `prisma generate` only reads `schema.prisma` and regenerates the typed Prisma Client code in `src/generated/prisma` for TypeScript. Only `prisma migrate dev` changes the database itself.

### 4. A page lists 20 events with their bookings. One version runs 1 query, another runs 21. Name the problem and show how include fixes it.

This is the **N+1 query problem**: 1 query fetches the 20 events, and then 20 separate queries fetch the bookings for each individual event (`1 + 20 = 21`). In Prisma, passing `include: { bookings: true }` to `this.prisma.event.findMany({ include: { bookings: true } })` loads the events and all their related bookings together without issuing a separate query per event.

### 5. Two students book the last seat at the same moment. Explain step by step why the read-check-update version can sell two seats and why the conditional updateMany cannot.

With read-check-update, both requests can read `event.booked` before either write commits, both see 1 seat left in JavaScript, and both execute an update—selling two seats when only one was available. With conditional `updateMany` (`where: { id: eventId, booked: { lte: event.capacity - dto.seats } }`), PostgreSQL evaluates the condition and increments `booked` atomically on the row. The first request matches the condition and updates `1` row (`count === 1`), while the second request sees the incremented `booked` value, updates `0` rows (`count === 0`), and throws `ConflictException`.