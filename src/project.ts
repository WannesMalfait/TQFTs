import { makeProject } from '@motion-canvas/core';

import introduction from './scenes/introduction?scene';
import two_theories from './scenes/two_theories?scene';
import quantum_theory from './scenes/quantum_theory?scene';

export default makeProject({
  scenes: [
    introduction,
    two_theories,
    quantum_theory,
  ],
});
