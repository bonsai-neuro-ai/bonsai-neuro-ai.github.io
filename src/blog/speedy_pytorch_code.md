---
layout: layouts/blog_post.njk
title: Speedier PyTorch and some other notes on good management of research code
author: Richard D. Lange
tags:
  - blog
date: 2026-01-01
---

We do a fair amount of neural network model training and evaluation in the lab. This blog post is essentially some note-to-self and note-to-students containing best-practices for writing "good" and "speedy" research code.

### Some notes on project design

I've already written some notes on project design [in this GitHub repo](https://github.com/bonsai-neuro-ai/torch-mlflow-template). New lab members should probably go read that first. Critical take-aways:

1. I've tried a few different frameworks over the years. We don't mandate that lab members use PyTorch + MLFlow, but it is strongly recommended to reduce friction. The more everyone in the lab uses the same frameworks, the more we're able to help each other out.
2. Always separate analysis code from plotting code. A typical "single job" repo would have at least 3 files:
  - A python file (`run.py` or whatever) which accepts command line arguments and runs a single "analysis job" like trianing a model. In the example repo linked above, a single "job" involves loading two pretrained models, picking out a hidden layer from each, and quantifying similarity between their representations. Such a script is basically

      ```
      load stuff
      do stuff
      save results to disk
      ```

  - A shell script (`run.sh` or whatever) which calls the py file many times with a collection of different command-line arguments. It's also possible to write this "caller" script in python, but I've come to prefer shell over the years because, for whatever reason, I find it easier to manage shell scripts spawning subprocesses rather than using python `Subprocess` or `multiprocessing` modules.

    If writing shell scripts is foreign, this is the kind of thing that Copilot or other LLM tools are really good at. Also a good idea to install shell script checker tools in your IDE to catch common mistakes.
  - A plotting file (`plot.py` or whatever) which boils down to

      ```
      load results from runner script
      plot stuff
      ```

    While we're here, I'll mention my other big piece of advice on plotting: expect that plots will be made and re-made dozens of times before publication. 99% of styling/formatting should be done in the code. At a minimum, you should do `plt.figure(figsize=whatever)` with the *actual size* of the figure on the page in inches. Also, go look up how `plt.rcParams` can be used to set the font size (rule of thumb: 10pt font in figures, with an absolute-bare-minimum of 8pt in case of emergency)

### Some notes on speedier PyTorch code

Let's start with two high-level pieces of advice:

1. When optimizing, your (human) time is worth more than machine time. Sure, it's possible to ["SpeedRun" training on CIFAR-10 down to a few seconds of training time](https://arxiv.org/abs/2404.00498), but how many hundreds of hours of engineering time went into that? If you have something that works and will get things done in a "reasonable" amount of time, further optimization might just be making more work for yourself.
2. When it comes time to optimize for speed, using a profiler is the surest way to make progress. The thing that is slowing down your code is often surprising and unexpected, and you won't know what it is until you run the profiler.

On to some other detailed comments on speedier PyTorch code (with a focus on model training):

1. Surprising slowdowns will come from data transfers between different pieces of hardware on the system. At a minimum, you should understand the difference between "disk", "RAM" or "CPU" memory, and "GPU" memory, and which lines of code might involve transferring from one to another.

    - Typically a `Dataset` object is responsible for loading from disk into RAM (and applying transformations/augmentations)
    - A `DataLoader` object wraps a `Dataset` and spawns child processes (AKA "workers") so that the task of loading from disk and preprocessing data happens "in the background". When many workers query the disk at the same time, though, they can end up getting in each others' way. The disk cannot simultaneously provide different data to different CPUs. This is why the speediest choice for `num_workers` is typically greater than 1 but less than 10.
    - Calling `x.to("cuda")` or `x.cuda()` sends the Tensor `x` from CPU to GPU. Calling `x.item()` pulls it back from GPU to CPU (and if you call `mlflow.log_metric(loss)` or `print(loss)`, it triggers a GPU->CPU transfer under the hood!).

      __Both CPU and GPU will pause to synchronize until the transfer is complete.__ A big speedup, then, is to use `x.to(device, non_blocking=True)` for CPU->device transfers, avoid calling `item()` every batch to prevent lots of GPU->CPU transfers. The latter can be achieved by simply calling `mlflow.config.enable_async_logging()`.

1. Torch has some "model compilation" tricks. You can take a model written in pure PyTorch code and JIT compile it into a GraphModule object. We have some wrapper code for this in our [nn-library repository](https://github.com/bonsai-neuro-ai/nn-library), or just use the built-in `torch.compile` and related functions. Not all models can be compiled, but for those that can, this can result in a 5% to 10% speedup on forward and backward operations.
1. Rule of thumb: use the biggest batch size you can for the memory capacity of the GPU. Bigger models will require smaller batches.
1. I have personally found DDP and other multi-device parallelization strategies to be more trouble than they're worth. If you use Lightning's `Trainer`, it will by default try to use DDP. This *does* speed things up per job, but...
    - it adds extra engineering overhead and surprising bugs. For instance, various blocks of code now need to be wrapped in a `rank_zero` check, and if you miss any of these it will result in surprising bugs.
    - if you're training more than one model anyways, it's just as effective to spawn three separate training jobs and assign one to each GPU rather than have a single training job spreading out over three GPUs.
1. Training time for any given model boils down to the product of __throughput__ (batches per second, data points per batch) and __convergence rate__ (total number of batches required). Device and memory management and compilation tricks mentioned above can help with throughput, but sometimes an even more effective strategy is to _converge to a good model in fewer steps._ Tricks for this include
    - use early stopping or some other logic to "break early" when model performance stops improving, plus some logic to keep the "best" model not just the "last" model. Yes, these are built-in callbacks in Lightning, but I personally prefer to have more control over logging and training logic, so I generally avoid the `lightning.Trainer` abstraction.
    - try different learning rates or use a "LRFinder". Too small of a LR converges slowly because steps are too small. Too large of a LR converges slowly (or diverges!) because parameters "bounce around" too much.
    - Use `Adam(lr=1e-3)` as your first default when training a "classic" deep network, like those that involve lots of conv and batchnorm and relu operations. But also consider trying other LRs. 
    - Keep in mind that Adam is not the best generic optimizer out there. It just happens to be effective for certain flavors of optimization problem. If you're optimizing something small and reasonably convex (a single stitching layer for instance), an optimizer like `LBFGS` may be the better choice.
    - The other way to reduce the number of iterations for an optimization problem is to start with better initialization "close to" the optimum. This is feasible for some problems but not others. Being a little clever about initialization can save a lot of iteration time.
    - Use an adaptive step size or learning rate schedule. I defer to other online resources/tutorials/LLMs for ideas on how to do this in practice. (I think that my info here would be outdated. Ramps and annealing schedules seem popular these days, but I haven't played with them much)
