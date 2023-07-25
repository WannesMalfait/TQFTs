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

### Relation to Frobenius Algebras

Let us summarize what we have so far:

- We have a Hilbert space $A$ corresponding to a single circle.
- Taking multiple copies of circles corresponds to
tensor products of the Hilbert space $A \otimes \cdots \otimes A$.
- To a cobordism, a transformation of space through time corresponds
a map between the corresponding Hilbert spaces.
- There are essentially 5 types of cobordisms:
  - Merging two circles: $\mu \colon A \otimes A \to A$
  - Splitting a circle: $\delta \colon A \to A \otimes A$
  - Creating a circle: $\eta \colon \mathbb{C} \to A$
  - Removing a circle: $\epsilon \colon A \to \mathbb{C}$
  - Swapping two circles: $\tau\colon A \otimes A \to A \otimes A$.

This information completely describes our TQFT. There
is another way to think about this though. Essentially
we are describing some Hilbert space $A$ with
additional structure in the form of the above
five maps. Mathematicians call such an object
a commutative Frobenius algebra. Explicitly:

- $A$ is a $\mathbb{C}$-vector space.
- $\mu$ is associative and commutative, and $\eta(1)$ is a unit.
- $\delta$ is co-associative and co-commutative, and $\epsilon$ is a co-unit.
- $\mu$ and $\delta$ satisfy:
$$
\delta \circ \mu =
(\delta \otimes id) \circ (id \otimes \mu) =
(id \otimes \delta) \circ (\mu \otimes id)$$

By drawing the relevant cobordisms, one can check that these are
indeed satisfied. From this, we have completely classified
(1+1)-dimensional TQFT's.

## Script

The spoken text of the video.

### Introduction

There are two main actors in this video. On the one
hand we have topological quantum field theories motivated
by physics. On the other hand we have the world of
abstract algebra, and in particular Frobenius algebras.
What we will see, is that these are related to each other.
When I first learned about this, I was baffled. These
things seem to be completely unrelated at first sight, and yet in some
sense they are just the same thing. For me, this is a very
good example of the beauty of mathematics. Two seemingly
different areas of mathematics connected through abstract
thinking.

### Physical Motivation

At the beginning of the 20th century, two big revolutions happened
in physics.

General relativity gave a completely new description
of gravity. The natural language for gravity turned out
to be the mathematics
of manifolds and curvature.

On the other hand, quantum mechanics
gave a new way of looking at fundamental particles.
Particles are in a superposition of different states,
and we can only determine the exact state through measurement.
These states are modelled mathematically in the language of
complex numbers and Hilbert spaces.

Frustratingly, the two theories clash. General relativity
still adopts a classical view of other forces than gravity, while
quantum mechanics assumes flat space-time. The theory
breaks down near massive objects like black holes.
Physicists hope to unify these two theories in a
description of gravity according to the principles
of quantum mechanics: Quantum Gravity.

In the search for quantum gravity, physicists
come up with toy models, simplified models of reality
from which they hope to gain valuable insights. One
such class of toy models are the so-called Topological
Quantum Field Theories, or TQFT's for short.

### TQFT's

We will view space as some compact manifold without boundary.
In principle, this should be 3-dimensional to model
the world we know. This makes the theory a lot
more difficult, so we will instead consider
1-dimensional manifolds, as these are much simpler
to work with. Indeed, one can always smoothly
transform a 1-dimensional manifold
to a circle, or multiple copies of a circle.

This gives us a description of space. Now
we need to incorporate quantum theory.
For this we need a Hilbert space, which
is the mathematical object used to describe
the possible states of a quantum system.
If we have multiple circles, then the
resulting Hilbert space should contain all
the possible ways to combine the states
from the different circles. The mathematical
way to do this is through the tensor product.

### Cobordisms

So far, this really doesn't look that interesting.
However, we still have one final ingredient to consider: time.
Throughout time, the shape of space might change.
Looking at the shape traced out by such a transformation,
we get a 2-dimensional manifold, whose boundaries correspond to
space before and after the transformation. We call such
shapes *cobordisms*. We only care about the topological
shape of these cobordisms. That means that we can
stretch or squish the shape, as if it were rubber. This
is where the **Topological** in Topological Quantum Field
Theory comes from. So, for example, these two cobordisms,
which look different at first sight, are really the same.
Mathematicians have come up with a brilliant name
for this shape. They call it a pair of pants.

Now, because the shape of space can change throughout time,
so can the associated Hilbert spaces. Hence, we need to associate
to each cobordism a transformation of Hilbert spaces. Crucially,
this association should be compatible with the way we can
combine cobordisms. Let me explain what I mean with an example.

