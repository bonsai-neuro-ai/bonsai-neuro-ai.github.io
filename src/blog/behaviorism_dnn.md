---
layout: layouts/blog_post.njk
title: The New Behaviorism of Deep Neural Networks
author: Richard D. Lange
tags:
  - blog
  - archival
date: 2018-10-13
---


About a month ago, I had the chance to attend the [CCN
conference](http://ccneuro.org/) in Philadelphia. This post is **not**
about all the great talks and posters I saw, the new friends I made, nor
the fascinating and thought-provoking discussions I had. It's a great
conference, but this is a post about a troubling and ironic theme that I
heard more than a few times from multiple speakers. The troubling part
is that behaviorism is making a comeback. The ironic part is that it is
driven by a methodology that is intended to replicate and elucidate the
details of mental representations: deep neural networks.

In 2014, a landmark paper by Dan Yamins and others in Jim DiCarlo's lab
set the stage: they essentially showed that each layer in a 4-layer
"deep" neural network trained to do object recognition could be mapped
to representations found along the primate ventral stream, which is
known to be involved in visual object recognition in the brain.
Importantly, they went a step further and showed that the better a
neural network was at classifying objects, the better it was at
explaining representations in the ventral stream. This was (and is) a
big deal. It was proof of a theory that had been floating in many
researcher's minds for a long time: the ventral stream analyzes the
visual world by hierarchical processing that culminates in disentangled
representations of objects.

So where do we go from there? Since 2014, the deep learning community
has progressed in leaps and bounds to bigger, faster, better performing
models. Should we expect Yamins et al's trend to continue -- that better
object recognition gives us better models of the brain for free? The
[evidence](https://www2.securecms.com/CCNeuro/docs-0/5928796768ed3f664d8a2560.pdf)
says no: sometime around 2015, "better deep learning" ceased to
correlate with "more brain-like representations."

This is why I was surprised to hear so many speakers at CCN suggest
that, to paraphrase, "to make neural networks better models of the
brain, we simply need bigger data and more complex behaviors." It all
reduces to inputs and outputs, and as long as we call the stuff in
between "neural," we'll get brain-like representations for free!

I'm not alone in questioning the logic behind this approach. A similar
point to mine was articulated well by Jessica Thompson on Twitter during
the conference:

> where does the notion that "the more complex the problem, the fewer
> the number of solutions that exist to it" come from? It's come up a
> couple times today at
> [#CCN2018](https://twitter.com/hashtag/CCN2018?src=hash&ref_src=twsrc%5Etfw)
> and I don't get the intuition
>
> --- Jess Thompson (@tsonj) [September 7,
> 2018](https://twitter.com/tsonj/status/1038167836018049024?ref_src=twsrc%5Etfw)

Of course, a neural network that solves both problem A and problem B
will be more constrained than one that solves either A or B alone.
Bigger data makes for more constrained models, as long as the model's
outputs -- its behaviors -- are limited. Is it obvious, though, that
adding complexity to the behaviors we ask of our models will likewise
push them towards more human-like representations? Is it clear that this
is the most direct path towards AI with human-like cognitive properties?
My concern is for a research program built around neural networks that
nonetheless fixates on the **inputs** and **outputs**, stimulus and
behavior. This is simply **behaviorism** meets **deep learning**.

Now, nearly every cognitive scientist I've ever met is happy to denounce
the old, misguided doctrines of "behaviorism." Calling someone a
behaviorist could be taken as a deep insult, so allow me to clarify a
few things.

## An extremely brief history of behaviorism

The behaviorists were not as crazy as folk-history sometimes remembers
them to be. To the more extreme behaviorists, led by B. F. Skinner,
there was no explanatory power in internal representations in the mind,
since they were assumed to be either unobservable (at best based on
introspection) or reducible to inputs and outputs (Skinner, 1953, p.34).
It should be noted, however, that even Skinner did not reject the
*existence* of mental representations themselves, nor that they were
interesting objects of scientific study. He simply rejected
introspection, and hoped everything else would have a satisfying
explanation in terms of a subject's lifetime of stimuli and behaviors.
This is not unlike the suggestion that the representations used by
neural networks should be understood in terms of the dataset and the
learning objective. So, why did behaviorism fall out of favor?

Behaviorism's decline began with the realization that there are many
aspects of the mind that are best understood as mental representations
and are not easily "reducible" to stimuli or behavior -- perhaps not a
surprising claim to a modern reader. The classic example is Tolman's
discovery of **cognitive maps** in rats. Tolman demonstrated that mental
representations are not only useful and parsimonious explanations, but
are also measurable in the lab. Historically, his results spurred a
shift in the emphasis of psychologists from measurement and control of
behavior to understanding of the mental representations and processes
that support it.

As in Yamins et al (2014), this has always been the goal of using deep
neural networks as models of the brain: starting with the right
architecture, optimizing for a certain behavior gives us brain-like
representations "for free." Wouldn't it be ironic then if deep neural
nets led cognitive scientists back to behaviorism?

## What are the alternatives?

The *alternative* to the behaviorist approach is that our models in
cognition and neuroscience should be guided by more than just matching
the inputs and outputs of the brain.<sup>[\[1\]](#footnotes)</sup> The difficult but
incredibly important problem here is characterizing what are the right
constraints on the stuff in between. Training their model to do object
recognition was interesting, but I think the success of Yamins et al
(2014) came from their 4-layer model architecture which was designed to
match known architectural properties of the ventral
stream.<sup>[\[2\]](#footnotes)</sup> It's perhaps no surprise that neural networks
pushing hundreds of layers have ceased to be good models of the ventral
stream.

So, what kinds of constraints should we put on our model architectures?
This problem needs to be approached from many directions at once:
anatomical constraints of what connects to what, functional constraints
on the class of computations done by each part of the model, and
normative constraints like Bayesian learning and inference of latent
variables. We need to look to ideas from the unsupervised learning
literature on what makes good "task-independent" representations. In
other words, our models need the right *inductive* *biases*. They should
mimic human learning not just in the "big data" regime with millions of
input/output examples, but in the limited-data regime as well.

This is not an exhaustive set of criteria and I don't claim to have the
right answer. However, I **do** believe that anyone interested in
understanding how the brain works needs to invest more in understanding
anatomical, functional, and normative constraints on representations
than simply pushing in the direction of task-optimized black-boxes.

------------------------------------------------------------

<span id="references"></span>
## References

- Yamins, D. L. K., Hong, H., Cadieu, C. F., Solomon, E. A., Seibert,
  D., & DiCarlo, J. J. (2014). Performance-optimized hierarchical models
  predict neural responses in higher visual cortex
- Skinner, B. F. (1953). Science and human behavior
- Tolman, E. C. (1948). Cognitive maps in rats and men. Psychological
  review

<span id="footnotes"></span>
## Footnotes

1.  For a philosophical perspective, consider John Searle's [Chinese
    Room](https://en.wikipedia.org/wiki/Chinese_room) thought
    experiment. Searle imagines a room with a mail slot, where queries
    written in Chinese characters are the "input" and responses are
    passed back out through a different slot, also written in Chinese
    (let's say Mandarin). From an input/output perspective, the system
    appears to be an intelligent agent who is fluent in Mandarin and
    providing thoughtful answers to the input queries. The catch in
    Searle's thought experiment is that inside the room is someone who
    only speaks English, but who has a very large book of "rules" for
    handling different types of inputs. This person, with the help of
    the book, is implementing an AI program that can intelligently
    respond to questions in Mandarin. This thought experiment can be
    taken in a few different directions. Here, I would argue that it's
    an example of how simply matching the inputs and outputs of some
    desired behavior doesn't necessarily give what you would expect or
    want in between.
2.  Further work led by Yamins & DiCarlo has continued in the direction
    of testing various architectural constraints like using
    [recurrence](https://arxiv.org/abs/1807.00053).
