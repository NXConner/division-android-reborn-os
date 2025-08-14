## ISAC OS Roadmap

- Completed
  - Theme toggle component with persistent dark/light mode
  - Sidebar compact state persisted and synchronized with Settings
  - Constants module for app metadata and route keys
  - Barrel exports for ISAC components
  - No-FOUC theme script in `index.html`

- High Priority
  - Split large UI components with React.lazy for faster initial load
  - Add route-level code-splitting for heavy pages (e.g., map, reports)
  - Introduce error boundaries for critical sections
  - Add accessibility labels and reduced-motion fallbacks for animations

- Medium Priority
  - Add unit tests for core UI components and hooks
  - Add E2E smoke tests for key routes
  - Integrate React Query Devtools in development

- Low Priority
  - Extend `StatusBar` to accept live data via context or props
  - Add offline caching for static assets

- Notes
  - Keep colors HSL-only to align with theme tokens
  - Prefer `@/components/isac/index.ts` for importing ISAC components