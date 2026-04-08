import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// To enable ISR caching on Cloudflare, uncomment the lines below
// and add a KV namespace "NEXT_INC_CACHE_KV" in wrangler.jsonc.
// import kvIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";

export default defineCloudflareConfig({
  // incrementalCache: kvIncrementalCache,
});
