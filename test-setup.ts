// Runs first: installs a DOM before any test or library touches `document`.
import { GlobalRegistrator } from "@happy-dom/global-registrator";

GlobalRegistrator.register();
