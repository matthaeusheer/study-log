---
title: "Rust Traits & Generics"
date: 2026-07-05
tags: [rust, systems-programming]
depth: solid
summary: "Trait objects vs. generic bounds: dynamic dispatch with a vtable vs. monomorphized static dispatch. Chose based on whether you need a heterogeneous collection."
links:
  - label: "Rust Book - Traits"
    url: "https://doc.rust-lang.org/book/ch10-02-traits.html"
---

## What I studied

The two ways to be polymorphic in Rust:
- `impl Trait` / `T: Trait` bounds → monomorphized, zero-cost, static dispatch
- `dyn Trait` → trait object, vtable, dynamic dispatch, needed for `Vec<Box<dyn Trait>>`

## Next

Look at how `async-trait` works around the lack of async fns in traits.
