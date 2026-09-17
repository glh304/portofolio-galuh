# Anti-Slop Guidelines (Code, Design & Communication)

These principles apply to all generated code, user interfaces, and communication to ensure high-craft, senior-engineer quality that feels natural, human-crafted, and free of generic AI boilerplate.

---

## 1. Code Craftsmanship (Anti-Slop Code)

- **Zero Redundant Comments**:
  - Never explain what the code obviously does (e.g., avoid `// set count to 0`, `// add click event listener`, `// fetch user data`).
  - Only use comments when explaining *why* a non-obvious business logic, workaround, or mathematical formula is necessary.
  - Self-documenting code with clear variable and function names is always preferred over explanatory comments.

- **No Over-Engineering / Zero Bloat**:
  - Avoid creating multiple unnecessary wrapper layers, deeply nested utilities, or helper classes for single-line operations.
  - Write idiomatic, modern, concise code. Do not wrap simple tasks in defensive abstractions unless specifically required.
  - Avoid absurdly verbose naming (e.g., prefer `handleSubmit` over `handleUserFormSubmissionEventAndTriggerApiRequest`).

- **No Lazy Placeholders / Complete Implementation**:
  - Never emit lazy placeholders like `// TODO: implement logic here`, `/* rest of code unchanged */`, or stubbed dummy functions.
  - Always provide working, robust, and complete implementations ready for production.

- **Human-Readable Architecture**:
  - Organize files cleanly with consistent formatting.
  - Prefer flat, composable patterns over complex inherited hierarchies.

---

## 2. Design & UI Aesthetics (Anti-Slop Design)

- **Bespoke Identity over AI Templates**:
  - Avoid the generic "AI generator aesthetic": oversaturated purple/blue glowing cards, uniform `rounded-3xl` everywhere, and cookie-cutter layouts.
  - Give every interface a distinctive personality, thoughtful color harmony, and styling appropriate for its specific domain and users.

- **Intentional Typography & Layout**:
  - Choose fonts and typographic scales with deliberate hierarchy.
  - Respect whitespace, visual rhythm, and clean proportions rather than filling every empty space with floating gradient bubbles.

- **Smooth Micro-Interactions**:
  - Implement subtle, tactile hover, active, and focus states.
  - Ensure animations are fast (150ms-300ms) and serve a functional purpose (feedback, orientation), not distracting motion.

- **Robust & Accessible**:
  - Use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<button>`).
  - Maintain strong color contrast and responsive fluid layouts that work flawlessly across mobile and desktop.

---

## 3. Communication Style (Anti-Slop Voice)

- **Direct, Authentic & Human**:
  - Skip unnecessary robotic filler, excessive pleasantries, and corporate buzzwords (`delve into`, `testament`, `beacon`, `in conclusion`).
  - Be concise, direct, helpful, and natural—communicating like a sharp, trusted senior peer programmer.
