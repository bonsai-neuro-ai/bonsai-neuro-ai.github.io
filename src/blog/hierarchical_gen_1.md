---
layout: layouts/blog_post.njk
title: Common Misconceptions about Hierarchical Generative Models (Part 1 of 3)
author: Richard D. Lange
tags:
  - blog
  - archival
date: 2019-01-06
---

It's generally understood that the brain processes the visual world
hierarchically, starting with low-level features like patches of color,
boundaries, and textures, then proceeding to a representation of whole
scenes consisting of objects, people, and their relations. We also have reason to believe that the brain has learned a
**probabilistic generative model** of the world where data come in
through the senses analogously to raw pixels from a camera, and percepts
correspond to structures in the world that the brain **infers** as the
causes of the data.

Consider how images of random trees might be generated. First, choose a
species, say a willow. Next, generate its parts: trunk, branches,
leaves, etc. Keep breaking parts down by generating their sub-parts,
like how a twig contains leaves and a leaf contains a stem and veins.
Finally, "render" each sub-part into a small patch of the image. This
process is a **hierarchical generative model** of the tree's image -- we
start with an abstract high-level idea of an object, then hierarchically
generate more and more specific parts. Inverting this generative model
(i.e. doing inference) means working in the reverse direction: starting
with pixels, detecting sub-parts, aggregating to parts, and ultimately
recognizing objects and scenes.

Hierarchical generative models are important both for neuroscience and
for machine learning (ML) and AI. Yet, we lack general, effective
methods to fit them to data, and our understanding of the brain's
internal model is correspondingly limited. This may be due, in part, to
a few intuitions that have been muddled in the field. At the very least,
they've been muddled in my own mind until recently, so I wanted to write
a series of posts to share some recent insights. What follows is a
series of **intuitions** I've held myself or heard from others, which
are, in some big or small way, not quite right.

In total, I have 7 intuitions to be broken down into 3 posts. Stay tuned
for the rest!

## Intuition 1: the brain approximates the true model of the world

What does it mean for the brain to learn an "internal model" of the
world? The first (naïve) definition might be this: entities, actions,
and relations that exist in the world are somehow represented by states
of the brain. When looking at an image of a willow tree and its
constituent parts, the brain encodes a description of them --
sub-patterns of neural activity corresponding to "trunk," "leaves,"
"rustling," and the entire tree itself.

According to the naïve definition of an internal model, the state of the
world is reflected by states of the brain. I like to visualize this as a
landscape reflected in water -- a near-copy of the world flipped upside
down and juxtaposed with it, with only a thin barrier between them. The
world (**W**) literally reflected in the model (**M**).

<figure>
    <img src="/assets/blog/reflection_naive-1024x671.png" loading="lazy" width="840" />
</figure>

This captures the intuition that the hierarchical structure in the world
is directly inverted by perceptual processes in the brain.

Of course, I call this the naïve view for a reason. The brain does not
mirror the world as it really is -- how could it<sup><a href="#references">[1]</a></sup>?
Instead, the brain must have learned its own set of variables. For
instance, we often imagine V1 as having learned a model for oriented
edges in a scene. And while research has proven that detecting edges and
other such low-level image features is an important first step towards
scene understanding, I'm skeptical of any argument that those
oriented-edge features exist "in the world." At best, they exist "in the
image," but the image is a property of the observer, not the environment
being perceived! The reflection metaphor deserves an update:

<figure>
    <img src="/assets/blog/reflection_updated-1024x671.png" loading="lazy" width="840" />
</figure>

By this I mean more than the old adage that "[all models are
wrong](https://en.wikipedia.org/wiki/All_models_are_wrong)."
Allow me to explain further...

It's common to see hierarchical descriptions of the world (as my willow
tree example above) side by side with hierarchical descriptions of
sensory processing in the brain. But even if the world is truly
hierarchical and the brain processes it hierarchically, that does not
imply that the brain "inverts" the world model at every stage! The world
is hierarchical in the sense that objects contain parts which contain
sub-parts, but the object-recognition processes in the brain are often
thought to proceed from edges to textures to shapes back to objects.
Even if the brain arrives at a fairly accurate representation of objects
in the end, it takes its own route to get there. Image textures are not
object parts.

