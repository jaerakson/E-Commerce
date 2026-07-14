import { migrate } from "./schema";
import { seed } from "./seed";

let _initPromise: Promise<void> | null = null;

export function ensureDb(): Promise<void> {
  if (!_initPromise) {
    _initPromise = (async () => {
      await migrate();
      await seed();
    })();
  }
  return _initPromise;
}
