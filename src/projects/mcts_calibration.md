---
title: Assessing self-consistency and miscalibration in tree-search planners
tags: pitch
permalink: false
---

One of the strongest modern approaches to general reinforcement-learning problems involves Monte Carlo Tree Search (MCTS) deployed with a learned probabilistic policy and a learned value function. The role of the policy is to predict useful actions in the current state or $\pi(a|s)$. The role of MCTS is to refine the policy through search and simulation. The result of running $N$ searches through the tree is an updated action distribution $\pi_N(a|s)$. The open-question to be explored is on the relationship between $\pi$ and $\pi_N$. Ideally (we conjecture), you could re-run the $N$ searches infinitely many times and get the __self-consistency__ or __calibration__ property that $\pi(a|s) = \mathbb{E}[\pi_N(a|s)]$. This at least seems like an intuitively useful property, and part of this project will be to explore whether or not that is true. Students might take different angles depending on whether they are more interested in mathematical proofs or coding and data analysis: 

__Theoretical angle:__ a more theoretically-inclinde student could make a project out of deriving regret bounds and decomposing those bounds into terms such as the state-action information and the miscalibration (although the exact form of these bounds and what terms would be involved would be part of the question). 

__Empirical angle:__ construct a simple turn-based environment and deliberately simple policy model family. Systematically vary the complexity of the policy model (e.g. number of parameters) and train each to convergence. Across many such models, empirically compute terms like state-action information and self-consistency through tree-search. Analyze the performance of these models at different search depths.