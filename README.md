# AI-Powered Claim Orchestrator

A fully responsive, self-service insurance claim tracking dashboard that both informs and allows users to interact with the claim process.

## Getting Started

Pick whichever package manager you prefer:

```bash
# npm
npm install
npm run dev

# pnpm
pnpm install
pnpm dev

# bun
bun install
bun dev
```

Open [http://localhost:4000](http://localhost:4000) in the browser.

OR

You can browse live demo here: https://claim-tracking-app.vercel.app/

---

## Design Decisions

### Registry Pattern for Heterogeneous Data

The `processDetails` array contains 8 step objects, each with completely different fields. I implemented the **Registry Pattern** as suggested in the brief:

- Each step type has its own isolated component (`TowingServiceNode`, `AppraisalNode`, etc.) that receives a fully-typed `data` prop inferred directly from its Zod schema — no casting, no `as` assertions.
- A central mapper (`nodeRegistry`) resolves the correct component by looking up `title`. The orchestrator (`ClaimTimeline`) renders any step with a single function call — no `if/else` or `switch` anywhere.
- Adding a new step type means creating one file and adding one line to the registry. So compatible with Open/Closed Principle.

### Zod + Discriminated Union for Type Safety

The API response is validated using a Zod discriminated union keyed on `title`. TypeScript knows the exact shape of each step inside its own component — the types flow from schema to component without any manual annotation.

### Zustand for Global UI State

- `claimStore`: tracks user-inserted notes and attachment groups, keyed by their position in the timeline.
- `aiStore`: minimal — stores which step is currently active in the AI panel, and which step index the sidebar last requested to expand.

### TanStack Query for All Async Work

Every async operation goes through TanStack Query rather than manual `useState`/`useEffect` pairs:

- `useClaimData` — fetches and validates the claim JSON, with a simulated delay to make loading states visible.
- `useAIExplanation` — simulates AI explanation fetching process.
- `useDocumentAnalysis` — simulates certificate upload flow.

### Layout

On mobile everything stacks in a single column. On desktop I use a CSS grid with a fixed left sidebar (`TimelineSidebar`) showing a progress bar and a step navigator, and a scrollable main panel on the right. Clicking a step in the sidebar scrolls to it and expands it if it was collapsed.

### Corporate Design

- **Colors**: blue-700 primary, slate neutrals, semantic status colors (emerald / teal / blue / slate), amber for action-required states.
- **Typography**: Inter Variable.
- **Loading**: skeleton screens mirror the real content layout rather than generic spinners.

---

## What I Would Improve With More Time

As it is mentioned to spend 2 hours for the case study, I just focus on the MVP and leave the rest improvement areas. Below are my improvement areas:

1. **Animation** — I would add `FramerMotion` library and would use it to add some animations, for example adding smooth transition while expanding/collapsing the card contents.

2. **Design** - I would spend time on the design of the app as there is no given design. Look for sample insurance company related designs, best practices, alternative layouts for desktop, alternative theme/coloring etc..

3. **Persistence** — I would save user-inserted notes and attachments to `localStorage` so they survive a page refresh.

4. **Testing** — I would use AI to create tests covering the three core user questions across both mobile and desktop viewports.

5. **Refactor** — I would spend time on refactoring the folders/files that were created by AI Agent.

---

## AI Tools Used

- **Claude (Anthropic)** — I used as a coding assistant via Claude Code extension of VS Code.
