# TQFT's and Frobenius Algebras

This document is essentially a text version of the
video. I use this to organize my thoughts.

## Content of the video

A list of all the things that I would like to include in the video.
I use this to figure out what goes in the script and what sort
of visuals I will need/want.

### Motivation for TQFT's from physics

We motivate it from "quantum gravity".
The goal of this is to unify quantum mechanics
with general relativity.
General relativity describes gravity through the curvature
of space-time. On the other hand, quantum mechanics
makes describes states using mathematical objects
called Hilbert spaces.

Topological quantum field theory is a toy model, but
still provides interesting results nonetheless.
We will view space as some manifold. In principle,
this should be 3-dimensional for standard physics,
but this is a lot more difficult, so we will
just look at 1-dimensional manifolds.
It turns out that the only possibility is a circle,
or some copies of a circle. These represent "space".

To incorporate quantum theory, we have to choose
some Hilbert space of "states" for our space.
If we have multiple copies of the circle, we
take tensor products of the Hilbert spaces.
So far this doesn't sound too interesting. We still
have one final ingredient: time.

To include time, we add an extra dimension. Throughout
time the shape of "space" may change. If we look at
what happens between two time-steps we end up with a
2-dimensional manifold, with as boundaries, the "space"
at the start and the end. We call these "cobordisms".
Since these correspond to a transformation of space,
we need to give an appropriate transformation
between the corresponding Hilbert spaces.

- <https://math.ucr.edu/home/baez/planck/node3.html>
- <https://stanford.edu/~sfh/tqftslides.pdf>
- <https://physics.stackexchange.com/questions/626151/what-is-the-physical-importance-of-topological-quantum-field-theory>

### Classification of 2-Cob

We have already seen what possibilities we have
for the shape of space. We now need to look at what
ways the shape of space can change. Firstly,
starting from one circle, we could split into
two circles. Alternatively, the circle could
just disappear entirely. We also have the
dual versions of these two. Merging two
circles into one, or creating a circle from
nothing. There is one final thing to consider.
We can also swap the order of two spaces.

We don't need more than these! By composing
the previous 5 cobordisms, we can create all
the other ones. If we wanted to merge
three circles into one, we could just merge
the first two and the result of that with the
last one for example.

### Frobenius Algebras

Let us summarize what we have so far:

- We have a Hilbert space $A$ corresponding to a single circle.
- Taking multiple copies of circles corresponds to
tensor products of the Hilbert space $A \otimes \cdots \otimes A$.
- To a cobordism, a transformation of space through time corresponds
a map between the corresponding Hilbert spaces.
- There are essentially 5 types of cobordisms:
  - Merging two circles: $\mu \colon A \otimes A \to A $
  - Splitting a circle: $\delta \colon A \to A \otimes A $
  - Creating a circle: $\eta\colon \mathbb{C} \to A $
  - Removing a circle: $\epsilon \colon A \to \mathbb{C}$
  - Swapping two circles: $\tau\colon A \otimes A \to A \otimes A $

This information completely describes our TQFT. There
is another way to think about this though. Essentially
we are describing some Hilbert space $A$ with
additional structure in the form of the above
five maps. Mathematicians call such an object
a commutative Frobenius algebra. Explicitly:

- $A$ is a $\mathbb{C}$-vector space.
- $\mu$ is associative and commutative, and $\eta(1)$ is a unit.
- $\delta$ is co-associative and co-commutative, and $\epsilon$ is a co-unit.
- $\mu$ and $\delta$ satisfy
$$ \delta \circ \mu =
(\delta \otimes id) \circ (id \otimes \mu) =
(id \otimes \delta) \circ (\mu \otimes id)
$$

By drawing the relevant cobordisms, one can check that these are
indeed satisfied. From this, we have completely classified
(1+1)-dimensional TQFTs.

## Script

The spoken text of the video.

## Scenes

A list of all the scenes and what they need to contain.
