// Adds DOM matchers like toBeInTheDocument() and toHaveTextContent() to expect().
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Unmount whatever a test rendered so the next test starts with an empty page.
afterEach(() => cleanup());

// jsdom is a simulated browser and doesn't implement scrolling; give elements a no-op.
if (typeof Element !== "undefined") Element.prototype.scrollTo ??= () => {};
