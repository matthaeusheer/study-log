---
title: "Rust Async & Tokio"
date: 2026-07-10
tags: [rust, async, systems-programming, tokio]
depth: deep
summary: "Futures are state machines the compiler generates. Tokio is just an executor that polls them. .await is a yield point."
links:
  - label: "Tokio Tutorial"
    url: "https://tokio.rs/tokio/tutorial"
---

## What I studied

Traced how `async fn` desugars into a `Future` state machine, and how the executor drives it via `poll`. Built a small TCP echo server on Tokio.

## Key insight

`.await` doesn't block — it yields control back to the executor until the future is ready. Blocking calls inside an async task stall the whole worker thread, which is the classic footgun.
