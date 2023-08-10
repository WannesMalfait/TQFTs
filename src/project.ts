import { makeProject } from '@motion-canvas/core';

import introduction from './scenes/introduction?scene';
import two_theories from './scenes/two_theories?scene';

export default makeProject({
  scenes: [
    introduction,
    two_theories],
});
