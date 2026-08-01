# 16 — Contact form with Resend

**What to build:** Replace the current mailto link with a proper contact form. 2-column grid — left side still TBD (could be social links, availability status, or decorative content), right side has a form with Name, Email, Subject, and Message fields. Integrates with Resend API via a Next.js API route to send emails on submission. Includes basic spam protection (CAPTCHA or rate-limiting approach TBD).

**Blocked by:** 02 — Home page shell + Profile section

**Status:** completed

- [x] Set up Resend account and API key, add to env vars
- [x] Create Next.js API route (`/api/contact`) that receives form data and sends via Resend
- [x] Plain controlled form for Name, Email, Subject, Message fields
- [x] Form validation (required fields, email format)
- [x] Form sections: left column (social links, radar, CV download, email), right column (form fields + submit)
- [x] Submit button with loading state, success/error feedback
- [x] Basic spam prevention (honeypot field)
- [x] Integration test with mocked Resend client

## Comments

Implemented via commits `93fb267`, `6260701`, `ac7b7dc`, `424a61f`.

- `/api/contact` API route (Pages Router) validates required fields + email format server-side, drops honeypot submissions silently, and sends via `resend.emails.send`. Lazy-inits the Resend client and guards on `RESEND_API_KEY` / `CONTACT_EMAIL`.
- `ContactForm` component: controlled Name/Email/Subject/Message fields with field-level error display, loading/success/error states, honeypot field, `name` attrs for autofill, `data-testid="contact-form"`.
- Contact section: 2-column grid (`lg:grid-cols-[5fr_7fr]`). Left column = `//GET IN TOUCH` heading + description, animated `@thegridcn/radar` (targets: Socials bottom-left, Projects top, Email right), then social links + email + Download CV. Right column = `ContactForm`.
- Env vars: `RESEND_API_KEY`, `CONTACT_EMAIL`, `RESEND_FROM` added to `.env.example`.
- Spam prevention: honeypot field (client) + field validation (server). CAPTCHA/rate-limiting intentionally deferred (was TBD in ticket).
- Tests: `__tests__/contact.test.tsx` covers API route (GET 405, required fields, email format, honeypot short-circuit, successful Resend call with mocked client) and component (render, success/error/loading states, inline validation errors).
