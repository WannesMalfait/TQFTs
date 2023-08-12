import { Circle, Latex, Layout, Ray, Rect, Txt, colorSignal, makeScene2D } from '@motion-canvas/2d';
import { all, createRef, createSignal, waitFor } from '@motion-canvas/core';
import { Cobordism } from '../components';

export default makeScene2D(function* (view) {

    const space = createRef<Txt>();
    view.add(
        <Txt
            ref={space}
            x={-500}
            y={-400}
            fontSize={80}
            text={'Space'}
            fontFamily={'Fira Sans Book'}
            fill={'white'}
        />
    );
    const cobordism = createRef<Cobordism>();
    view.add(
        <Cobordism
            ref={cobordism}
            lineWidth={7}
            stroke={'lightskyblue'}
            numBottomCircles={2}
            numTopCircles={1}
            x={-500}
            y={50}
            lengthScale={1.2}
        />
    )
    yield* cobordism().animate();

    const line_progress = createSignal(0);
    view.add(
        <Ray
            lineWidth={5}
            stroke={'grey'}
            lineDash={[5, 30]}
            fromY={-600}
            toY={600}
            lineCap={'round'}
            end={line_progress}
        />
    )
    yield* waitFor(0.5);
    yield* line_progress(1, 1);
    // yield* waitFor(0.5);

    const quantum_theory = createRef<Txt>();
    view.add(
        <Txt
            ref={quantum_theory}
            x={500}
            y={space().left().y}
            fontSize={80}
            text={'Quantum Theory'}
            fontFamily={'Fira Sans Book'}
            fill={'white'}
            opacity={0}
        />
    )

    yield* quantum_theory().opacity(1, 0.5);
    yield* waitFor(1);
    const functor_progress = createSignal(0);
    const top_height = -200;
    const bottom_height = 280;
    view.add(
        <Ray
            lineWidth={5}
            stroke={'white'}
            from={[-320, top_height]}
            endArrow
            to={[350, top_height]}
            lineDash={[20]}
            end={functor_progress}
        />
    )
    view.add(
        <Ray
            lineWidth={5}
            stroke={'white'}
            from={[-150, bottom_height]}
            endArrow
            to={[270, bottom_height]}
            lineDash={[20]}
            end={functor_progress}
        />
    )
    yield* functor_progress(1, 1);
    const txt_opacity = createSignal(0);
    view.add(
        <Latex
            tex={'{\\color{pink} \\mathcal{H}}'}
            height={60}
            x={500}
            y={top_height}
            opacity={txt_opacity}
        />
    )
    view.add(
        <Latex
            tex={'{\\color{pink} \\mathcal{H} \\otimes \\mathcal{H}}'}
            height={60}
            x={500}
            y={bottom_height}
            opacity={txt_opacity}
        />
    )
    yield* txt_opacity(1, 0.5);
    const hilbert_map = createSignal(0.15);
    view.add(
        <Ray
            lineWidth={7}
            stroke={'white'}
            x={500}
            endArrow
            fromY={bottom_height}
            toY={top_height}
            start={0.15}
            end={hilbert_map}
        />
    )
    yield* waitFor(1);
    yield* hilbert_map(0.85, 1);
    yield* waitFor(1);

});
