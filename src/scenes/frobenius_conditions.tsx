import { Circle, Latex, Layout, Ray, Rect, Shape, Txt, colorSignal, makeScene2D } from '@motion-canvas/2d';
import { all, createRef, createSignal, sequence, waitFor } from '@motion-canvas/core';
import { Cobordism, ComDiag } from '../components';

export default makeScene2D(function* (view) {
    const equation = createRef<Latex>();
    view.add(
        <>
            <Txt
                text={'Frobenius Conditions'}
                fontSize={80}
                y={-450}
                fill={'white'}
                fontFamily={'Fira Sans Book'}
            />
            <Latex
                ref={equation}
                tex={'{\\color{white}  (\\mu \\otimes id) \\circ (id \\otimes \\delta) = \\delta \\circ \\mu =(id \\otimes \\mu) \\circ (\\delta \\otimes id)}'}
                height={50}
                y={-350}
                opacity={0}
            />
        </>
    )
    const cobordisms = createRef<Layout>();
    view.add(
        <Layout ref={cobordisms} opacity={0}>
            <Layout>
                <Cobordism
                    lineWidth={5}
                    stroke={'lightskyblue'}
                    numBottomCircles={2}
                    numTopCircles={1}
                    circleSize={100}
                    y={100}
                    needsAnimation={false}
                />
                <Cobordism
                    lineWidth={5}
                    stroke={'lightskyblue'}
                    numBottomCircles={1}
                    numTopCircles={2}
                    circleSize={100}
                    bottomCirclesOpacity={0}
                    y={-100}
                    needsAnimation={false}
                />
            </Layout>
            <Txt
                text={'='}
                fill={'white'}
                fontFamily={'Fira Sans Book'}
                fontSize={80}
                x={-250}
            />
            <Txt
                text={'='}
                fill={'white'}
                fontFamily={'Fira Sans Book'}
                fontSize={80}
                x={250}
            />
            <Layout x={600} >
                <Cobordism
                    lineWidth={5}
                    stroke={'lightskyblue'}
                    numBottomCircles={1}
                    numTopCircles={2}
                    circleSize={100}
                    y={100}
                    x={-100}
                    needsAnimation={false}
                />
                <Cobordism
                    lineWidth={5}
                    stroke={'lightskyblue'}
                    numBottomCircles={1}
                    numTopCircles={1}
                    circleSize={100}
                    y={100}
                    x={200}
                    needsAnimation={false}
                />
                <Cobordism
                    lineWidth={5}
                    stroke={'lightskyblue'}
                    numBottomCircles={2}
                    numTopCircles={1}
                    circleSize={100}
                    y={-100}
                    x={100}
                    needsAnimation={false}
                    bottomCirclesOpacity={0}
                />
                <Cobordism
                    lineWidth={5}
                    stroke={'lightskyblue'}
                    numBottomCircles={1}
                    numTopCircles={1}
                    circleSize={100}
                    y={-100}
                    x={-200}
                    needsAnimation={false}
                    bottomCirclesOpacity={0}
                />
            </Layout>
            <Layout x={-600} scaleX={-1} >
                <Cobordism
                    lineWidth={5}
                    stroke={'lightskyblue'}
                    numBottomCircles={1}
                    numTopCircles={2}
                    circleSize={100}
                    y={100}
                    x={-100}
                    needsAnimation={false}
                />
                <Cobordism
                    lineWidth={5}
                    stroke={'lightskyblue'}
                    numBottomCircles={1}
                    numTopCircles={1}
                    circleSize={100}
                    y={100}
                    x={200}
                    needsAnimation={false}
                />
                <Cobordism
                    lineWidth={5}
                    stroke={'lightskyblue'}
                    numBottomCircles={2}
                    numTopCircles={1}
                    circleSize={100}
                    y={-100}
                    x={100}
                    needsAnimation={false}
                    bottomCirclesOpacity={0}
                />
                <Cobordism
                    lineWidth={5}
                    stroke={'lightskyblue'}
                    numBottomCircles={1}
                    numTopCircles={1}
                    circleSize={100}
                    y={-100}
                    x={-200}
                    needsAnimation={false}
                    bottomCirclesOpacity={0}
                />
            </Layout>
        </Layout>
    )
    yield* cobordisms().opacity(1, 2);
    yield* waitFor(1);
    yield* all(
        cobordisms().scale(0.7, 1),
        cobordisms().y(-120, 1),
    );
    yield* equation().opacity(1, 1);
    const diag = createRef<ComDiag>();
    view.add(
        <ComDiag
            ref={diag}
            scale={3}
            y={300}
            gapSize={50}
            labelHeight={10}
            itemColor={'pink'}
            items={
                [
                    [null, '\\mathcal H \\otimes \\mathcal H', null],
                    ['\\mathcal H \\otimes \\mathcal H \\otimes \\mathcal H', '\\mathcal H', '\\mathcal H \\otimes \\mathcal H \\otimes \\mathcal H'],
                    [null, '\\mathcal H \\otimes \\mathcal H', null]
                ]}
            arrows={[
                [[1, 0], [0, 1]],
                [[1, 1], [0, 1]],
                [[1, 2], [0, 1]],
                [[2, 1], [1, 0]],
                [[2, 1], [1, 1]],
                [[2, 1], [1, 2]],
            ]}
            labels={[
                '\\mu \\otimes id',
                '\\delta',
                'id \\otimes \\mu',
                'id \\otimes \\delta',
                '\\mu',
                '\\delta \\otimes id'
            ]}
            opacity={0}
        />
    );
    yield* all(
        diag().animate(),
        diag().opacity(1, 1),
    );
    yield* waitFor(1);

});