These two cobordisms are the same. Indeed, it is common
knowledge that gluing a pair of pants to the pant leg of
another pair of pants yields pants with 3 legs.
Let us call the maps associated to the
merging of two or three circles m_2 and m_3 respectively.
Then we get the following equation. The map "id" is the
identity map, a mathematical way of saying it leaves
its input unchanged.

What we just saw is that we can make the map m_3
out of m_2. This leads to the important observation,
that we really only need to consider these four cobordisms.
Any other cobordism can be build out of just these four.
For example, this one can be decomposed as follows.

Since these are the building blocks of all cobordisms,
we should study their associated maps more closely.
We have the following cobordism, which starts out
from nothing and creates a circle. To what Hilbert
space should nothing correspond? Let us call
it k.
We know that two circles corresponds to the tensor
product of the Hilbert space with itself. On the other
hand if we have a single circle, we can also view it
as a circle together with nothing. So, the tensor
product of H with k should just be H itself.
Intuitively, this is because k represents a system with
only one possible state.
So, since it is already predetermined, it doesn't offer
any new states when combining it with H.
The Hilbert space with one state is C, the complex
numbers.

### Frobenius Algebras

This means we have four maps: which we call the
multiplication, comultiplication, unit, and counit
respectively. Why does it make sense to call
it multiplication, and what does comultiplication
even mean? Let us start with the thing that sounds
familiar to us, multiplication. We all know that
2 times 3 is 6, but what does that have to
do with this? As a first step, we will write
xy for the result of multiplying x and y
via mu. What we now need to show, is that
this behaves as we are used to. For example,
we know that 2 times 3, times 4 is the same
as 2 times, 3 times 4. So is x times y, times z the same
as x times, y times z? For this, we just need to look
at the relevant cobordisms. First multiplying x and y,
and then multiplying the result with z, corresponds to
the cobordism on the left. Multiplying y and z first,
and then multiplying x by the result of this corresponds
to the cobordism on the right. Since the two cobordisms
are the same, the resulting output must be the same as well!

In the same vein, we can show that x times y is equal to
y times x. Indeed, the two cobordisms are the same.
Finally, you may remember that 1 times anything is that
thing itself. But what is 1 in this context? This is where
the unit comes in. Let us write 1_H for the image of the
complex number 1 under eta. Then we have that x times
1_H is indeed just x. So the name, unit, is justified.

The other two maps, the comultiplication
and counit, satisfy the same identities, except that all the maps go the other way around.
This is what the "co" prefix indicates.

There is one final identity to consider. This is
what happens when we combine multiplication with
comultiplication. We have three equivalent
cobordisms. These are known as the so-called
Frobenius conditions.
What we have just shown is that H is what
mathematicians call a commutative Frobenius algebra.
In other words, the study of 2-dimensional TQFT's
is the same as the study of commutative Frobenius
algebras.

## Scenes

A list of all the scenes and what they need to contain.

- Introduction
  - > There are two main actors in this video. On the one hand we have topological quantum field theories motivated by physics. On the other hand we have the world of abstract algebra, and in particular Frobenius algebras. What we will see, is that these are related to each other. When I first learned about this, I was baffled. These things seem to be completely unrelated at first sight, and yet in some sense they are just the same thing. For me, this is a very good example of the beauty of mathematics. Two seemingly different areas of mathematics connected through abstract thinking.
  - Uses: #motion-canvas
    - Start with a circle (color pink) (two circles over over each other?) undulating
    - Splits into two circles (color blue and red)
    - Dashed line appears in the middle
    - Blue circle gets replaced with a cobordism
    - Red circle gets replaced with a commutative diagram
    - Dashed line vanishes
    - Two drawings move to the center and get replaced by original pink circle
    - Circle shrinks
    - Title shows: "TQFT's and Frobenius Algebras".
- Physical Motivation
  - > At the beginning of the 20th century, two big revolutions happened in physics.
   >
   > General relativity gave a completely new description of gravity. The natural language for gravity turned out to be the mathematics of manifolds and curvature.
   >
   > On the other hand, quantum mechanics gave a new way of looking at fundamental particles. Particles are in a superposition of different states, and we can only determine the exact state through measurement. These states are modelled mathematically in the language of complex numbers and Hilbert spaces.
  - Uses: #blender
    - Sun (Sphere with lots of emmission + bloom) and planets orbiting (show orbit paths as curves)
    - A grid appears underneath to show the curvature of space-time (bends underneath the sun)
    - Sun is replaced with "nucleus" made up of red and blue spheres. Planets are green spheres representing electrons.
    - Replaced by a fuzzy cloud (volume) (green).
    - Flash (represents measurement) and shows again atom, with where electrons are.
    - Bras and kets + Schrodinger equation appear on screen.
  - > Frustratingly, the two theories clash. General relativity still adopts a classical view of other forces than gravity, while quantum mechanics assumes flat space-time. The theory breaks down near massive objects like black holes. Physicists hope to unify these two theories in a description of gravity according to the principles of quantum mechanics: Quantum Gravity.
   >
   > In the search for quantum gravity, physicists come up with toy models, simplified models of reality from which they hope to gain valuable insights. One such class of toy models are the so-called Topological Quantum Field Theories, or TQFT's for short.
  - Uses: #motion-canvas
    - Show the two theories side by side (Just their names)
    - They move against each other horizontally
    - Arrow appears underneath each theory and points to something below
    - "Quantum Gravity" appears at the arrow tips.
    - Everything fades
    - "Topological Quantum Field Theories" appears.
