---
title: Identifying the sampling/variational tradeoff in neural data
tags: pitch
permalink: false
---

In [this Nature paper](https://www.nature.com/articles/s41593-019-0554-5), Walker et al used neural networks to nonparametrically model the _probabilistic decoding_ of stimulus information from a non-human primate brain. Their analysis assumed a static (variational) representation of proabability over time. 

Separately, [Dr. Lange's work on probabilistic inference](https://proceedings.mlr.press/v180/lange22a.html) (see also the previous blurb) suggests that there is a continuum of inference algorithms between stochastic time-varying algorithms (MCMC) and static optimizers (variational inference). This leads us to wonder: what happens if we go back and re-analyze Walker et al's data but allow for time-varying encoding? Could we quantify the extent to which the primate brain is 'more like sampling' or 'more like variational inference'?