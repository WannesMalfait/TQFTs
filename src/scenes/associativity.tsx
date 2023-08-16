import { Circle, Latex, Layout, Ray, Rect, Shape, Txt, colorSignal, makeScene2D } from '@motion-canvas/2d';
import { Direction, all, createRef, createSignal, sequence, slideTransition, waitFor, waitUntil } from '@motion-canvas/core';
import { Cobordism, ComDiag } from '../components';

export default makeScene2D(function* (view) {
    const equation = createRef<Latex>();
    const associativity_eq = createRef<Latex>();
    const associativity_diag = createRef<ComDiag>();
    view.add(
        <>
            <Txt
                text={'Associativity'}
                fontSize={80}
                y={-450}
                fill={'white'}
                fontFamily={'Fira Sans Book'}
            />
            <Latex
                ref={equation}
                tex={'{\\color{white} (2 \\cdot 3) \\cdot 4 = 2 \\cdot (3 \\cdot 4)}'}
                height={50}
                y={-350}
                opacity={0}
            />
            <Latex
                ref={associativity_eq}
                tex={'{\\color{white} (xy)z  \\overset{?}{=} x(yz)}'}
                height={90}
                y={-250}
                x={-600}
                opacity={0}
            />
            <ComDiag
                ref={associativity_diag}
                position={[-600, 200]}
                scale={3}
                gapSize={80}
                itemColor={'coral'}
                items={[
                    [null, '\\mathcal H', null],
                    ['\\mathcal H \\otimes \\mathcal H', null, '\\mathcal H \\otimes \\mathcal H'],
                    [null, '\\mathcal H \\otimes \\mathcal H \\otimes \\mathcal H', null],
                ]}
                arrows={[
                    [[2, 1], [1, 0]],
                    [[2, 1], [1, 2]],
                    [[1, 0], [0, 1]],
                    [[1, 2], [0, 1]],
                ]}
                labels={[
                    '\\mu \\otimes id',
                    'id \\otimes \\mu',
                    '\\mu',
                    '\\mu'
                ]}
                opacity={0}
            />

        </>
    );
    yield* slideTransition(Direction.Bottom);
    yield* waitFor(1);
    yield*
        equation().opacity(1, 1);
    yield* waitUntil('(xy)z = x(yz)');
    yield* all(
        associativity_eq().opacity(1, 1),
        associativity_diag().opacity(1, 1),
        associativity_diag().animate(),
        equation().opacity(0.5, 0.5),
    );

    yield* waitFor(1);
    const border = createRef<Rect>();
    view.add(
        <Rect
            ref={border}
            size={[1200, 750]}
            stroke={'white'}
            lineWidth={5}
            y={100}
            x={330}
            radius={50}
            opacity={0.0}
            lineDash={[20]}
        />
    );
    yield* waitUntil('For this');
    yield* border().opacity(0.8, 0.5);
    const top_circles_opacity = createSignal(1);
    const label_opacity = createSignal(0);
    const overall_opacity = createSignal(0);
    view.add(
        <Layout opacity={overall_opacity}>
            <Shape position={[50, 20]} scale={[0.8, 0.8]}>
                <Cobordism
                    lineWidth={4}
                    stroke={'lightskyblue'}
                    numBottomCircles={2}
                    numTopCircles={1}
                    circleSize={100}
                    y={-140}
                    lengthScale={0.7}
                    connectorScale={2}
                    needsAnimation={false}
                    bottomCirclesOpacity={0}
                />
                <Latex
                    tex={'{\\color{white}(xy)z}'}
                    height={55}
                    position={[0, -280]}
                    opacity={label_opacity}
                />
                <Latex
                    tex={'{\\color{white}xy}'}
                    height={40}
                    position={[-150, -60]}
                    opacity={label_opacity}
                />
                <Latex
                    tex={'{\\color{white}z}'}
                    height={30}
                    position={[150, -65]}
                    opacity={label_opacity}
                />
                <Latex
                    tex={'{\\color{white}z}'}
                    height={30}
                    position={[150, 130]}
                    opacity={label_opacity}
                />
                <Latex
                    tex={'{\\color{white}y}'}
                    height={40}
                    position={[-50, 130]}
                    opacity={label_opacity}
                />
                <Latex
                    tex={'{\\color{white}x}'}
                    height={30}
                    position={[-250, 130]}
                    opacity={label_opacity}
                />
                <Cobordism
                    lineWidth={4}
                    stroke={'lightskyblue'}
                    numBottomCircles={2}
                    numTopCircles={1}
                    circleSize={100}
                    x={-150}
                    lengthScale={0.7}
                    needsAnimation={false}
                    topCirclesOpacity={top_circles_opacity}
                />
                <Cobordism
                    lineWidth={4}
                    stroke={'lightskyblue'}
                    numBottomCircles={1}
                    numTopCircles={1}
                    circleSize={100}
                    x={150}
                    lengthScale={0.7}
                    needsAnimation={false}
                    topCirclesOpacity={top_circles_opacity}
                />
            </Shape>
            <Shape position={[600, 20]} scale={[0.8, 0.8]}>
                <Cobordism
                    lineWidth={4}
                    stroke={'lightskyblue'}
                    numBottomCircles={2}
                    numTopCircles={1}
                    circleSize={100}
                    y={-140}
                    lengthScale={0.7}
                    connectorScale={2}
                    needsAnimation={false}
                    bottomCirclesOpacity={0}
                />
                <Latex
                    tex={'{\\color{white}x(yz)}'}
                    height={55}
                    position={[0, -280]}
                    opacity={label_opacity}
                />
                <Latex
                    tex={'{\\color{white}x}'}
                    height={30}
                    position={[-150, -65]}
                    opacity={label_opacity}
                />
                <Latex
                    tex={'{\\color{white}yz}'}
                    height={40}
                    position={[150, -65]}
                    opacity={label_opacity}
                />
                <Latex
                    tex={'{\\color{white}z}'}
                    height={30}
                    position={[250, 130]}
                    opacity={label_opacity}
                />
                <Latex
                    tex={'{\\color{white}y}'}
                    height={40}
                    position={[50, 130]}
                    opacity={label_opacity}
                />
                <Latex
                    tex={'{\\color{white}x}'}
                    height={30}
                    position={[-150, 130]}
                    opacity={label_opacity}
                />
                <Cobordism
                    lineWidth={4}
                    stroke={'lightskyblue'}
                    numBottomCircles={2}
                    numTopCircles={1}
                    circleSize={100}
                    x={150}
                    lengthScale={0.7}
                    needsAnimation={false}
                    topCirclesOpacity={top_circles_opacity}
                />
                <Cobordism
                    lineWidth={4}
                    stroke={'lightskyblue'}
                    numBottomCircles={1}
                    numTopCircles={1}
                    circleSize={100}
                    x={-150}
                    lengthScale={0.7}
                    needsAnimation={false}
                    topCirclesOpacity={top_circles_opacity}
                />
            </Shape>
        </Layout>
    )
    yield* overall_opacity(1, 1);
    yield* waitFor(3);
    yield* top_circles_opacity(0, 1);
    yield* label_opacity(1, 1);
    const m_3_opacity = createSignal(0);
    view.add(
        <>
            <Cobordism
                lineWidth={4}
                stroke={'lightskyblue'}
                numBottomCircles={3}
                numTopCircles={1}
                needsAnimation={false}
                circleSize={100}
                scale={0.8}
                position={[320, 300]}
                opacity={m_3_opacity}
            />
            <Txt
                text={'='}
                fill={'white'}
                rotation={45}
                fontFamily={'Fira Sans Book'}
                fontSize={80}
                position={[70, 220]}
                opacity={m_3_opacity}
            />
            <Txt
                text={'='}
                fill={'white'}
                rotation={-45}
                fontFamily={'Fira Sans Book'}
                fontSize={80}
                position={[570, 220]}
                opacity={m_3_opacity}
            />
        </>
    );
    yield* waitUntil('Since the two');
    yield* m_3_opacity(1, 1);
    yield* waitUntil('Sc. commutativity');

});