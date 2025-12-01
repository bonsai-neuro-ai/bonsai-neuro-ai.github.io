---
title: Inference in Reinforcement Learning with Stochastic Predictive Coding
tags: pitch
permalink: false
---

This project would be co-advised by Dr. Alex Ororbia and Dr. Richard Lange. 

Predictive coding is a mathematical framework for information processing in brains that emphasizes the kind bi-directional information flow seen in brains (unlike deep feedforward neural nets). [Alex's past work](https://arxiv.org/abs/2209.09174) has integrated PC with reinforcement learning. However, PC computes an approximate MAP value for each variable, which should in theory be worse than computing a full posterior over latent variables. [This paper](https://arxiv.org/abs/2311.13664) shows that adding just the right amount of 'noise' to predictive coding turns it into Langevin sampling, which is a form of posterior inference. 

We want to know: what happens when Langevin dynamics are used in the reinforcement learning setting, combining the above two ideas?