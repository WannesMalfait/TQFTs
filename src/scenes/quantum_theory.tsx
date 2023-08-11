import { Circle, Latex, Layout, Ray, Rect, Txt, colorSignal, makeScene2D } from '@motion-canvas/2d';
import { all, createRef, createSignal, waitFor } from '@motion-canvas/core';

export default makeScene2D(function* (view) {

    const space = createRef<Txt>();
    const top_circle = createRef<Circle>();
    const bottom_circles = createRef<Layout>();
    const bottom_circles_angle = createSignal(0);
    const circle_color = 'lightskyblue';
    view.add(
        <Layout layout direction={'column'}
            x={-500}
            gap={180} alignItems={'center'}>
            <Txt
                ref={space}
                fontSize={80}
                text={'Space'}
                fontFamily={'Fira Sans Book'}
                fill={'white'}
            />
            <Circle
                ref={top_circle}
                size={200}
                lineWidth={5}
                stroke={circle_color}
                endAngle={0}
            />
            <Layout ref={bottom_circles} layout direction={'row'} gap={50}>
                <Circle
                    size={200}
                    lineWidth={5}
                    stroke={circle_color}
                    endAngle={bottom_circles_angle}
                />
                <Circle
                    size={200}
                    lineWidth={5}
                    stroke={circle_color}
                    endAngle={bottom_circles_angle}
                />
            </Layout>
        </Layout>
    );

    yield* top_circle().endAngle(360, 1);
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
    yield* waitFor(0.5);

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
    const top_line_progress = createSignal(0);
    view.add(
        <Ray
            lineWidth={5}
            stroke={'white'}
            from={[-300, top_circle().right().y]}
            endArrow
            to={[350, top_circle().right().y]}
            lineDash={[20]}
            end={top_line_progress}
        />
    )
    yield* top_line_progress(1, 1);
    yield* waitFor(0.5);
    const h_opacity = createSignal(0);
    view.add(
        <Latex
            tex={'{\\color{white} \\mathcal{H}}'}
            height={60}
            x={500}
            y={top_circle().right().y}
            opacity={h_opacity}
        />
    )
    yield* h_opacity(1, 0.5);
    yield* waitFor(1);
    yield* bottom_circles_angle(360, 1);

    const bottom_line_progress = createSignal(0);
    view.add(
        <Ray
            lineWidth={5}
            stroke={'white'}
            from={[-220, bottom_circles().right().y]}
            endArrow
            to={[300, bottom_circles().right().y]}
            lineDash={[20]}
            end={bottom_line_progress}
        />
    )
    yield* bottom_line_progress(1, 1);
    yield* waitFor(0.5);
    const hh_opacity = createSignal(0);
    view.add(
        <Latex
            tex={'{\\color{white} \\mathcal{H} \\otimes \\mathcal{H}}'}
            height={60}
            x={500}
            y={bottom_circles().right().y}
            opacity={hh_opacity}
        />
    )
    yield* hh_opacity(1, 0.5);
    yield* waitFor(0.5);

});