- TQFT's
  - > We will view space as some compact manifold without boundary. In principle, this should be 3-dimensional to model the world we know. This makes the theory a lot more difficult, so we will instead consider 1-dimensional manifolds, as these are much simpler to work with. Indeed, one can always smoothly transform a 1-dimensional manifold to a circle, or multiple copies of a circle.
  - Uses: #blender
    - The text "Space" is visible at the top.
    - Show a torus, and a sphere slightly growing in size, moving around a bit
    - Suddenly shrink them in size
    - Show a bunch of closed loops (using b-splines to make them look smooth)
    - Transform them into circles.
  - > This gives us a description of space. Now we need to incorporate quantum theory. For this we need a Hilbert space, which is the mathematical object used to describe the possible states of a quantum system. If we have multiple circles, then the resulting Hilbert space should contain all the possible ways to combine the states from the different circles. The mathematical way to do this is through the tensor product.
  - Uses: #motion-canvas
    - On the left half of the screen is the text "Space" with a circle under it
    - The text "Quantum Theory" appears on the right side of the screen
    - A squiggly arrow goes from the circle to the right side of the screen
    - At the tip of the arrow appears $ \mathcal{H} $
    - Underneath the circle two circles appear
    - A new arrow appears, and at the tip we have $ \mathcal{H} \otimes \mathcal{H} $
- Cobordisms
  id:: 64bfd262-6cf9-410a-9400-56639b9a610f
  - > So far, this really doesn't look that interesting. However, we still have one final ingredient to consider: time. Throughout time, the shape of space might change. Looking at the shape traced out by such a transformation, we get a 2-dimensional manifold, whose boundaries correspond to space before and after the transformation. We call such shapes *cobordisms*. We only care about the topological shape of these cobordisms. That means that we can stretch or squish the shape, as if it were rubber. This is where the **Topological** in Topological Quantum Field Theory comes from. So, for example, these two cobordisms, which look different at first sight, are really the same. Mathematicians have come up with a brilliant name for this shape. They call it a pair of pants.
  - Uses: #motion-canvas
    - Start with circle
    - Left to circle appears word time
    - Arrow grows, from base of circle, and with it a cobordism is formed (Pair of pants)
    - The shape is stretched and squished a little bit (to look a bit like amogus).
    - Another shape appears which looks a bit more like a pair of pants.
  - > Now, because the shape of space can change throughout time, so can the associated Hilbert spaces. Hence, we need to associate to each cobordism a transformation of Hilbert spaces. Crucially, this association should be compatible with the way we can combine cobordisms. Let me explain what I mean with an example.
  - Uses: #motion-canvas
    - Show animation of shape of space changing on the left side
    - Show two squiggly arrows from the start and end of the cobordism
    - At the tips the corresponding Hilbert spaces appear
    - Finally an arrow appears between the two Hilbert spaces (in a different color to highlight it)
  - > These two cobordisms are the same. Indeed, it is common knowledge that gluing a pair of pants to the pant leg of another pair of pants yields pants with 3 legs. Let us call the maps associated to the merging of two or three circles m_2 and m_3 respectively. Then we get the following equation. The map "id" is the identity map, a mathematical way of saying it leaves its input unchanged.
  - Uses: #motion-canvas
    - Show on the top left pair of pant glued to pair of pants, and top right pants with 3 legs.
    - The leg is extended so that it looks "more equal".
    - In between them an equal sign appears
    - Underneath, the corresponding maps in Hilbert spaces appear.
    - The labels $m_2$ $m_3$ and $id$ appear
    - The equation in symbols appears $$(m_2 \otimes id) \circ m_2 = m_3$$
  - > What we just saw is that we can make the map m_3 out of m_2. This leads to the important observation, that we really only need to consider these four cobordisms. Any other cobordism can be build out of just these four. For example, this one can be decomposed as follows.
  - Uses: #motion-canvas
    - Show the four base cobordisms: multipilication, comultiplication, unit, counit in a 2x2 grid.
    - Move them to the left of the screen.
    - Show cobordism 3 -> 2 with 1 hole on the right side of the screen.
    - Show decomposition as $(\mu \otimes id) \circ \mu \circ \delta \circ \mu \circ \delta$
  - > Since these are the building blocks of all cobordisms, we should study their associated maps more closely. We have the following cobordism, which starts out from nothing and creates a circle. To what Hilbert space should nothing correspond? Let us call it k. We know that two circles corresponds to the tensor product of the Hilbert space with itself. On the other hand if we have a single circle, we can also view it as a circle together with nothing. So, the tensor product of H with k should just be H itself. Intuitively, this is because k represents a system with only one possible state. So, since it is already predetermined, it doesn't offer any new states when combining it with H. The Hilbert space with one state is C, the complex numbers.
  - Uses: #motion-canvas
    - Show unit cobordism on the left
    - Show squiggly arrow to a question mark
    - Replace question mark with $k$
    - Show two circles corresponds to $\mathcal{H} \otimes \mathcal{H}$
    - Show one circle corresponds to $\mathcal{H} = \mathcal{H} \otimes k$
    - Replace $k$ with $\mathbb{C}$ everywhere
