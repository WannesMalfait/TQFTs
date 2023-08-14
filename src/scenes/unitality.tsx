import { Circle, Latex, Layout, Ray, Rect, Shape, Txt, colorSignal, makeScene2D } from '@motion-canvas/2d';
import { all, createRef, createSignal, sequence, waitFor } from '@motion-canvas/core';
import { Cobordism, ComDiag } from '../components';

export default makeScene2D(function* (view) {
    const equation = createRef<Latex>();
    const unitality_eq = createRef<Latex>();
    const unitality_diag = createRef<ComDiag>();
    const unit_diag = createRef<ComDiag>();
    const unit_bottom_label_opacity = createSignal(0);
    const unit_top_label_opacity = createSignal(0);
    const unit_opacity = createSignal(0);
    view.add(
        <>
            <Txt
                text={'Unitality'}
                fontSize={80}
                y={-450}
                fill={'white'}
                fontFamily={'Fira Sans Book'}
            />
            <Latex
                ref={equation}
                tex={'{\\color{white} 1 \\cdot 4 = 4 = 4 \\cdot 1}'}
                height={50}
                y={-350}
                opacity={0}
            />
            <Latex
                ref={unitality_eq}
                tex={'{\\color{white} 1_{\\mathcal H}x \\overset{?}{=} x \\overset{?}{=} x1_{\\mathcal H} }'}
                height={90}
                y={-270}
                x={-600}
                opacity={0}
            />
            <ComDiag
                ref={unitality_diag}
                position={[-600, 150]}
                scale={2.5}
                gapSize={70}
                labelHeight={12}
                itemColor={'pink'}
                items={[
                    [null, '\\mathcal H', null],
                    ['\\mathcal H \\otimes \\mathcal H', null, '\\mathcal H \\otimes \\mathcal H'],
                    ['\\mathbb C \\otimes \\mathcal H', null, '\\mathcal H \\otimes \\mathbb C'],
                    [null, '\\mathcal H', null],
                ]}
                arrows={[
                    [[3, 1], [0, 1]],
                    [[3, 1], [2, 0]],
                    [[3, 1], [2, 2]],
                    [[2, 0], [1, 0]],
                    [[2, 2], [1, 2]],
                    [[1, 0], [0, 1]],
                    [[1, 2], [0, 1]],
                ]}
                labels={[
                    'id',
                    '\\cong',
                    '\\cong',
                    '\\eta \\otimes id',
                    'id \\otimes \\eta',
                    '\\mu',
                    '\\mu'
                ]}
                opacity={0}
            />

            <Layout x={0} scale={2} opacity={unit_opacity}>
                <Circle
                    width={100}
                    height={50}
                    lineWidth={4}
                    stroke={'lightskyblue'}
                    startAngle={180}
                    lineCap={'round'}
                />
                <Circle
                    width={100}
                    height={50}
                    lineWidth={4}
                    stroke={'lightskyblue'}
                    lineCap={'round'}
                    endAngle={180}
                    lineDash={[Math.PI * 100 / 20]}
                />
                <Circle
                    width={100}
                    height={130}
                    lineWidth={4}
                    stroke={'lightskyblue'}
                    lineCap={'round'}
                    endAngle={180}
                />
                <Latex
                    tex={'{\\color{white}1_{\\mathcal H}}'}
                    height={40}
                    y={-70}
                    opacity={unit_top_label_opacity}
                />
                <Latex
                    tex={'{\\color{white}1}'}
                    height={30}
                    y={100}
                    opacity={unit_bottom_label_opacity}
                />
                <ComDiag
                    ref={unit_diag}
                    gapSize={45}
                    x={200}
                    y={12}
                    scale={3}
                    itemColor={'pink'}
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
                />
            </Layout>
        </>
    )
    yield* unit_diag().animate_arrows(0);
    yield* unit_diag().animate_labels(0);
    yield* equation().opacity(1, 1);
    yield* waitFor(1);
    yield* unit_opacity(1, 1);
    yield* unit_bottom_label_opacity(1, 1);
    yield* unit_top_label_opacity(1, 1);
    yield* all(
        unitality_eq().opacity(1, 1),
        unitality_diag().opacity(1, 1),
        unitality_diag().animate(),
        equation().opacity(0.5, 0.5),
    );
    yield* unit_opacity(0, 0.5);
    yield* waitFor(0.5);
    const border = createRef<Rect>();
    view.add(
        <Rect
            ref={border}
            size={[1200, 550]}
            stroke={'white'}
            lineWidth={5}
            y={100}
            x={330}
            radius={50}
            opacity={0.0}
            lineDash={[20]}
        />
    );
    yield* border().opacity(0.8, 0.5);
    const top_circles_opacity = createSignal(1);
    const label_opacity = createSignal(0);
    const overall_opacity = createSignal(0);
    view.add(
        <Layout opacity={overall_opacity} x={330} y={100} scale={1}>
            <Cobordism
                lineWidth={4}
                stroke={'lightskyblue'}
                numBottomCircles={1}
                numTopCircles={1}
                needsAnimation={false}
                circleSize={100}
            />
            <Txt
                text={'='}
                fill={'white'}
                fontFamily={'Fira Sans Book'}
                fontSize={80}
                x={-180}
            />
            <Txt
                text={'='}
                fill={'white'}
                fontFamily={'Fira Sans Book'}
                fontSize={80}
                x={180}
            />
            <Latex
                tex={'{\\color{white}x}'}
                height={30}
                y={160}
                opacity={label_opacity}
            />
            <Latex
                tex={'{\\color{white}x}'}
                height={30}
                y={-170}
                opacity={label_opacity}
            />
            <Layout x={-400}>
                <Cobordism
                    lineWidth={4}
                    stroke={'lightskyblue'}
                    numBottomCircles={2}
                    numTopCircles={1}
                    circleSize={100}
                    needsAnimation={false}
                    bottomCirclesOpacity={0}
                />
                <Circle
                    position={[100, 100]}
                    width={100}
                    height={50}
                    lineWidth={4}
                    stroke={'lightskyblue'}
                />
                <Shape position={[-100, 100]} >
                    <Circle
                        width={100}
                        height={50}
                        lineWidth={4}
                        stroke={'lightskyblue'}
                        startAngle={180}
                        lineCap={'round'}
                        opacity={top_circles_opacity}
                    />
                    <Circle
                        width={100}
                        height={50}
                        lineWidth={4}
                        stroke={'lightskyblue'}
                        lineCap={'round'}
                        endAngle={180}
                        lineDash={[Math.PI * 100 / 20]}
                        opacity={top_circles_opacity}
                    />
                    <Circle
                        width={100}
                        height={130}
                        lineWidth={4}
                        stroke={'lightskyblue'}
                        lineCap={'round'}
                        endAngle={180}
                    />
                </Shape>
                <Latex
                    tex={'{\\color{white}1_{\\mathcal H}}'}
                    height={40}
                    position={[-100, 100]}
                    opacity={label_opacity}
                />
                <Latex
                    tex={'{\\color{white}1}'}
                    height={30}
                    position={[-100, 200]}
                    opacity={label_opacity}
                />
                <Latex
                    tex={'{\\color{white}x}'}
                    height={30}
                    position={[100, 160]}
                    opacity={label_opacity}
                />
                <Latex
                    tex={'{\\color{white}1_{\\mathcal H} x}'}
                    height={50}
                    position={[0, -170]}
                    opacity={label_opacity}
                />
            </Layout>
            <Layout x={400}>
                <Cobordism
                    lineWidth={4}
                    stroke={'lightskyblue'}
                    numBottomCircles={2}
                    numTopCircles={1}
                    circleSize={100}
                    needsAnimation={false}
                    bottomCirclesOpacity={0}
                />
                <Circle
                    position={[-100, 100]}
                    width={100}
                    height={50}
                    lineWidth={4}
                    stroke={'lightskyblue'}
                />
                <Shape position={[100, 100]} >
                    <Circle
                        width={100}
                        height={50}
                        lineWidth={4}
                        stroke={'lightskyblue'}
                        startAngle={180}
                        lineCap={'round'}
                        opacity={top_circles_opacity}
                    />
                    <Circle
                        width={100}
                        height={50}
                        lineWidth={4}
                        stroke={'lightskyblue'}
                        lineCap={'round'}
                        endAngle={180}
                        lineDash={[Math.PI * 100 / 20]}
                        opacity={top_circles_opacity}
                    />
                    <Circle
                        width={100}
                        height={130}
                        lineWidth={4}
                        stroke={'lightskyblue'}
                        lineCap={'round'}
                        endAngle={180}
                    />
                </Shape>
                <Latex
                    tex={'{\\color{white}1_{\\mathcal H}}'}
                    height={40}
                    position={[100, 100]}
                    opacity={label_opacity}
                />
                <Latex
                    tex={'{\\color{white}1}'}
                    height={30}
                    position={[100, 200]}
                    opacity={label_opacity}
                />
                <Latex
                    tex={'{\\color{white}x}'}
                    height={30}
                    position={[-100, 160]}
                    opacity={label_opacity}
                />
                <Latex
                    tex={'{\\color{white} x1_{\\mathcal H}}'}
                    height={50}
                    position={[0, -170]}
                    opacity={label_opacity}
                />
            </Layout>
        </Layout>
    );
    yield* overall_opacity(1, 1);
    yield* top_circles_opacity(0, 1);
    yield* waitFor(1);
    yield* label_opacity(1, 1);
    yield* waitFor(1);

});