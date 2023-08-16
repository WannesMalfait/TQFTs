import { makeProject } from '@motion-canvas/core';

import introduction from './scenes/introduction?scene';
import revolutions_in_physics from './scenes/revolutions_in_physics?scene';
import two_theories from './scenes/two_theories?scene';
import shape_of_space from './scenes/shape_of_space?scene';
import quantum_theory from './scenes/quantum_theory?scene';
import time from './scenes/time?scene';
import functor_on_maps from './scenes/functor_on_maps?scene';
import functoriality from './scenes/functoriality?scene';
import base_cobordisms from './scenes/base_cobordisms?scene';
import unit_is_what from './scenes/unit_is_what?scene';
import four_maps from './scenes/four_maps?scene';
import pants_is_multiply from './scenes/pants_is_multiply?scene';
import associativity from './scenes/associativity?scene';
import commutativity from './scenes/commutativity?scene';
import unitality from './scenes/unitality?scene';
import duality from './scenes/duality?scene';
import frobenius_conditions from './scenes/frobenius_conditions?scene';
import equivalence_of_categories from './scenes/equivalence_of_categories?scene';

export default makeProject({
  scenes: [
    introduction,
    revolutions_in_physics,
    two_theories,
    shape_of_space,
    quantum_theory,
    time,
    functor_on_maps,
    functoriality,
    base_cobordisms,
    unit_is_what,
    four_maps,
    pants_is_multiply,
    associativity,
    commutativity,
    unitality,
    duality,
    frobenius_conditions,
    equivalence_of_categories,
  ],
});
