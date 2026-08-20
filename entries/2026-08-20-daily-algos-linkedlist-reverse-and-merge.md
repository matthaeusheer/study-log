---
title: "Daily Algos: LinkedList Reverse and Merge"
date: 2026-08-20
tags: [algorithms, linkedlists]
depth: solid          # quick-read | repetition | solid | deep
# links:               # optional — uncomment and fill in
#   - label: "Resource name"
#     url: "https://..."
---

## What I Did
* Coded up a LinkedList datastructure in Python
* Solved LinkedList reversal brute force O(n) space and proper O(1) space with triple pointers
* Solved LinkedList two sorted lists merge

## Key Insights
* Use a sentinel. It prevents ugly pre-loop edge case checks and solves problem of first iteration setup.
* A sentinel is an element outside of the actual list acting as a dummy element.

