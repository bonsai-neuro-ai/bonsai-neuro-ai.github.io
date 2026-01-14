---
title: Improved single-camera 3D pose estimation with reprojection and filtering
tags: pitch
permalink: false
---

__Note: this project is taken by a Spring 26 capstone student__

We'd like to improve on state-of-the-art Computer Vision systems for human pose estimation. Pose estimation is the problem of determining where different body eypoints (elbows, knees, eyes, etc) are in space. There are some freely available models like OpenPose and MediaPipe which you can download and use, but all such systems are known to make systematic errors.

The idea of this project would be to take an off-the-shelf pretrained keypoint detection system --- any available online which produces a heatmap for each keypoint --- and generate *better* poses from it by simply being a bit more clever about how model outputs are post-processed. While the 2D->3D problem is notoriously under-constrained in general, there are some simple constraints that should make pose inference in videos feasible. For instance, bones don't change length over time, so if the elbow appears to move closer to the shoulder, a system should in theory "know" that the arm is actually pointing towards (or away from) the camera.

The specific proposal is to combine the concept of "reprojection" with a constrained skeleton and heatmap-style keypoint models. Project sketch:

0. download and benchmark some open-source 3D pose estimation system (e.g. MediaPipe)
1. create or download a "biophysically realistic" set of constraints for how keypoints fit together. In other words, create a data structure which represents the contstraints of the human body like fixed bone lengths.
2. create the forward model which "reprojects" 3D skeleton points down to 2D
3. create an optimization or online inference algorithm (aka a "filtering" algorithm) to update 3D positions such that (i) biophysical constraints are not violated and (ii) reprojected points maximize likelihood according to the heatmap
