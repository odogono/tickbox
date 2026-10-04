import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "@/routes/__root";
import { indexRoute } from "@/routes/index";
import { listRoute } from "@/routes/lists.$listId";

const routeTree = rootRoute.addChildren([indexRoute, listRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
