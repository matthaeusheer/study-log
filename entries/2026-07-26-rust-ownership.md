---
title: "Rust Ownership & Borrowing"
date: 2026-07-26
tags: [rust, systems-programming, memory]
depth: quick-read
summary: "First pass through ownership rules. The borrow checker clicks once you stop thinking in GC terms and start thinking about who is responsible for freeing memory."
links:
  - label: "The Rust Book - Ownership"
    url: "https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html"
---

## The mental model that helped

Think of ownership as a single-owner resource handle, borrowing as passing a reference with a lifetime contract. The compiler enforces that you never have a mutable reference while any other reference exists.

## Next

Move into lifetimes and then look at how `Arc<Mutex<T>>` works under the hood.
