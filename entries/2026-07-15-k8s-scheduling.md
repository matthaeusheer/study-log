---
title: "Kubernetes Scheduling & Affinity"
date: 2026-07-15
tags: [kubernetes, platform, scheduling]
depth: solid
summary: "Node affinity, pod affinity/anti-affinity, taints and tolerations — and how the scheduler scores nodes."
links:
  - label: "Scheduler docs"
    url: "https://kubernetes.io/docs/concepts/scheduling-eviction/"
---

## What I studied

How the default scheduler picks a node: filtering (predicates) then scoring (priorities). Then the knobs you use to influence it:
- `nodeAffinity` for hard/soft node placement
- `podAntiAffinity` to spread replicas across zones
- taints + tolerations to reserve nodes

## Key insight

Anti-affinity with `topologyKey: zone` is how you get real HA — otherwise the scheduler happily stacks all your replicas on one node.
