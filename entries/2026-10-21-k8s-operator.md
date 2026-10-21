---
title: "K8s Operator"
date: 2026-10-21
tags: [kubernetes, operator, dynatrace]
depth: solid          # quick-read | repetition | solid | deep
# links:               # optional — uncomment and fill in
#   - label: "Resource name"
#     url: "https://..."
---

## What I Did
- chitchat app: three Go services talk over Kafka (gossiper → relay → listener). They send JSON logs and OTel traces to Dynatrace.
- Built own operator: ChaosMonkey, built with kubebuilder.
  - It has a CRD with validation, status and a finalizer.
  - It runs in the cluster.
  - It kills pods and reports every strike to Dynatrace as an event.
- Stronger chaos: each strike now hits one workload and kills up to 3 of its pods (relay 4, listener 3, gossiper 2), so the effect is easy to see.
- Dashboard (Dynatrace): kills, log volume, traces (complete, incomplete, duplicated), new pods and up/down status per workload, all on one timeline.

