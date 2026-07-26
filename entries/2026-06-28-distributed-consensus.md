---
title: "Raft Consensus"
date: 2026-06-28
tags: [distributed-systems, consensus, raft, databases]
depth: deep
summary: "Raft = leader election + log replication + safety. Easier to reason about than Paxos because it enforces a strong leader."
links:
  - label: "Raft Paper"
    url: "https://raft.github.io/raft.pdf"
  - label: "The Secret Lives of Data (visualization)"
    url: "http://thesecretlivesofdata.com/raft/"
---

## What I studied

The three sub-problems Raft decomposes into:
- **Leader election** via randomized timeouts + terms
- **Log replication** where the leader appends and followers acknowledge
- **Safety** guaranteeing committed entries survive leader changes

## Key insight

The randomized election timeout is the whole trick for avoiding split votes — a beautifully simple solution to a hard liveness problem.
