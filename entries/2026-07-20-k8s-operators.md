---
title: "Writing a Kubernetes Operator"
date: 2026-07-20
tags: [kubernetes, platform, go, controllers]
depth: deep
summary: "Built a toy operator with controller-runtime. Reconcile loops finally make sense: you converge state, you don't react to events."
links:
  - label: "Kubebuilder Book"
    url: "https://book.kubebuilder.io/"
---

## What I studied

Wrote a small operator that manages a custom resource. Key pieces:
- CRD definition + generated deepcopy code
- The reconcile loop: read desired state, read actual state, make them match
- Watches and owner references so child objects trigger re-reconciliation

## Key insight

The controller is level-triggered, not edge-triggered. You never "handle an event" — you always compute the full desired state from scratch. That's what makes it resilient to missed events and restarts.
