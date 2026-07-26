---
title: "Observability: Metrics, Logs, Traces"
date: 2026-06-12
tags: [platform, observability, prometheus]
depth: solid
summary: "The three pillars and when each earns its keep. Traces are the one people skip and then desperately need during an incident."
links:
  - label: "Prometheus docs"
    url: "https://prometheus.io/docs/introduction/overview/"
---

## What I studied

- Metrics: cheap, aggregatable, great for alerting (RED / USE methods)
- Logs: high-cardinality detail, expensive at scale
- Traces: request flow across services, essential for latency debugging

## Key insight

Metrics tell you *that* something is wrong; traces tell you *where*. Alert on metrics, debug with traces.
