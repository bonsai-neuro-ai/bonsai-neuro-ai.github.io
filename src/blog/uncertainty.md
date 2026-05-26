---
layout: layouts/blog_post.njk
title: "Neither aleatoric nor epistemic: a third kind of uncertainty in need of a name"
author: Richard D. Lange
tags:
  - blog
  - draft
date: 2026-05-26
---

A common refrain in both AI and theoretical neuroscience is that agents must deal with uncertainty. AI is interested in engineering effective agents and neuroscientists are interested in reverse-engineering the incredibly capable agent that is the human brain, so both disciplines engage with the idea of an "optimal" or "ideal" agent. As the usual story goes, a hypothetical optimal agent ought to use (or behave _as if_ they are using) probability theory to make sense of the world and to make decisions, i.e. follow the prescription of Bayesian Decision Theory (BDT). Knowing about BDT is not essential to understanding anything else in this post. I mention it only because I want to convey the scope of the claims made by proponents of BDT and probability theory (of which I am sometimes one). Probability and BDT purport to characterize the optimal solution to all of sensing, decision-making, control, and learning. And, the fact that this framework cuts across AI and neuroscience makes it quite appealing to those of us in the "NeuroAI" space seeking a common theoretical understanding of both bots and brains.

So, what is an agent uncertain _about_ and _why_ is an ideal agent uncertain about anything at all? Let's survey a few visible sources and see what we find in the literature. A 2017 paper by Alex Kendall and Yarin Gal asks in its title, “What Uncertainties Do We Need in Bayesian Deep Learning for Computer Vision?”. Their answer is __aleatoric uncertainty__ and __epistemic uncertainty.__ Kevin Murphy's popular 2012 textbook "Probabilistic Machine Learning" (and its 2022 updates) likewise categorizes uncertainty into aleatoric and epistemic types. The [wikipedia article on uncertainty quantification](https://en.wikipedia.org/wiki/Uncertainty_quantification) lists a variety of sources of uncertainty, but ultimately falls back on these same two categories: aleatoric and epistemic. We could keep going. With few exceptions, we would find that the existing answer to the question of _why_ an ideal agent is uncertain boils down to two reasons: _alea_ and _episteme_. __My main argument is that this list is incomplete and we ought to have a third kind of uncertainty.__ More on that below.

Let's set aside for a moment the *why* question and return to the *what* question: the typical story is that a perceiving and acting agent is uncertain about two kinds of things: (i) the current state of the world, and (ii) the parameters of their environment. These correspond to the classic distinction between (i) inference and (ii) learning. The *what* and *why* questions are separate, giving rise to a 2x2 table that characterizes much of the uncertainty quantification literature:

|               | Aleatoric        | Epistemic                               |
|---------------|------------------|-----------------------------------------|
| **State**     | sensor noise     | incomplete measurement (e.g. occlusion) |
| **Parameter** | data subsampling | incomplete data                         |

The reason for writing this post is to add a third column to this table; I'm primarily interested in the *why* axis not the y-axis of this table, so I will refrain from going on a tangent about States and Parameters and what is or isn't different about the two. Short version: I am opposed to the terminology used by some authors who refer to epistemic as "reducible" and aleatoric as "irreducible" uncertainty; this applies to the learning problem with iid data, but it's not general. All sources of uncertainty could be "reducible" or not depending on various particulars of who is uncertain about what and which actions they can take. But enough about that.

## A brief introduction to aleatoric and epistemic flavors of uncertainty

The term __aleatoric__ comes from the Latin word _alea_ meaning dice or gambling. Some helpful word-associations are that we talk about aleatoric uncertainty when we talk about "randomess", "chance", "noise", etc. Aleatoric uncertainty is at play when we say
> “I’m uncertain about ____ because the process that generates it is inherently random.”

A direct translation of aleatoric uncertainty into the world of decision-making agents would be any situation where an agent is literally betting on the outcome of a random event like gambling on the roll of a die. It's perhaps unsurprising that such an agent ought to know something about probability to make good decisions. But aleatoric uncertainty is more general than literal random-prediciton problems; it also matters for infernece. A classic example in computer (and biological) vision is that, in low light, images are better described as a count of a discrete number of photons than a continuous measurement of brightness, and those photons have _randomized_ arrival times at the sensor. This makes low-light images look "grainy": there is "noise" in the measurement itself. So if the $\text{world} \rightarrow \text{image}$ process is itself _inherently noisy_, then an agent tasked with inferring $\rm p(world | image)$ may be uncertain about the precise state of the world due to aleatoric reasons. This kind of uncertainty is sometimes called "objective" because random processes happen out there in the world, measurably, externally from the agent, and verifiable by a third party.

---

The term __epistemic__ comes from the Greek word _episteme_ meaning knowledge. Some word-associations for epistemic uncertainty include "ambiguity", "missing data", "occlusion", etc. Epistemic uncertainty is at play when we say
> “I’m uncertain about ____ because I’m lacking some disambiguating information”

A classic example from vision is occlusion. When one object blocks the view of another, we are uncertain about the details of the farther object. The tricky thing about epistemic uncertainty is that it often is resolved with a single correct answer. There is a particular occluded object with a particular identiy and particular characteristics. We do not _sense_ those properties but _infer_ them. Someone looking at the same scene from a different perspective may possess that key "disambiguating information" which I lack, so they may be far less uncertain about what they are seeing. In this sense, and in contrast to aleatoric uncertainty being "objective," epistemic uncertainty is sometimes associated with the idea of "subjective probability." If you find it strange or counterintuitive to apply the language of probability to describe events that _have a single well-defined correct answer_, then suffice it to say that you are in good historical company. But thanks to the works of 20th century figures like de Finetti, Cox, and Jaynes (and probably many others I haven't read), we have a nice coherent mathematical theory establishing that any _logical_ agent uses probability to calculate their subjective degree of belief about any ambiguous but non-random event.

---

Taking stock of the story so far, we have two types / two flavors / two answers to the "why" question of uncertainty:

1. Sometimes the world is "inherently random." Agents are then uncertain of things for aleatoric reasons. Probability is the language used to describe randomness, so ideal agents use probabilistic calculations to deal with aleatoric uncertainty.
2. Sometimes the world is "ambiguous" from an agent's perspective but has a single well-defined state (or parameter value). For less obvious reasons, probability theory is again the tool of choice for ideal agents to reason about such situations.

### Introducing "laboric" uncertainty

I argue that the above picture is incomplete and that there is a third kind of uncertainty besides aleatoric and epistemic. I'll call it "laboric" for now, but will sketch some other potential names below.

The earliest example I can find articulating that there is _something missing_ in the classic story of probability theory is a 1967 paper by Ian Hacking title "Slightly More Realistic Personal Probability". ("Personal" and "Subjective" probability are synonymous here). The following examples illustrate the idea:

1. How certain are you that 1010101 is a prime number? 
2. What about 1010105?

I don't know about you, but I would say that I am __uncertain__ about whether 1010101 is a prime number. And this uncertainty is neither aleatoric nor epistemic! Nothing about this question involves _randomness_ nor _ambiguity_. You know (I assume) what a prime number is. And you know what the number "1010101" is. All that's left is the working-out of whether or not it is in fact prime. But I cannot do that quickly in my head (perhaps without some tricks). But perhaps I know that most numbers are not prime, so after a moment's reflection I would say that I would be "willing to bet" that 1010101 is not prime, but I would not bet a ton of money on it. Compare this to the 1010105 example. One might quickly recognize that any number ending in '...5' must be divisible by 5 number and know for certain that it is not prime. After just a moment's consideration, I would be willing to bet quite a lot that 1010105 is not prime.

More generally, Laboric uncertainty is at play when we say
> “I’m uncertain about ____ because I haven’t the time/energy/resources to work it out.”

A moment's reflection should reveal that this kind of uncertainty is pervasive in all aspects of our lives. The prime number example illustrates that the act of doing some internal mental calculation can move something from ambiguity to certainty, and that even precise mathematical statements might be deemed "uncertain" by an agent who does not see the value in investing their precious resources (time, energy, etc) in working it out. Thus, not all logically-true statements are assigned probability 1 by an agent who is judiciously allocating their compute resources.

Importantly, this is not a restatement of Godel's incompleteness theorem. The incompleteness theorem shows that there are true statements which are undecidable given _arbitrarily large resources._ An agent on a budget of "feasible" computation will be uncertain about even more things. For further ideas along these lines, I recommend reading [Scott Aaronson's essay "Why philosophers should care about computational complexity."](https://arxiv.org/abs/1108.1791) His essay makes the point that the distinction betwween feasible/infeasible computation can be as philosophically rich as the computable/incomputable distinction, and while philosophers have embraced the latter there is relatively little work engaging with the former.

Certainly not everything an agent does is a mathematical or logical test like finding the prime factors of integers. In fact I will concede that a negligible amount of what the human brain does is directly analogous to prime factorization. Let us pivot and consider the case for laboric uncertainty in visual perception. Try these two examples, and try to answer each in less than 1/4 of a second (start the timer when you first look at the image):

3. In the left image below, is the star on the interior or exterior of the closed curve?
4. What about the right image?

<figure>
  <img src="/assets/blog/star squiggle.png" width="500" />
  <figcaption>Is the star on the inside or the outside of the closed curve?</figcaption>
</figure>

This is a classic test of visual reasoning. And if you are like most humans, you will find that the answer to the left image and right image are both clear (left: star is outside, right: star is inside), but that the left example requires a greater amount of 'mental effort.' The implication is that, just like the primality of 1010101 and 1010105, we are initially uncertain until we apply some effort. And there are 'hard' examples requiring processing and there are 'easy' examples for which we can apply some shortcut to arrive at certainty quickly.

The other feature revealed by this example is that resource constraints are not just a matter of laziness. There may be externally-imposed time limits. Consider a self-driving car processing images from its many cameras and needing to decide within milliseconds if what it sees is a safety concern. We could just as easily talk about a human driver in a similar situation; in both cases there is a vehicle controlled by an 'agent', and that agent is under some serious time pressure to make sense of what they are sensing and make decisions. This time pressure means that they may be uncertain about things even if some slow-motion replay of the scene would make all relevant information clear and certain. Again, this uncertainty is not a matter of randomness nor of missing information: a car-driving agent may simply need _time to process what they are seeing_.

Or perhaps we can motivate the real-world impacts of laboric uncertainty outside of perceptual problems but staying in the realm of driving. I argue that I would be a better and safer driver if I had the ability to instantly plan and reroute. Planning a novel route through a familiar area involves some mental simulation and ruling out alternatives. It has happened to me before that I pull out of my neighborhood going one way only to realize I should have gone the other way. I might then take a longer route, make a u-turn, or otherwise make some maneuver to correct my mistake. Thankfully this has never caused any explicit harm, but applying this example at scale, I would feel safer in a world where all drivers have a clear and correct plan in mind before they get going than a world where u-turns and other course-corrections are commonplace. If only my mental planning had been instantaneous!

Imagine you are tasked with assessing the impact of _uncertainty_ on human or AI car-driving safety. Applying the textbook definitions of uncertainty, you consider the impact of _aleatoric_ factors (camera noise, weather conditions like rain, etc.) and _epistemic_ factors (occlusion, novel objects, etc.), I'd argue that you would have formed an incomplete picture. Laboric uncertainty is a third kind of uncertainty that has practical impacts on the design and assessment of decision-making agents. But the field does not have a term for "uncertainty due to limited resources" or "uncertainty due to time pressure" or the like. There is value just in _naming_ this third kind of uncertainty to make it part of the conversation. My pitch is "laboric"; some alternatives are mentioned below.

### A nod to related ideas

A literature search for "bounded rationality" or "bounded optimality" or "satisficing" will turn up a trove of work from the 80s and 90s - roughly one to two major AI hype cycles ago - in which researchers grappled deeply with the problem of designing AI systems that get as close as possible to the BDT ideal on a limited computation budget. I think it is safe to say that this perspective fell out of favor as neural networks took over and compute became cheaper, but "metareasoning" systems in AI are making a comeback as compute resources grow ever more exorbitant and the AI industry looks for ways to reduce compute costs. My take is that this is a very interesting (re)emerging area, but that it is in need of more discussion and more formalization. 

For steps in the direction of formalizing laboric uncertainty, V-entropy and V-information developed by Xu et al (2020) "A theory of usable information" is a good start. 

### Alternative names

"Alea" comes from Latin and "Episteme" comes from Greek. So there is perhaps a Western classics tradition at play here and we should seek a Latin or Greek root for our new uncertainty-due-to-resource-limits. Good news! "Labor" is both Latin and English and can elicit ideas of "work" or "resources." There is also an argument to be made that English has replaced Latin and Greek as the global _lingua franca_, so a term coined in 2026 would be better coined in English than in the less-widely-known Latin and Greek. Fun fact: the tradition in biology of naming species in Latin seems esoteric to modern ears but began at a time when Latin was one of the most widely-understood languages in the world. So this is what I like about "laboric": it communicates the key idea in English, which is the default for science communication these days, but it also has a nod to the classical roots of _alea_ and _episteme_.

Still, it's fun to think about some other classically-motivated terms. But I speak neither Latin nor Greek, so I cannot confidently stand behind these translations. Please get in touch if you have a correction (or a suggested term!)

* __Mesonic__ uncertainty: from the Greek "mesos" meaning resource or the means to an end. I like the "means" connotation. 
* __Aergic__ uncertainty: Aergia is a character from mythology, the Greek personification of laziness. Also nice that "Aerg" sounds like "urge" or "erg" and therefore accidentally conveys some idea of effortfulness. But the trouble with 'laziness' is that it suggests a deliberate lack of work rather than a resource constraint.
* __Socordic__ uncertainty: Socordia is to Latin what Aergia is to Greek.
* __Kopocic__ uncertainty: Kopos is Greek for "work"
* __Ignavic__ uncertainty: Ignavia is Latin for "sloth"

