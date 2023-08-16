import { Circle, Latex, Layout, Ray, Rect, Txt, colorSignal, makeScene2D } from '@motion-canvas/2d';
import { Direction, all, createRef, createSignal, sequence, slideTransition, waitFor, waitUntil } from '@motion-canvas/core';
import { Cobordism, ComDiag } from '../components';

export default makeScene2D(function* (view) {

    const cobordism = createRef<Cobordism>();
    const equals_opacity = createSignal(0);
    const labels_opacity = createSignal(0);
    const top_opacity = createSignal(1);
    view.add(
        <Layout opacity={top_opacity}>
            <Cobordism
                lineWidth={4}
                stroke={'lightskyblue'}
                numBottomCircles={2}
                numTopCircles={1}
                circleSize={100}
                x={-550}
                y={-350}
                lengthScale={0.7}
                connectorScale={2}
                needsAnimation={false}
                bottomCirclesOpacity={0}
            />
            <Latex
                tex={'{\\color{#CCCCCC} m_2}'}
                height={35}
                position={[-390, -380]}
                opacity={labels_opacity}
            />
            <Cobordism
                lineWidth={4}
                stroke={'lightskyblue'}
                numBottomCircles={2}
                numTopCircles={1}
                circleSize={100}
                x={-700}
                y={-210}
                lengthScale={0.7}
                needsAnimation={false}
            />
            <Latex
                tex={'{\\color{#CCCCCC} m_2}'}
                height={35}
                position={[-870, -230]}
                opacity={labels_opacity}
            />
            <Cobordism
                ref={cobordism}
                lineWidth={4}
                stroke={'lightskyblue'}
                numBottomCircles={1}
                numTopCircles={1}
                circleSize={100}
                x={-400}
                y={-210}
                lengthScale={0.7}
                needsAnimation={false}
            />
            <Latex
                tex={'{\\color{#CCCCCC} id}'}
                height={35}
                position={[-310, -230]}
                opacity={labels_opacity}
            />
            <Cobordism
                lineWidth={4}
                stroke={'lightskyblue'}
                numBottomCircles={3}
                numTopCircles={1}
                circleSize={100}
                x={550}
                y={-280}
                lengthScale={1.4}
                needsAnimation={false}
            />
            <Latex
                tex={'{\\color{#CCCCCC} m_3}'}
                height={35}
                position={[320, -300]}
                opacity={labels_opacity}
            />
            <Txt
                text={"="}
                fontSize={150}
                y={-280}
                fontFamily={'Fira Sans Book'}
                fill={'white'}
                opacity={equals_opacity}
            />

        </Layout>
    );
    yield* slideTransition(Direction.Bottom, 1);
    yield* waitUntil('the same');
    yield* equals_opacity(1, 1);
    yield* waitUntil('let us call');
    yield* labels_opacity(1, 1);
    const arrow_progress = createSignal(0);
    view.add(
        <Ray
            lineWidth={3}
            endArrow
            fromY={-220}
            toY={110}
            stroke={'grey'}
            lineDash={[20]}
            arrowSize={15}
            end={arrow_progress}
        />
    )
    const diagrams = createRef<Layout>();
    const left_diagram = createRef<ComDiag>();
    const right_diagram = createRef<ComDiag>();
    view.add(
        <Layout ref={diagrams} y={-300} opacity={0}>
            <ComDiag
                ref={right_diagram}
                scale={3.5}
                x={550}
                y={150}
                gapSize={80}
                labelHeight={10}
                labelColor={'#CCCCCC'}
                arrowColor={'white'}
                itemColor={'coral'}
                items={[
                    ['\\mathcal{H}'],
                    ['\\mathcal{H} \\otimes \\mathcal{H} \\otimes \\mathcal{H}'],
                ]}
                arrows={[
                    [[0, 1], [0, 0]],
                ]}
                labels={[
                    'm_3',
                ]}
            />
            <ComDiag
                ref={left_diagram}
                scale={3.5}
                x={-550}
                y={150}
                gapSize={35}
                labelHeight={10}
                labelColor={'#CCCCCC'}
                arrowColor={'white'}
                itemColor={'coral'}
                items={[
                    ['\\mathcal{H}'],
                    ['\\mathcal{H} \\otimes \\mathcal{H}'],
                    ['\\mathcal{H} \\otimes \\mathcal{H} \\otimes \\mathcal{H}'],
                ]}
                arrows={[
                    [[0, 1], [0, 0]],
                    [[0, 2], [0, 1]],
                ]}
                labels={[
                    'm_2',
                    'm_2 \\otimes id'
                ]}
            />
            <Txt
                text={"="}
                fontSize={150}
                y={120}
                fontFamily={'Fira Sans Book'}
                fill={'white'}
                opacity={equals_opacity}
            />
        </Layout>
    );
    yield* left_diagram().animate_arrows(0);
    yield* right_diagram().animate_arrows(0);
    yield* all(
        diagrams().opacity(1, 1),
        diagrams().y(50, 1),
        arrow_progress(1, 1),
    );
    yield* all(
        left_diagram().animate_labels(),
        right_diagram().animate_labels(),
    );
    yield* waitFor(0.5);

    const equation = createRef<Latex>();

    // Need `yield` to get the size calculated.
    yield view.add(
        <Latex
            ref={equation}
            tex={'{\\color{white} m_2 \\circ (m_2 \\otimes id) = m_3 }'}
            height={50}
            y={300}
            opacity={0}
        />
    );

    yield* all(
        top_opacity(0.5, 1),
        // diagrams().opacity(0.5, 1),
    );
    yield* waitUntil('then we get');


    const rect = createRef<Rect>();
    view.add(
        <Rect
            ref={rect}
            position={equation().position}
            size={equation().size().add(70)}
            lineWidth={3}
            stroke={'#CCCCCC'}
            radius={20}
            lineDash={[20, 10]}
        />
    )
    yield* sequence(0.2,
        rect().ripple(),
        equation().opacity(1, 1),
    );
    yield* waitUntil('Sc. base cobordisms');
});