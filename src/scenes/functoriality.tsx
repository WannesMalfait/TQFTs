import { Circle, Latex, Layout, Ray, Rect, Txt, colorSignal, makeScene2D } from '@motion-canvas/2d';
import { all, createRef, createSignal, waitFor } from '@motion-canvas/core';
import { Cobordism } from '../components';

export default makeScene2D(function* (view) {

    const cobordism = createRef<Cobordism>();
    view.add(
        <>
            <Cobordism
                lineWidth={4}
                stroke={'lightskyblue'}
                numBottomCircles={2}
                numTopCircles={1}
                circleSize={100}
                x={-500}
                y={-350}
                lengthScale={0.7}
                connectorScale={2}
                needsAnimation={false}
            />
            <Cobordism
                lineWidth={4}
                stroke={'lightskyblue'}
                numBottomCircles={2}
                numTopCircles={1}
                circleSize={100}
                x={-650}
                y={-210}
                lengthScale={0.7}
                needsAnimation={false}
            />
            <Cobordism
                ref={cobordism}
                lineWidth={4}
                stroke={'lightskyblue'}
                numBottomCircles={1}
                numTopCircles={1}
                circleSize={100}
                x={-350}
                y={-210}
                lengthScale={0.7}
                needsAnimation={false}
            />

            <Cobordism
                lineWidth={4}
                stroke={'lightskyblue'}
                numBottomCircles={3}
                numTopCircles={1}
                circleSize={100}
                x={500}
                y={-280}
                lengthScale={1.4}
                needsAnimation={false}
            />

        </>
    );
    yield* waitFor(1);
});