// ESM import syntax
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://918c8f5d98f92bd27f56ce614e62e936@o4507843148251136.ingest.de.sentry.io/4507927725998160",
  integrations: [nodeProfilingIntegration()],
  // Tracing
  tracesSampleRate: 1.0, // Capture 100% of the transactions

  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});
