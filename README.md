# Tickbox

Tickbox is Northstar Labs' shared to-do app. People keep tasks on lists
(Groceries, Work, Home renovation) and share those lists with each other.

This is a small, self-contained slice of the product: a list page showing its
tasks, backed by an in-memory API.

## Conventions

- Data fetching lives in hooks under `src/hooks/`. Hooks gate on
  `useAuth().isAuthenticated` and key their queries under `CacheKeys` in
  `src/lib/cache-keys.ts` so shared invalidation reaches everything.
- Every query renders a loading state and an error state.
- The API checks that the caller is a member of the list a resource belongs
  to. Access rules live in `server/store.ts`.
- Tests sit in `src/__tests__/` and run with `bun test`.

## Running

```sh
bun install
bun run check      # typecheck + tests
bun dev            # API on :4100 plus Vite on :5173 (proxies /api)
bun run server     # API only
bun run client     # Vite only, if the API is already running
```

The demo user is Ana, who is on Groceries and Work but not Home renovation.
