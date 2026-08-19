---
title: "Robotics: ROS2 SLAM and Navigation Stack with Turtlebot3"
date: 2026-08-19
tags: [robotics, ros2, slam, navigation, mapping, rviz, gazebo]
depth: solid          # quick-read | repetition | solid | deep
# links:               # optional — uncomment and fill in
#   - label: "Resource name"
#     url: "https://..."
---

## What I Did
* Explored map/odom/base-link frame chaim
* Ran slam_toolbox against simulation
* Used map saving with nav2_map_server
* brought up Nav2 alongside live SLAM 
* Explored global vs local planning and cost maps

## Key Insights
* With headless simulation, it's hard to build a proper map, drift is insane
* Twist vs TwistStamped can be a bit of a pain but Nav2 let's this to be overwritten with a config file
