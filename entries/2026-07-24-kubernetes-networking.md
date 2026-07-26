---
title: "Kubernetes Networking Deep Dive"
date: 2026-07-24
tags: [kubernetes, networking, platform, cni]
depth: deep
summary: "Worked through the full CNI plugin chain, iptables rules kube-proxy generates, and how service discovery via CoreDNS ties it together."
links:
  - label: "Kubernetes Networking Model"
    url: "https://kubernetes.io/docs/concepts/cluster-administration/networking/"
  - label: "CNI Spec"
    url: "https://github.com/containernetworking/cni/blob/main/SPEC.md"
---

## What I studied

Traced a packet from pod A to pod B across nodes. Mapped out how:
- The CNI plugin (Flannel/Calico) sets up veth pairs and routing tables
- `kube-proxy` manages iptables DNAT rules for Service VIPs
- CoreDNS resolves `service.namespace.svc.cluster.local`

## Key insight

The "flat network" abstraction Kubernetes promises is entirely implemented by the CNI plugin — the kernel knows nothing about pods. This is why network policies are also CNI-dependent.

## What I'd do differently

Would have started with `kubectl exec` + `tcpdump` from day one rather than reading docs first.
