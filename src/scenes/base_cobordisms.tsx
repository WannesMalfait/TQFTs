import { Circle, Latex, Layout, Ray, Rect, Shape, Txt, colorSignal, makeScene2D } from '@motion-canvas/2d';
import { Direction, all, createRef, createSignal, fadeTransition, sequence, slideTransition, waitFor, waitUntil } from '@motion-canvas/core';
import { Cobordism, ComDiag } from '../components';

export default makeScene2D(function* (view) {
    const multiplication = createRef<Cobordism>();
    const comultiplication = createRef<Cobordism>();
    const unit = createRef<Cobordism>();
    const counit = createRef<Cobordism>();
    const multiplication_txt = createRef<Txt>();
    const comultiplication_txt = createRef<Txt>();
    const unit_txt = createRef<Txt>();
    const counit_txt = createRef<Txt>();
    const base_things = createRef<Rect>();
    view.add(
        <Rect ref={base_things}>
            <Cobordism
                ref={comultiplication}
                lineWidth={5}
                stroke={'lightskyblue'}
                needsAnimation={false}
                circleSize={120}
                position={[500, -300]}
            />
            <Txt
                ref={comultiplication_txt}
                text={"comultiplication"}
                fontSize={60}
                position={[500, -50]}
                fontFamily={'Fira Sans Book'}
                fill={'white'}
                opacity={0}
            />
            <Cobordism
                ref={multiplication}
                lineWidth={5}
                stroke={'lightskyblue'}
                needsAnimation={false}
                circleSize={120}
                position={[-500, -300]}
                numBottomCircles={2}
                numTopCircles={1}
            />
            <Txt
                ref={multiplication_txt}
                text={"multiplication"}
                fontSize={60}
                position={[-500, -50]}
                fontFamily={'Fira Sans Book'}
                fill={'white'}
                opacity={0}
            />
            <Shape
                ref={unit}
                position={[-500, 280]}>
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
            <Txt
                ref={unit_txt}
                text={"unit"}
                fontSize={60}
                position={[-500, 450]}
                fontFamily={'Fira Sans Book'}
                fill={'white'}
                opacity={0}
            />
            <Shape
                ref={counit}
                position={[500, 320]}>
                <Circle
                    width={120}
                    height={60}
                    lineWidth={5}
                    stroke={'lightskyblue'}
                />
                <Circle
                    width={120}
                    height={150}
                    lineWidth={5}
                    stroke={'lightskyblue'}
                    lineCap={'round'}
                    startAngle={180}
                />
            </Shape>
            <Txt
                ref={counit_txt}
                text={"counit"}
                fontSize={60}
                position={[500, 450]}
                fontFamily={'Fira Sans Book'}
                fill={'white'}
                opacity={0}
            />
        </Rect>
    );
    yield* slideTransition(Direction.Right, 2);
    yield* waitFor(1);
    yield* sequence(
        0.8,
        multiplication_txt().opacity(1, 1),
        comultiplication_txt().opacity(1, 1),
        unit_txt().opacity(1, 1),
        counit_txt().opacity(1, 1),
    );
    yield* waitUntil('these 4');
    // Move everything to the left of the screen.
    yield* all(
        multiplication().position([-750, -400], 1),
        multiplication().scale(0.7, 1),
        comultiplication().position([-750, -80], 1),
        comultiplication().scale(0.7, 1),
        unit().position([-750, 170], 1),
        unit().scale(0.7, 1),
        counit().position([-750, 400], 1),
        counit().scale(0.7, 1),
        multiplication_txt().position([-750, -250], 1),
        multiplication_txt().fontSize(40, 1),
        comultiplication_txt().position([-750, 80], 1),
        comultiplication_txt().fontSize(40, 1),
        unit_txt().position([-750, 270], 1),
        unit_txt().fontSize(40, 1),
        counit_txt().position([-750, 470], 1),
        counit_txt().fontSize(40, 1),
    );
    yield* waitFor(1);
    yield* base_things().opacity(0.6, 0.5);
    const cobordism = createRef<Cobordism>();
    view.add(
        <Cobordism
            ref={cobordism}
            stroke={'lightskyblue'}
            lineWidth={7}
            numBottomCircles={3}
            numTopCircles={2}
            numHoles={1}
            circleSize={130}
            x={100}
            lengthScale={3}
        />
    );
    yield* cobordism().animate();
    const equals_opacity = createSignal(0);
    view.add(
        <Txt
            text={"="}
            fontSize={150}
            x={200}
            fontFamily={'Fira Sans Book'}
            fill={'white'}
            opacity={equals_opacity}
        />
    );
    yield* waitUntil('for example')
    yield* all(
        cobordism().x(-200, 0.5),
        equals_opacity(1, 0.5),
    );
    const cobordism_1 = createRef<Cobordism>();
    const cobordism_2 = createRef<Cobordism>();
    const cobordism_3 = createRef<Cobordism>();
    const cobordism_4 = createRef<Cobordism>();
    const cobordism_5 = createRef<Cobordism>();
    const cobordism_6 = createRef<Cobordism>();
    view.add(
        <Layout position={[650, -120]} scale={1.13}>
            <Cobordism
                ref={cobordism_6}
                lineWidth={5}
                stroke={'lightskyblue'}
                circleSize={100}
                y={-170}
                lengthScale={0.7}
                connectorScale={1.3}
                bottomCirclesOpacity={0}
            />
            <Cobordism
                ref={cobordism_5}
                lineWidth={5}
                stroke={'lightskyblue'}
                numBottomCircles={2}
                numTopCircles={1}
                circleSize={100}
                y={-30}
                lengthScale={0.7}
                connectorScale={1.3}
                bottomCirclesOpacity={0}
            />
            <Cobordism
                ref={cobordism_4}
                lineWidth={5}
                stroke={'lightskyblue'}
                circleSize={100}
                y={110}
                lengthScale={0.7}
                connectorScale={1.3}
                bottomCirclesOpacity={0}
            />
            <Cobordism
                ref={cobordism_3}
                lineWidth={5}
                stroke={'lightskyblue'}
                numBottomCircles={2}
                numTopCircles={1}
                circleSize={100}
                y={250}
                lengthScale={0.7}
                connectorScale={2}
                bottomCirclesOpacity={0}
            />
            <Cobordism
                ref={cobordism_2}
                lineWidth={5}
                stroke={'lightskyblue'}
                numBottomCircles={2}
                numTopCircles={1}
                circleSize={100}
                x={-150}
                y={390}
                lengthScale={0.7}
            />
            <Cobordism
                ref={cobordism_1}
                lineWidth={5}
                stroke={'lightskyblue'}
                numBottomCircles={1}
                numTopCircles={1}
                circleSize={100}
                x={150}
                y={390}
                lengthScale={0.7}
            />
        </Layout>
    );
    yield* all(
        cobordism_1().animate(0.5, 0.75),
        cobordism_2().animate(0.5, 0.75),
    );
    yield* all(
        cobordism_3().extrude(0.75),
        cobordism_3().bottom_connectors(0.25),
    );
    yield* all(
        cobordism_4().extrude(.75),
        cobordism_4().bottom_connectors(0.25),
    );
    yield* all(
        cobordism_5().extrude(.75),
        cobordism_5().bottom_connectors(0.25),
    );
    yield* all(
        cobordism_6().extrude(.75),
        cobordism_6().bottom_connectors(0.25),
    );
    yield* all(
        cobordism_1().topCirclesOpacity(0, 0.5),
        cobordism_2().topCirclesOpacity(0, 0.5),
        cobordism_3().topCirclesOpacity(0, 0.5),
        cobordism_4().topCirclesOpacity(0, 0.5),
        cobordism_5().topCirclesOpacity(0, 0.5),
    );
    yield* waitUntil('study');
});