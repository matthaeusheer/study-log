---
title: "Turtlebot 3D Controller"
date: 2026-08-17
tags: [robotics, turtlebot, ros2]
depth: solid          # quick-read | repetition | solid | deep
# links:               # optional — uncomment and fill in
#   - label: "Resource name"
#     url: "https://..."
---

## What I Did
* Spawned headless Gazebo (not working well in VM)
* Wrote turtlebot3_mover package with own launch file spawning world, robot, gazebo, rviz, turtlebot mover
* Proportional control of a robot to a target place (without awareness of world or map for now)

## Key Insights
* Odometry drift is crazy :D
* Launch files rock.
* setup.py and packaging logic is somethat weird but well
