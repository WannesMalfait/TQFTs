import { Circle, CubicBezier, Latex, Layout, Ray, Rect, Txt, colorSignal, makeScene2D } from '@motion-canvas/2d';
import { PossibleVector2, all, createRef, createSignal, loopUntil, sequence, waitFor, waitUntil } from '@motion-canvas/core';
import { Cobordism, ComDiag } from "../components";

export default makeScene2D(function* (view) {

    const first_part = <Layout />;
    view.add(first_part);
    const pants = createRef<Cobordism>();
    first_part.add(
        <Cobordism
            ref={pants}
            lineWidth={5}
            stroke={'lightskyblue'}
            numBottomCircles={2}
            numTopCircles={1}
            circleSize={200}
            lengthScale={1.5}
        />
    )
    const space_txt = createSignal('');
    // Want the text to stay where it is, so don't add it to `first_part`.
    view.add(
        <Txt
            text={space_txt}
            fontSize={80}
            fontFamily={'Fira Sans Book'}
            fill={'white'}
            offset={[-1, 0]}
            y={450}
            x={-100}
        />
    )
    yield* pants().bottom_circles();
    yield* space_txt('Space', 1);
    yield* waitUntil('time');
    const time_txt = createSignal('');
    first_part.add(
        <Txt
            text={time_txt}
            fontSize={80}
            fontFamily={'Fira Sans Book'}
            fill={'white'}
            offset={[-1, 0]}
            rotation={-90}
            x={-600}
            y={100}
        />
    )
    yield* time_txt('Time', 1);
    yield* waitFor(0.5);
    const progress = createSignal(0);
    first_part.add(
        <Ray
            fromY={320}
            toY={-320}
            x={-500}
            lineWidth={5}
            stroke={'white'}
            endArrow
            end={progress}
        />
    )
    yield* all(
        progress(1, 2),
        pants().bottom_connectors(),
        pants().extrude(2)
    );
    const cobordism_txt = createSignal('');
    view.add(
        <Txt
            text={cobordism_txt}
            fontSize={100}
            fontFamily={'Fira Sans Book'}
            fill={'white'}
            offset={[-1, 0]}
            x={-220}
            y={-450}
        />
    )
    yield* waitUntil('cobordisms');
    yield* cobordism_txt('Cobordisms', 1);
    yield* waitUntil('stretch');


    const opacity = createSignal(0);
    const waist_thickness = createSignal(200);
    const circle_offset = createSignal(200);
    const middle_gap = createSignal(-20);
    const beziers = createSignal(-300);
    const x_pos = createSignal(0);
    const rotation = createSignal(0);
    const scale = createSignal<PossibleVector2>([1, 1]);
    view.add(
        <Layout rotation={rotation} x={x_pos} y={300} scale={scale} opacity={opacity}>
            <Circle
                size={[200, 100]}
                x={() => - circle_offset()}
                stroke={'blue'}
                lineWidth={7}
            />
            <Circle
                size={[200, 100]}
                x={circle_offset}
                stroke={'blue'}
                lineWidth={7}
            />
            <Circle
                size={() => [waist_thickness(), 100]}
                y={-600}
                stroke={'blue'}
                lineWidth={7}
                startAngle={180}
            />
            <Circle
                size={() => [waist_thickness(), 100]}
                y={-600}
                stroke={'blue'}
                lineWidth={7}
                endAngle={180}
                lineDash={() => [waist_thickness() * Math.PI / 30]}
                lineCap={'round'}
            />
            <CubicBezier
                p0X={() => -circle_offset() - 100}
                p1X={() => -circle_offset() - 100}
                p1Y={beziers}
                p2X={() => - waist_thickness() / 2}
                p2Y={() => -600 - beziers()}
                p3X={() => - waist_thickness() / 2}
                p3Y={-600}
                stroke={'blue'}
                lineWidth={7}
            />
            <CubicBezier
                p0X={() => circle_offset() + 100}
                p1X={() => circle_offset() + 100}
                p1Y={beziers}
                p2X={() => waist_thickness() / 2}
                p2Y={() => -600 - beziers()}
                p3X={() => waist_thickness() / 2}
                p3Y={-600}
                stroke={'blue'}
                lineWidth={7}
            />
            <CubicBezier
                stroke={'blue'}
                lineWidth={7}
                p0X={() => -circle_offset() + 100}
                p1={() => [-20, middle_gap()]}
                p2={() => [20, middle_gap()]}
                p3X={() => circle_offset() - 100}
            />

        </Layout>
    )
    view.add(
        <Txt
            text={'='}
            fontSize={200}
            fontFamily={'Fira Sans Book'}
            fill={'white'}
            opacity={opacity}
            x={150}
        />
    )

    // Create the duplicate.
    yield* all(
        first_part.x(-250, 1),
        opacity(1, 1),
        x_pos(570, 1),
    );

    // Stretch the shape a little bit.
    yield* loopUntil(
        'mathematicians have',
        () => all(
            rotation(10, 3).to(-2, 1).to(0, 1),
            scale([0.8, 1.1], 1).to([1.05, 0.9], 3),
            waist_thickness(450, 4).to(300, 1),
            beziers(-200, 2).to(-450, 3),
            circle_offset(120, 1.4).to(250, 2.8),
            middle_gap(-150, 2.7).to(-80, 1.5),
        )
    );
    yield* waitFor(1);

    // Transform into pair of pants.
    yield* sequence(
        0.7,
        waist_thickness(400, 1.5),
        beziers(0, 1.2),
        circle_offset(150, 0.8),
        middle_gap(-400, 1),
        scale([1, 1], 0.8),
    );
    yield* waitUntil('Sc. Functor on maps');



});
