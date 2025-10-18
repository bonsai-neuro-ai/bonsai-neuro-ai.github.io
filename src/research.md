---
layout: layouts/page.njk
title: Research
---

## Papers

See <a href="https://scholar.google.com/citations?user=xc-Z4CoAAAAJ">Google Scholar</a>

## High-level research areas

### What makes a good and useful neural representation and how do we compare them?

Neural systems like brains and deep networks process information by transforming "representations." 
A classic question in the field of computational cognitive neuroscience is whether different neural systems process information similarly &#45; representing the same information and performing the same algorithms on those representations. However, what makes a representation useful in one system may be different from another system, depending on those systems' context, including goals, architectures, and learning rules. There is no one "optimal" way to represent the world independent of this context. One direction we're working on is adapting tools for quantifying dissimilarity of representations while allowing for these meaningful differences in context.

### Learning optimal representations using modern ML

This branch of our research is funded by NSF #2451460.

With the increasing reliance on computer vision (CV) systems in areas ranging from robotics and autonomous driving to assistive technologies, there is a growing need for machine learning (ML) systems that produce robust, trustworthy, and general-purpose representations of the visual world. Recent developments in self-supervised learning (SSL) and weakly-supervised learning (WSL) have made strides towards this goal, state-of-the-art SSL and WSL methods rely heavily on heuristic loss functions and intuitive data augmentations that have weak theoretical backing and few guarantees in the face of uncertain inputs. We propose a more rigorous approach to representation-learning that will deliver general-purpose visual representations for use on general vision tasks while remaining robust to sources of uncertainty.

We draw significant inspiration from the idea of multicalibration, which has recently emerged in the theoretical ML literature as a highly impactful tool for assessing whether a probabilistic model produces accurate, trustworthy, and fair probability judgments. However, calibration has so far been limited to supervised categorical prediction or supervised regression tasks. Our first research step is a novel extension of calibration to unlabeled data, which will greatly expand the scope of where calibration can be applied. We then show that this extended definition of calibration leads naturally to a set of constraints on high-dimensional representations of images (or other data). Enforcing these constraints on the embeddings produced by a model ensures that those embeddings are uncertainty-aware representations of the inputs. The constraints we derive from calibration bear resemblance to state-of-the-art SSL and WSL loss functions, and thus has the potential to place SSL and WSL on firmer theoretical grounds. In our proposed approach, representations are constrained to be consistent with posterior statistics in some unspecified probabilistic model, making the learned representations naturally robust to noise, data degradation, and other sources of uncertainty.

### Anything else that is interesting!

Some other areas that we dabble in:

* Studying DNN information processing using geometry
* Improved statistical inference algorithms
* Causal models and their relevance to AI/ML
* Kernel methods and neural tangent kernels
