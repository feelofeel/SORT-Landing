// The content contract every locale must satisfy, derived from the UA source tree.
// Adding a key to uk.ts automatically requires it in en.ts (build fails otherwise).
import type { uk } from "./uk";

export type Content = typeof uk;
