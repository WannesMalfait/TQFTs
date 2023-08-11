import { Circle, Latex, Layout, Ray, Rect, Txt, colorSignal, makeScene2D } from '@motion-canvas/2d';
import { all, createRef, createSignal, waitFor } from '@motion-canvas/core';
import { Cobordism, ComDiag } from "../components";

export default makeScene2D(function* (view) {

    const pants = createRef<Cobordism>();
    view.add(
        <Cobordism
            ref={pants}
            lineWidth={5}
            stroke={'white'}
            numBottomCircles={2}
            numTopCircles={1}
        />
    )
    yield* pants().animate();

});
