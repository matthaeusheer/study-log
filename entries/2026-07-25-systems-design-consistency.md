---
title: "Distributed Systems: Consistency Models"
date: 2026-07-25
tags: [distributed-systems, consistency, databases, interviews]
depth: solid
summary: "Worked through linearizability vs. sequential consistency vs. eventual consistency with concrete examples. CAP theorem is overused — PACELC is more useful."
links:
  - label: "Designing Data-Intensive Applications (Kleppmann)"
    url: "https://dataintensive.net/"
  - label: "PACELC Paper"
    url: "https://dbmsmusings.blogspot.com/2010/04/problems-with-cap-and-yahoos-little.html"
---

## Models covered

- **Linearizability**: every op appears instantaneous at some point between its start and end
- **Sequential consistency**: ops appear in some sequential order consistent with each process's order
- **Eventual consistency**: all replicas converge given no new writes — says nothing about when

## Why PACELC > CAP

CAP only talks about behavior during a partition (rare). PACELC also captures the latency/consistency tradeoff during normal operation, which is the tradeoff you actually make every day.
