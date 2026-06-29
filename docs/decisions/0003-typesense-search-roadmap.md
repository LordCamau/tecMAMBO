# Decision: local search now, Typesense next

The current app implements accessible local search over articles and glossary terms so the user-facing route is complete. Production should replace the in-memory search source with Typesense indexing from the WordPress publish webhook.

The UI contract is intentionally simple: query in, grouped article/glossary results out. That keeps a future Typesense adapter small.
