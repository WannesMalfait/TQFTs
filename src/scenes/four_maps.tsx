import { Circle, Latex, Layout, Ray, Rect, Shape, Txt, colorSignal, makeScene2D } from '@motion-canvas/2d';
import { all, createRef, createSignal, sequence, waitFor } from '@motion-canvas/core';
import { Cobordism, ComDiag } from '../components';

export default makeScene2D(function* (view) {
    const line_progress = createSignal(0);
    view.add(
        <Layout>
            <Ray
                fromX={-view.width() / 2}
                toX={view.width() / 2}
                lineWidth={3}
                stroke={'grey'}
                lineDash={[15]}
                start={() => 0.5 - line_progress()}
                end={() => 0.5 + line_progress()}
            />
            <Ray
                fromY={-view.height() / 2}
                toY={view.height() / 2}
                lineWidth={3}
                stroke={'grey'}
                lineDash={[15]}
                start={() => 0.5 - line_progress()}
                end={() => 0.5 + line_progress()}
            />
        </Layout >
    );
    yield* line_progress(0.5, 1);
    const multiplication = createRef<Cobordism>();
    const comultiplication = createRef<Cobordism>();
    const unit = createRef<Cobordism>();
    const counit = createRef<Cobordism>();
    const multiplication_txt = createRef<Txt>();
    const comultiplication_txt = createRef<Txt>();
    const unit_txt = createRef<Txt>();
    const counit_txt = createRef<Txt>();
    const multiplication_diag = createRef<ComDiag>();
    const comultiplication_diag = createRef<ComDiag>();
    const unit_diag = createRef<ComDiag>();
    const counit_diag = createRef<ComDiag>();
    const base_things = createRef<Rect>();
    view.add(
        <Rect ref={base_things} opacity={0}>
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
                position={[-500, -50]}
                fontFamily={'Fira Sans Book'}
                fill={'white'}
                opacity={0}
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
                opacity={0}
            />
            <Cobordism
                ref={comultiplication}
                lineWidth={5}
                stroke={'lightskyblue'}
                needsAnimation={false}
                circleSize={100}
                connectorScale={0.7}
                position={[500, -300]}
            />
            <ComDiag
                ref={comultiplication_diag}
                position={[500, -300]}
                gapSize={65}
                scale={4.5}
                itemColor={'coral'}
                labelHeight={12}
                items={[
                    ['\\mathcal H \\otimes \\mathcal H'],
                    ['\\mathcal H'],
                ]}
                arrows={[
                    [[0, 1], [0, 0]]
                ]}
                labels={[
                    '\\delta'
                ]}
                opacity={0}
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
            <Shape
                ref={unit}
                position={[-500, 220]}>
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
            <ComDiag
                ref={unit_diag}
                position={[-500, 250]}
                gapSize={40}
                scale={4.5}
                itemColor={'coral'}
                labelHeight={12}
                items={[
                    ['\\mathcal H'],
                    ['\\mathbb C'],
                ]}
                arrows={[
                    [[0, 1], [0, 0]]
                ]}
                labels={[
                    '\\eta'
                ]}
                opacity={0}
            />
            <Txt
                ref={unit_txt}
                text={"unit"}
                fontSize={60}
                position={[-500, 480]}
                fontFamily={'Fira Sans Book'}
                fill={'white'}
                opacity={0}
            />
            <Shape
                ref={counit}
                position={[500, 280]}>
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
            <ComDiag
                ref={counit_diag}
                position={[500, 260]}
                gapSize={40}
                scale={4.5}
                itemColor={'coral'}
                labelHeight={10}
                items={[
                    ['\\mathbb C'],
                    ['\\mathcal H'],
                ]}
                arrows={[
                    [[0, 1], [0, 0]]
                ]}
                labels={[
                    '\\epsilon'
                ]}
                opacity={0}
            />
            <Txt
                ref={counit_txt}
                text={"counit"}
                fontSize={60}
                position={[500, 480]}
                fontFamily={'Fira Sans Book'}
                fill={'white'}
                opacity={0}
            />
        </Rect>
    );
    yield* base_things().opacity(1, 1);
    yield* all(
        multiplication_diag().opacity(1, 0.5),
        comultiplication_diag().opacity(1, 0.5),
        unit_diag().opacity(1, 0.5),
        counit_diag().opacity(1, 0.5),
    );
    yield* all(
        multiplication().x(-750, 1),
        multiplication_diag().x(-250, 1),
        comultiplication().x(200, 1),
        comultiplication_diag().x(750, 1),
        unit().x(-750, 1),
        unit_diag().x(-250, 1),
        counit().x(200, 1),
        counit_diag().x(750, 1),
    );
    yield* all(
        multiplication_diag().animate_arrows(1),
        multiplication_diag().animate_labels(1.5),
        comultiplication_diag().animate_arrows(1),
        comultiplication_diag().animate_labels(1.5),
        unit_diag().animate_arrows(1),
        unit_diag().animate_labels(1.5),
        counit_diag().animate_arrows(1),
        counit_diag().animate_labels(1.5),
    )
    yield* sequence(
        1.2,
        multiplication_txt().opacity(1, 1),
        comultiplication_txt().opacity(1, 1),
        unit_txt().opacity(1, 1),
        counit_txt().opacity(1, 1),
    );
    yield* waitFor(1);
});