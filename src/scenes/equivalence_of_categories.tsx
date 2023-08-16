import { Circle, Latex, Layout, Ray, Rect, Shape, Txt, colorSignal, makeScene2D } from '@motion-canvas/2d';
import { Color, all, createRef, createSignal, fadeTransition, sequence, slideTransition, waitFor, waitUntil } from '@motion-canvas/core';
import { Cobordism, ComDiag } from '../components';

export default makeScene2D(function* (view) {
    const equation = createRef<Latex>();
    const tqfts = createRef<Txt>();
    const frobenius = createRef<Txt>();
    view.add(
        <>
            <Txt
                ref={frobenius}
                text={'Commutative Frobenius Algebras'}
                fontSize={80}
                fill={'coral'}
                fontFamily={'Fira Sans Book'}
                opacity={0}
            />
            <Txt
                ref={tqfts}
                text={'2-Dimensional TQFT\'s'}
                fontSize={80}
                fill={'lightskyblue'}
                fontFamily={'Fira Sans Book'}
                opacity={0}
            />
            <Latex
                ref={equation}
                tex={'{\\color{coral} \\mathcal H}'}
                height={150}
                opacity={0}
            />
        </>
    )
    yield* fadeTransition(1);
    yield* equation().opacity(1, 1);
    yield* waitFor(4);
    yield* all(
        equation().opacity(0, 1.5),
        tqfts().opacity(1, 1),
        frobenius().opacity(1, 1),
        tqfts().y(300, 2),
        frobenius().y(-300, 2),
    );
    const arrow = createRef<Ray>();
    view.add(
        <Ray
            ref={arrow}
            stroke={'white'}
            lineWidth={5}
            lineCap={'round'}
            lineDash={[20]}
            start={0.5}
            end={0.5}
            from={tqfts().top}
            to={frobenius().bottom}
            endArrow
            startArrow
            opacity={0}
        />
    );
    yield* waitUntil('the same');
    yield* all(
        arrow().opacity(1, 1),
        arrow().end(0.9, 1),
        arrow().start(0.1, 1),
    );
    const color = Color.lerp('coral', 'lightskyblue', 0.5);
    yield* all(
        tqfts().fill(color, 1),
        frobenius().fill(color, 1),
    );
    yield* waitUntil('End');

});