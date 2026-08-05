---
title: "ROS2 Module 2 - Packages and Launch Files"
date: 2026-07-30
tags: [ros2, python, robotics, colcon]
depth: solid          # quick-read | repetition | solid | deep
---

## What I Did
* Colcon workspace, entry_points, ament_cmake vs ament_python
* Launch files: multi-node, parameters, remapping, namespaces
* ROS_DOMAIN_ID isolation

## Key Insights
* `ros2 run` just executes whatever's at `install/<pkg>/lib/<pkg>/<exe>` - language irrelevant
* remapping = name substitution before topic creation, independent of parameters
* namespace = FQN prefix on everything at once, avoids node-name collisions
