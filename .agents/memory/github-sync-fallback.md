---
name: GitHub sync fallback
description: How to publish a full repository when the GitHub connector works but Git CLI credentials are unavailable.
---

When GitHub OAuth is healthy but `git push` still reports missing or invalid credentials, use the authenticated GitHub REST proxy rather than requesting or exposing a token. An empty repository must first be initialized with a small file through the Contents API. Upload blobs below the connector rate limit, then create Git tree objects directory by directory before creating the commit and updating `refs/heads/main`.

**Why:** In this environment the connector supported authenticated REST writes, while `gh` and HTTPS Git operations did not receive credentials. A single large recursive tree request also timed out, while incremental directory trees succeeded.

**How to apply:** Use this only after direct Git authentication fails and the existing OAuth connection is confirmed usable through `GET /user`. Verify the final recursive tree, commit message, default branch, and repository visibility through the API.