It's also worth noting that in statistics there is typically an implicit
assumption that the data were generated from an instance of the model
class being fit. It's rarely stated that data are generated from the
process **W** but fit using the the model family **M**<sup><a href="#footnotes">[1]</a></sup>.
This has important consequences that break some of the fundamental rules
of probability like Bayes' rule and the chain rule. I'll explain more in
the next post.

## Intuition 2: hierarchical models are basically just more complicated priors

Setting questions about the "true"model of the world aside for a moment,
what else are hierarchical models good for? From a purely statistical
standpoint, hierarchical models allow us to fit more complex data
distributions. Understanding this requires defining the **marginal
likelihood** of a model.

The **marginal likelihood** or **model evidence** is a probability
distribution over the input space. Using the tree example above, it
would be a distribution over all possible images of trees that might be
generated by our tree-generating procedure. Recall that our procedure
for generating trees involved first selecting a species, then generating
the trunk, then limbs, then twigs, then leaves, etc. The marginal
likelihood is the probability of getting a given image, summed over all
possible runs of this procedure weighted by how likely each one
is<sup><a href="#footnotes">[2]</a></sup>:
$$P(Im)
 = \hspace{-0.5em} \sum\limits_{s\in\text{species}} \hspace{-0.5em}P(s) 
\hspace{-0.5em} \sum\limits_{t\in\text{trunks}} \hspace{-0.5em}P(t | s) 
\hspace{-0.5em} \sum\limits_{b\in\text{branches}} \hspace{-0.5em}P(b|t) 
\hspace{-0.5em} \sum\limits_{l\in\text{leaves}} \hspace{-0.5em}P(l|b) 
\times P(Im|l)$$

...which is, of course, the procedure for marginalizing over other
variables in the model, hence the name.

<figure class="alignfloat aligncenter">
<img src="/assets/blog/willow-full-model.png" loading="lazy" width="300" height="242" />
<figcaption>This image of a willow tree can be thought of as the result
of a generative process from the trunk to branches to leaves and finally
to the image. These variables depend on each other in ways that produce
the visible structure in the image.</figcaption>
</figure>

(Notice that I dropped the 'species' variable since 4 layers of
hierarchy is plenty for now). We can imagine what would happen if we
removed the trunk and branch variables, generating an image by placing
leaves anywhere and everywhere at random<sup><a href="#footnotes">[3]</a></sup>:

<figure class="alignfloat aligncenter">
<img src="/assets/blog/willow-synth-model.png"loading="lazy" width="300" height="242" />
<figcaption>This synthetic image matches the low-level texture
statistics of the previous image. Think of it as a model of leaves
without the structure given by branches. Using texture alone results in
an image that lacks any overall structure.</figcaption>
</figure>

