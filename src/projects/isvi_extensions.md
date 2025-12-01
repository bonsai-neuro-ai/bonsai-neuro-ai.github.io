---
title: Extensions to a hybrid MCMC sampling + Variational Inference method
tags: pitch
permalink: false
---

__Background:__ Probabilistic inference is the heart of statistics and much of machine learning. Crack open any statistics or probabilistic machine learning book, and it will tell you that there are two rather different families of approaches to doing inference in practice: Markov Chain Monte Carlo (MCMC) methods and variational inference (VI) methods. In Dr. Lange's past work$^{[1]}$, he and colleagues questioned the dichotomy between MCMC and VI and derived a continuum of inference algorithms which provably "interpolate" between MCMC-like behavior and VI-like behavior. 

We would like for some motivated students to pick up the proverbial torch and extend this work in a variety of ways: 

- __Project idea #1:__ for the more theoretically inclined, there are bounds in the 2022 paper which are conjectured but unproven. There is also some speculation on how they could be sharpened.
- __Project idea #2:__ a more empirical project would be to optimize the implementation of the theory using state of the art sampling techniques like Kinetic Langevin.
- __Project idea #3:__ making the method more 'wall time' efficient rather than just more 'sample efficient' may require adapting some stochastic-likelihood sampling techniques [REF TODO].

__Suggested background reading:__

1. [Lange et al (2022)](https://proceedings.mlr.press/v180/lange22a.html)
1. REF #2
