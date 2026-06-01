---
title: Fundamentals of dynamic perception
tags: pitch
permalink: false
---

### Background

Perception in humans/robots/animals is dynamic: more like video than like still images. This is supported by recurrent circuits in the brain, in contrast to the typically feedforward dynamics in most state of the art neural network models. Dynamics in sensory processing support at least three distinct capacities:

1. __Dynamic world:__ simply enough, the world itself is often dynamic. Use recurrence to process video/audio/tactile streams.
2. __Evidence integration:__ processing a sequence of glimpses of a static underlying scene. The dynamics here are that a perceiver becomes more confident in what they're seeing the more information (more glimpses) they get. Mathematically, the ideal dynamics of evidence-integration are well-understood as $$\log p(c|x_1,\ldots,x_t) = \log p(c|x_1, \ldots, x_{t-1}) + p(x_t | c)$$ where $c$ is the thing (e.g. object class) being inferred and $\{x_1,\ldots,x_t\}$ is a sequence of independent glimpses (aka evidence). Whether/how humans and other animals match or deviate from this ideal, in what domains, and on what timescales, is a topic with a long history in cognitive science.
3. __Resolve ambiguity:__ even on static inputs, if they are ambiguous (blurry, occluded, etc), simply "staring at it for a while" engages recurrent processing that can reduce uncertainty. Notably, this doesn't involve 'new evidence' per se, but further rumination on existing evidence. Various studies in neuroscience and ML have shown that recurrent processing can reduce ambiguity in this way.

Importantly, we have models of *each* of these phenomena, including models of each of them *as* recurrent perception, but (to my knowledge) no single model has been evaluated on all three of these 'dynamic perception' capacities.

### The project

The research question is: are these three distinct capacities or do they all share a single underlying mechanism? Does a model trained to do #1 gain the ability to do #2 and #3 for free?

The proposed project here would be: first, acquire or train some video-processing models e.g. V-JEPA. Then, evaluate those models on evidence-integration and ambiguity-resolution problems as in #2 and #3 above. 