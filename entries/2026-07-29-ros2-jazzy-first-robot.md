---
title: "ROS 2 Jazzy - first robot"
date: 2026-07-29
tags: [ros2, python, robotics, dds]
depth: solid          # quick-read | repetition | solid | deep
---

## What I Did
* Installed ROS 2 Jazzy on the Ubuntu VM, ran the demo talker/listener
* Built my own tiny rclpy talker/listener package
* Drove turtlesim around with teleop and `/cmd_vel`
* Played around with teleop and inspected topics to understand how it works

## Key Insights
* No master in ROS 2, nodes just find each other via DDS
* ros2 cli is pretty cool, autocomplete rocks
* build process for ros python packages is weird but well works
