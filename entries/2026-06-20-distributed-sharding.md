---
title: "Sharding & Partitioning Strategies"
date: 2026-06-20
tags: [distributed-systems, databases, scaling]
depth: solid
summary: "Hash vs. range partitioning, the hot-shard problem, and consistent hashing to minimize reshuffling on resize."
links:
  - label: "DDIA Chapter 6"
    url: "https://dataintensive.net/"
---

## What I studied

- Range partitioning: good for range scans, prone to hotspots
- Hash partitioning: even distribution, loses range-scan locality
- Consistent hashing + virtual nodes: add/remove a node without rehashing everything

## Key insight

Consistent hashing only moves `1/N` of keys when you add a node — that's the property that makes elastic scaling actually feasible.
