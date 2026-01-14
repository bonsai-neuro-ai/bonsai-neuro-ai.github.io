---
title: Exploration of neural stitching
tags: pitch
permalink: false
---

A common problem in neuroscience and neuro-AI is to compare the internal representations across brains and models (does your brain represent things similar to mine? similar to a deep neural network? are all DNNs similar to each other for that matter?). There are many tools to do this kind of comparison$^{[1,2]}$. Neural Stitching$^{[3]}$ is a relatively new family of methods that we're pretty excited about; it uses the _downstream part_ of one network to interpret the _upstream part_ of another.

Limited studies have been done exploring various aspects of stitching. The most complete study to date is perhaps [4]. There is a lot of work to do just playing in this space and seeing what stitching can do. Some things we're thinking about:

- some studies stitch A to B, creating a AB model hybrid, then maximize the performance of the hybrid. None (to our knowledge) seeks to maximize the 'match' to the original behavior of A or B. We have code to do this but have not systematically evaluated a suite of models.
- what happens when you stitch together models that were originally trained on different tasks?
- what happens when the 'stitching layer' itself is constrained or regularized? (some of this done by [4] already)
- can we speed up the stitching optimization problem? This is currently an experimental bottleneck.
- how do we stitch across architectures, e.g. convolutional models into transformer models and vice versa?
- can recurrent models or models with feedback connections be stitched? how?
- can we create an easy-to-use and well-documented toolkit for performing these kinds of experiments? See [here](https://github.com/bonsai-neuro-ai/nn-library/blob/main/demos/demo_stitching.py) for our current system which is functional but tricky to work with and not well documented yet.

__References:__

1. Klabunde, Max, Tobias Schumacher, Markus Strohmaier, and Florian Lemmerich. 2023. “Similarity of Neural Network Models: A Survey of Functional and Representational Measures.” arXiv:2305.06329. Preprint, arXiv, August 6. https://doi.org/10.48550/arXiv.2305.06329.
2. Sucholutsky, Ilia, Lukas Muttenthaler, Adrian Weller, et al. 2023. “Getting Aligned on Representational Alignment.” arXiv:2310.13018. Preprint, arXiv, October 18. https://doi.org/10.48550/arXiv.2310.13018.
3. Bansal, Yamini, Preetum Nakkiran, and Boaz Barak. 2021. “Revisiting Model Stitching to Compare Neural Representations.” arXiv:2106.07682. Preprint, arXiv, June 14. https://doi.org/10.48550/arXiv.2106.07682.
4. Csiszárik, Adrián, Péter Kőrösi-Szabó, Ákos K. Matszangosz, Gergely Papp, and Dániel Varga. 2021. “Similarity and Matching of Neural Network Representations.” Paper presented at Advances in Neural Information Processing Systems. November 9. https://openreview.net/forum?id=aedFIIRRfXr.