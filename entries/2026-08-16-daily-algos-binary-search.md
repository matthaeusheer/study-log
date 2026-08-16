---
title: "Daily Algos: Binary Search"
date: 2026-08-16
tags: [algorithms, binary-search]
depth: solid          # quick-read | repetition | solid | deep
# links:               # optional — uncomment and fill in
#   - label: "Resource name"
#     url: "https://..."
---

## What I Did
* Solved binary search (recursive and iterative)
* Solved binary search over sorted 2D matrix (recursive and iterative)

## Key Insights
* Binary search complexity derivation: n/2**k = 1 (termination condition) and solve for k -> k = log2(n) which gives us time complexity
* Real integer division (//) does not accumulate error in O(n) calculation, repeated flooring is like flooring it all. Step count is exactly floor(log2n) + 1
* free pre-flight check target against array bounds at the beginning
* Recursive version: O(logn) space for call stack, iterative version O(1) space, both O(logn) time
* Mapping function for row_idx, col_idx = idx // n_cols, idx % n_cols
* Keep the problem solving-habit: Listening, Questions, Constraints, Examples, Edge Cases, Brute Force, Optimization, Coding, Testing