- Frobenius Algebras
  - > This means we have four maps: which we call the multiplication, comultiplication, unit, and counit respectively. Why does it make sense to call it multiplication, and what does comultiplication even mean? Let us start with the thing that sounds familiar to us, multiplication
  - Uses: #motion-canvas
    - Show the four types of cobordisms on the left, with their corresponding maps on the right, and names written out in the middle. They appear one after each other (not too slowly though)
    - Zoom in on multiplication
  - >We all know that 2 times 3 is 6, but what does that have to do with this? As a first step, we will write xy for the result of multiplying x and y via mu. What we now need to show, is that this behaves as we are used to.
  - Uses #motion-canvas
    - Show $2 \times 3 = 6$.
    - Then show the pair of pants with $\mu$ next to it
    - Add $x$ and $y$ as labels at the bottom, and $xy$ at the top.
  - > For example, we know that 2 times 3, times 4 is the same as 2 times, 3 times 4. So is x times y, times z the same as x times, y times z? For this, we just need to look at the relevant cobordisms. First multiplying x and y, and then multiplying the result with z, corresponds to the cobordism on the left. Multiplying y and z first, and then multiplying x by the result of this corresponds to the cobordism on the right. Since the two cobordisms are the same, the resulting output must be the same as well!
  - Uses: #motion-canvas
    - At the top text "Associativity"
    - Show $(2 \times 3) \times 4 = 2 \times (3 \times 4)$
    - Next to it show $(xy)z \overset{?}{=} x(yz)$ and then the commutative associativity diagram.
    - Show the two cobordisms with the relevant labels.
    - Show the 3 -> 1 cobordims to show that they are the same.
  - > In the same vein, we can show that x times y is equal to y times x. Indeed, the two cobordisms are the same.
  - Uses: #motion-canvas
    - At the top text "Commutativity"
    - Show $xy = yx$.
    - Show on the left just pair of pants, and on right pair of pants, with switch map before it.
  - > Finally, you may remember that 1 times anything is that thing itself. But what is 1 in this context? This is where the unit comes in. Let us write 1_H for the image of the complex number 1 under eta. Then we have that x times 1_H is indeed just x. So the name, unit, is justified.
  - Uses: #motion-canvas
    - At the top text "Unitality"
    - Show the equations $1\times 4 = 4 = 4 \times 1$ and $1a = a = a1$.
    - Show the unit cobordism, with the labels $1$ and $1_{\mathcal{H}}$.
    - Show pair of pants combined with unit gives just identity.
    - Finally show the unit diagram.
  - > The other two maps, the comultiplication and counit, satisfy the same identities, except that all the maps go the other way around. This is what the "co" prefix indicates.
  - Uses: #motion-canvas
    - Show the unit and associativity diagrams.
    - Then flip all the arrows.
  - > There is one final identity to consider. This is what happens when we combine multiplication with comultiplication. We have three equivalent cobordisms. These are known as the so-called Frobenius conditions
  - Uses: #motion-canvas
    - Show the three cobordisms next to each other.
    - Write the equation in terms of symbols $$ \delta \circ \mu = (\delta \otimes id) \circ (id \otimes \mu) =(id \otimes \delta) \circ (\mu \otimes id)$$
    - Show the equation in terms of diagrams.
    - The text "Frobenius Conditions" appears.
  - > What we have just shown is that H is what mathematicians call a commutative Frobenius algebra. In other words, the study of 2-dimensional TQFT's is the same as the study of commutative Frobenius algebras.
  - Uses: #motion-canvas
    - Show $\mathcal{H}$.
    - Show "Commutative Frobenius Algebras" and "2-Dimensional TQFT's" being split of from $\mathcal{H}$, and $\mathcal{H}$ disappears.
    - Finally place a 2-headed arrow between them
