import { Circle, Latex, Layout, Ray, Rect, Shape, Txt, colorSignal, makeScene2D } from '@motion-canvas/2d';
import { BBox, all, createRef, createSignal, sequence, slideTransition, waitFor, waitUntil, zoomInTransition } from '@motion-canvas/core';
import { Cobordism, ComDiag } from '../components';

export default makeScene2D(function* (view) {
    const multiplication = createRef<Cobordism>();
    const multiplication_txt = createRef<Txt>();
    const multiplication_diag = createRef<ComDiag>();
    const base_things = createRef<Rect>();
    view.add(
        <Rect ref={base_things} opacity={1} scale={1.2} position={[620, 400]}>
            <Cobordism
                ref={multiplication}
                lineWidth={5}
                stroke={'lightskyblue'}
                needsAnimation={false}
                circleSize={100}
                position={[-500, -300]}
                numBottomCircles={2}
                numTopCircles={1}
                connectorScale={0.7}
            />
            <Txt
                ref={multiplication_txt}
                text={"multiplication"}
                fontSize={60}
                position={[-500, -20]}
                fontFamily={'Fira Sans Book'}
                fill={'white'}
                opacity={1}
            />
            <ComDiag
                ref={multiplication_diag}
                position={[-500, -300]}
                gapSize={65}
                scale={4.5}
                itemColor={'coral'}
                labelHeight={12}
                items={[
                    ['\\mathcal H'],
                    ['\\mathcal H \\otimes \\mathcal H']
                ]}
                arrows={[
                    [[0, 1], [0, 0]]
                ]}
                labels={[
                    '\\mu'
                ]}
                opacity={1}
            />
        </Rect>
    );
    multiplication_diag().opacity(1);
    multiplication().x(-750);
    multiplication_diag().x(-250);
    yield* all(
        multiplication_diag().animate_arrows(0),
        multiplication_diag().animate_labels(0),
    );
    base_things().opacity(0.5);

    yield* zoomInTransition(new BBox(-500, -300, 700, 400));
    const equation = createRef<Latex>();
    view.add(
        <Latex
            ref={equation}
            tex={'{\\color{white} 2 \\cdot 3 = 6}'}
            height={60}
            y={-400}
            opacity={0}
        />
    );
    yield* waitUntil('we all know');
    yield*
        equation().opacity(1, 1);

    yield* waitFor(1);
    const border = createRef<Rect>();
    view.add(
        <Rect
            ref={border}
            size={[1100, 750]}
            stroke={'white'}
            lineWidth={5}
            y={100}
            radius={50}
            opacity={0.0}
            lineDash={[20]}
        />
    );
    yield* all(
        border().opacity(0.8, 1),
        base_things().opacity(1, 0.5),
        equation().opacity(0.7, 1),
    );
    const x_label = createRef<Latex>();
    const y_label = createRef<Latex>();
    const xy_label = createRef<Latex>();
    view.add(
        <>
            <Latex
                ref={x_label}
                tex={'{\\color{white}x}'}
                height={30}
                position={[-385, 240]}
                opacity={0}
            />
            <Latex
                ref={y_label}
                tex={'{\\color{white}y}'}
                height={40}
                position={[-170, 240]}
                opacity={0}
            />
            <Latex
                ref={xy_label}
                tex={'{\\color{white}xy}'}
                height={40}
                position={[-285, -150]}
                opacity={0}
            />
        </>
    );
    yield* waitUntil('first step');
    yield* all(
        x_label().opacity(1, 1),
        y_label().opacity(1, 1),
    );
    yield* waitFor(1);
    yield* xy_label().opacity(1, 1);
    yield* waitUntil('Sc. associativity');

});