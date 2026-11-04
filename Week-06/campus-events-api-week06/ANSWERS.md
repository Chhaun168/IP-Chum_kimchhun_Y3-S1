Week 6 Lab - Conceptual Answers

1. DELETE /events/2 returns 204 and the second call returns 404. Is DELETE still idempotent? Explain with what idempotent means.

Yes, DELETE is still idempotent even though the second call returns a 404. Idempotency means that making multiple identical requests has the exact same effect on the server's state as making a single request. After the first deletion, the resource is gone, and subsequent calls leave the resource deleted without altering the server state any further.

2. The Vue app on port 5173 calls the API on port 3000. Which program blocks the response when CORS is not configured, and why can curl read it anyway?

The web browser blocks the response when CORS is not configured due to the Same-Origin Policy security restriction. curl can read the response anyway because command-line tools do not enforce browser-based security policies like CORS.

3. EventsController never writes new EventsService(). Who creates the service, when, and how many are created?

NestJS's built-in dependency injection container creates the service automatically when the application starts up and modules are initialized. Only a single instance (a singleton) of EventsService is created and shared across the application.

4. A client sends { "title": "Pitch Night", ..., "booked": 50 }. Which line of code refuses it, and what would happen to booked without it?

The ValidationPipe combined with forbidNonWhitelisted: true in src/setup.ts refuses the request because booked is not defined in CreateEventDto. Without this option or validation, the extra booked field would either be stripped out or wrongly accepted depending on whitelist settings, allowing clients to tamper with internal data.

5. Why is the “not enough seats” rule in BookingsService and not in BookingsController or only in the Vue form?

The rule belongs in BookingsService because business logic and data integrity checks must live on the server to prevent bypasses. Controllers should only handle HTTP routing and mapping, while client-side form checks can easily be bypassed by users interacting directly with the API.