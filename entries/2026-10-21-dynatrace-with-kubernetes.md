---
title: "Dynatrace with Kubernetes"
date: 2026-10-20
tags: [dynatrace, kubernetes, operator, crd]
depth: solid          # quick-read | repetition | solid | deep
# links:               # optional — uncomment and fill in
#   - label: "Resource name"
#     url: "https://..."
---

## What I Did
* Made a Dynatrace test subscription and connected local kind cluster
* Local kind cluster with some go apps and kafka workload
* Installed dynatrace operator in cluster and applied active gateway and one agent through DynaKube CRD
* Gathered telemetry and looked at Dynatrace functionality (logs, metrics, k8s workloads, dashboards, notebooks, ...)