But what if we knew enough about how leaf positions are distributed
without writing the full model of tree trunks and branches? If our goal
is to generate realistic tree-leaf images (because why wouldn't it be),
we could in principle get away with directly modeling the dependencies
between leaves:

<figure class="alignfloat aligncenter">
<img src="/assets/blog/willow-fancy-model.png" loading="lazy" width="300" height="242" />
<figcaption>Explicitly modeling the dependencies between leaves (a fancy
prior) can result in complex images too.</figcaption>
</figure>

Another way to say this is that, from the perspective of the marginal
likelihood over images, higher-level variables simply serve to induce a
fancy prior on the lower-level variables. Mathematically, we can write
$${\color{blue}
 P_\text{fancy}(l)} = \hspace{-0.5em} \sum\limits_{t\in\text{trunks}} 
\hspace{-0.5em}P(t) \hspace{-0.5em} \sum\limits_{b\in\text{branches}} 
\hspace{-0.5em}P(b|t) \hspace{-0.5em} \sum\limits_{l\in\text{leaves}} 
\hspace{-0.5em}P(l|b) $$

So that the marginal likelihood is simply

$$ P(Im) = \hspace{-0.5em} \sum\limits_{l\in\text{leaves}} {\color{blue} P_\text{fancy}(l)} \times P(Im|l) $$

This means that [purely from a marginal likelihood standpoint, a
hierarchical model is nothing but a fancy
prior<sup><a href="#footnotes">[4]</a></sup>. So why
should we prefer truly hierarchical models to, say, super flexible
("fancy") families of priors? (I'm looking at you, [normalizing
flows](https://arxiv.org/pdf/1505.05770.pdf)).
Here are a few reasons:

1.  [Representation
    matters](/blog/behaviorism_dnn/).
    Explicitly representing higher-level variables is almost certainly
    going to be useful.
2.  Despite what I wrote in **intuition 1**, using a hierarchical model
    to represent a hierarchical world is a good idea. (Ok, so this is
    just another way of saying that representation matters)
3.  Inductive biases. There may be many ways to construct arbitrarily
    flexible priors, but not all of them will be equally effective.
    Hierarchical models for perception may generalize better from
    limited data.
4.  Computational tractability. Most sampling and message-passing
    algorithms for inference become simple when dependencies between
    local variables are simple. For example, it would be relatively easy
    to write an algorithm that actually generates branches and attaches
    leaves to them. This is an example of a simple dependency. Imagine
    the mess of code it would take to generate each leaf individually
    conditioned on where the other leaves are!

In the next post(s), I'll describe how complex priors do not necessarily
imply complex posteriors (and vice versa), how model mismatch breaks
basic assumptions of probability, and more!

------------------------------------------------------------------------

<span id="footnotes"></span>
## Footnotes

1.  This is not a point about approximate inference. For instance, we
    might want to fit model **M** to data generated by **W**, but even
    **M** could be intractable. We would therefore resort to some
    approximation **Q** that gets close to **M** but is tractable. Now
    we have to juggle **three** distinct ideas: the true data-generating
    process (**W**), our best approximation to it in a model (**M**),
    and the inferences we actually draw (**Q**).
2.  I'm simplifying here by assuming that the image is generated
    directly from the set of leaves of the tree. Perhaps
    [[$P(Im|s,t,b,l)$]{.katex-mathml}]{.katex} would be more reasonable,
    since it would allow the image to depend on the species and branches
    of the tree directly. But! Most work on deep generative models makes
    the same simplification where the data depend only on the lowest
    level variable<sup><a href="#references">[2]</a></sup>. This might be reasonable if you
    think the "lowest level" is image features rather than object parts,
    as I discussed in **intuition 1**.
3.  I'm again committing the fallacy here that I warned about
    in **intuition 1**: I'm being imprecise about the difference between
    features of the image and features of objects. Here it's a matter of
    convenience -- I don't actually have a 3D generative model of trees
    to render examples from.
4.  To add a comment about brains, this means that from the perspective
    of V1, a complicated statistical prior over natural images could in
    principle be feed-forward. If cortico-cortical feedback is to be
    understood as priors, it must be because separating the
    representation of high- and low-level things is useful, and/or
    because the brain's model and inference algorithm are "locally
    simple" as described above.

<span id="references"></span>
## References

1.  Feldman, J. (2016). What Are the "True" Statistics of the
    Environment? *Cognitive Science*, 1--33.
    http://doi.org/10.1111/cogs.12444
2.  Zhao, S., Song, J., & Ermon, S. (2016). Learning Hierarchical
    Features from Generative Models.
    [https://arxiv.org/abs/1702.08396](https://arxiv.org/abs/1702.08396)
3.  Rezende, D. J., & Mohamed, S. (2016). Variational Inference with
    Normalizing Flows.
    [https://arxiv.org/pdf/1505.05770.pdf](https://arxiv.org/pdf/1505.05770.pdf)
