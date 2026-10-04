import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
  component: () => (
    <div className="app">
      <header className="app-header">
        <Link to="/">Tickbox</Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  ),
});
