import { Circle, Latex, Layout, Ray, Rect, Shape, Txt, colorSignal, makeScene2D } from '@motion-canvas/2d';
import { all, createRef, createSignal, sequence, waitFor } from '@motion-canvas/core';
import { Cobordism, ComDiag } from '../components';

export default makeScene2D(function* (view) {
    const equation = createRef<Latex>();
    view.add(
        <>
            <Txt
                text={'Commutativity'}
                fontSize={80}
                y={-450}
                fill={'white'}
                fontFamily={'Fira Sans Book'}
            />
            <Latex
                ref={equation}
                tex={'{\\color{white} xy = yx }'}
                height={50}
                y={-350}
                opacity={0}
            />
        </>
    )
    yield*
        equation().opacity(1, 1);

    yield* waitFor(1);
    const border = createRef<Rect>();
    view.add(
        <Rect
            ref={border}
            size={[1500, 750]}
            stroke={'white'}
            lineWidth={5}
            y={100}
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
        <Layout opacity={overall_opacity}>
            <Layout x={-400} y={20}>
                <Cobordism
                    lineWidth={4}
                    stroke={'lightskyblue'}
                    numBottomCircles={2}
                    numTopCircles={1}
                    circleSize={150}
                    needsAnimation={false}
                />
                <Latex
                    tex={'{\\color{white}x}'}
                    height={40}
                    position={[-150, 230]}
                    opacity={label_opacity}
                />
                <Latex
                    tex={'{\\color{white}y}'}
                    height={50}
                    position={[150, 230]}
                    opacity={label_opacity}
                />
                <Latex
                    tex={'{\\color{white}xy}'}
                    height={50}
                    position={[0, -220]}
                    opacity={label_opacity}
                />
            </Layout>
            <Txt
                text={'='}
                fill={'white'}
                fontFamily={'Fira Sans Book'}
                fontSize={80}
                y={50}
            />
            <Layout x={400} y={20}>
                <Cobordism
                    lineWidth={4}
                    stroke={'lightskyblue'}
                    numBottomCircles={2}
                    numTopCircles={1}
                    circleSize={150}
                    needsAnimation={false}
                    bottomCirclesOpacity={0}
                />
                <Cobordism
                    lineWidth={4}
                    stroke={'lightskyblue'}
                    numBottomCircles={1}
                    numTopCircles={1}
                    lengthScale={0.7}
                    x={-150}
                    y={250}
                    circleSize={150}
                    needsAnimation={false}
                    topCirclesOpacity={0.5}
                    bottomRowOffset={300}
                />
                <Cobordism
                    lineWidth={4}
                    stroke={'lightskyblue'}
                    numBottomCircles={1}
                    numTopCircles={1}
                    lengthScale={0.7}
                    x={150}
                    y={250}
                    circleSize={150}
                    needsAnimation={false}
                    topCirclesOpacity={0.5}
                    bottomRowOffset={-300}
                />
                <Latex
                    tex={'{\\color{white}x}'}
                    height={40}
                    position={[150, 150]}
                    opacity={label_opacity}
                />
                <Latex
                    tex={'{\\color{white}y}'}
                    height={50}
                    position={[-150, 150]}
                    opacity={label_opacity}
                />
                <Latex
                    tex={'{\\color{white}x}'}
                    height={40}
                    position={[-150, 355]}
                    opacity={label_opacity}
                />
                <Latex
                    tex={'{\\color{white}y}'}
                    height={50}
                    position={[150, 355]}
                    opacity={label_opacity}
                />
                <Latex
                    tex={'{\\color{white}yx}'}
                    height={50}
                    position={[0, -220]}
                    opacity={label_opacity}
                />
            </Layout>
        </Layout>
    )
    yield* overall_opacity(1, 1);
    yield* waitFor(0.5);
    yield* label_opacity(1, 1);
    yield* waitFor(1);

});