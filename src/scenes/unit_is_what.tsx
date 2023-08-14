import { Circle, Latex, Layout, Ray, Rect, Shape, Txt, colorSignal, makeScene2D } from '@motion-canvas/2d';
import { all, createRef, createSignal, sequence, waitFor } from '@motion-canvas/core';

export default makeScene2D(function* (view) {

    const space = createRef<Txt>();
    const unit = createRef<Shape>();
    const single_circle = createRef<Circle>();
    const two_circles = createRef<Layout>();
    const two_circles_angle = createSignal(0);
    const circle_color = 'lightskyblue';
    view.add(
        <Layout
            x={-550}
        >
            <Txt
                ref={space}
                y={-400}
                fontSize={80}
                text={'Space'}
                fontFamily={'Fira Sans Book'}
                fill={'white'}
            />
            <Shape
                ref={unit}
                y={-200}
            >
                <Circle
                    width={120}
                    height={60}
                    lineWidth={5}
                    stroke={'lightskyblue'}
                    startAngle={180}
                    lineCap={'round'}
                />
                <Circle
                    width={120}
                    height={60}
                    lineWidth={5}
                    stroke={'lightskyblue'}
                    lineCap={'round'}
                    endAngle={180}
                    lineDash={[Math.PI * 100 / 20]}
                />
                <Circle
                    width={120}
                    height={150}
                    lineWidth={5}
                    stroke={'lightskyblue'}
                    lineCap={'round'}
                    endAngle={180}
                />
            </Shape>
            <Layout y={50} ref={two_circles} layout direction={'row'} gap={50}>
                <Circle
                    size={200}
                    lineWidth={5}
                    stroke={circle_color}
                    endAngle={two_circles_angle}
                />
                <Circle
                    size={200}
                    lineWidth={5}
                    stroke={circle_color}
                    endAngle={two_circles_angle}
                />
            </Layout>
            <Circle
                ref={single_circle}
                y={350}
                size={200}
                lineWidth={5}
                stroke={circle_color}
                endAngle={0}
            />
        </Layout>
    );

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

    const unit_line_progress = createSignal(0);
    view.add(
        <Ray
            lineWidth={5}
            stroke={'white'}
            from={[-320, unit().right().y + 20]}
            endArrow
            to={[350, unit().right().y + 20]}
            lineDash={[20]}
            end={unit_line_progress}
        />
    )
    yield* unit_line_progress(1, 1);
    yield* waitFor(0.5);
    const unit_tex = createRef<Latex>();
    view.add(
        <Latex
            ref={unit_tex}
            tex={'{\\color{coral} ?}'}
            height={60}
            x={500}
            y={unit().right().y + 20}
            opacity={0}
        />
    )
    yield* unit_tex().opacity(1, 0.5);

    yield* waitFor(1);
    unit_tex().opacity(0, 0.4);
    unit_tex().tex('{\\color{coral} k}');
    unit_tex().opacity(1, 0.4);
    yield* waitFor(0.5);


    yield* two_circles_angle(360, 1);

    const two_circles_line_progress = createSignal(0);
    view.add(
        <Ray
            lineWidth={5}
            stroke={'white'}
            from={[-220, two_circles().right().y]}
            endArrow
            to={[300, two_circles().right().y]}
            lineDash={[20]}
            end={two_circles_line_progress}
        />
    )
    yield* two_circles_line_progress(1, 1);
    yield* waitFor(0.5);
    const hh_opacity = createSignal(0);
    view.add(
        <Latex
            tex={'{\\color{coral} \\mathcal{H} \\otimes \\mathcal{H}}'}
            height={60}
            x={500}
            y={two_circles().right().y}
            opacity={hh_opacity}
        />
    )
    yield* hh_opacity(1, 0.5);
    yield* waitFor(1);
    yield* single_circle().endAngle(360, 1);
    const single_circle_line_progress = createSignal(0);
    view.add(
        <Ray
            lineWidth={5}
            stroke={'white'}
            from={[-300, single_circle().right().y]}
            endArrow
            to={[350, single_circle().right().y]}
            lineDash={[20]}
            end={single_circle_line_progress}
        />
    )
    yield* single_circle_line_progress(1, 1);
    yield* waitFor(0.5);
    const circle_tex = createRef<Latex>();
    view.add(
        <Latex
            ref={circle_tex}
            tex={'{\\color{coral} \\mathcal{H}}'}
            height={60}
            x={500}
            y={single_circle().right().y}
            opacity={0}
        />
    )
    yield* circle_tex().opacity(1, 0.5);
    yield* waitFor(0.5);
    const empty_space = createRef<Circle>();
    view.add(
        <Circle
            ref={empty_space}
            y={single_circle().left().y}
            x={-430}
            stroke={'lightskyblue'}
            lineWidth={3}
            size={50}
            lineCap={'round'}
            lineDash={[5, 10]}
            opacity={0}
        />
    )
    yield* sequence(0.5,
        single_circle().x(-130, 0.7),
        empty_space().opacity(0.5, 1),
        single_circle_line_progress(0.8, 0.5),
    );
    yield* circle_tex().opacity(0, 0.5);
    circle_tex().tex('{\\color{coral} \\mathcal H = \\mathcal H \\otimes k}');
    yield* circle_tex().opacity(1, 0.5);
    yield* waitFor(1);
    yield* all(
        circle_tex().opacity(0, 0.35),
        unit_tex().opacity(0, 0.35),
    );
    circle_tex().tex('{\\color{coral} \\mathcal H = \\mathcal H \\otimes \\mathbb C}');
    unit_tex().tex('{\\color{coral} \\mathbb C}')
    yield* all(
        circle_tex().opacity(1, 0.35),
        unit_tex().opacity(1, 0.35),
    );
    yield* waitFor(1);


});
