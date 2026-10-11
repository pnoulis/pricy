# What is caching?

The layer responsible for managing local snapshots of remote web resources
provided by the ingestion layer.

## Why cache remote web resources?

Caching as a standalone layer serves the following purposes (among others):

- Decouple the parser (the layer above the caching) from the ingestion layer
- Serve repeated reads locally without issuing duplicate network requests
- Enable deterministic and reproducible parser testing
- Facilitate offline development against captured DOM fixtures
- Minimize request volume to prevent triggering rate limits and anti-bot
  defences.
- Minimize usage of local resources

## Responsibilities

- Storage medium
- Key hashing
- Expiration (TTL)
- Cache hit/miss logic
- Storage size checks (Is there enough space to store the snapshot)
- Integrity verification / handling corrupted files
- Cleanup of expired entries
- Key collision mitigation
