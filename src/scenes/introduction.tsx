import { Circle, Layout, Line, Ray, Rect, Txt, makeScene2D } from "@motion-canvas/2d";
import { Cobordism, ComDiag } from "../components";
import { PossibleVector2, all, createRef, createSignal, delay, easeOutQuint, tween, waitFor } from "@motion-canvas/core";

export default makeScene2D(function* (view) {

    const circle_offset = createSignal(0);
    const layout_ref = createRef<Layout>();
    const red_scale = createSignal<PossibleVector2>([1, 1]);
    const blue_scale = createSignal<PossibleVector2>([1, 1]);
    view.add(
        <Layout ref={layout_ref}>
            <Circle size={400} x={circle_offset} fill={'coral'} scale={red_scale}
                opacity={1} compositeOperation={'lighten'} />
            <Circle size={400} x={() => -circle_offset()} fill={'lightskyblue'} scale={blue_scale}
                opacity={1} compositeOperation={'lighten'} />
        </Layout>
    )
    yield* tween(8, value => {
        layout_ref().scale(1 + Math.sin(value * Math.PI * 5) * 0.1)
    })
    yield* all(circle_offset(450, 1),
        red_scale([1.2, 0.8], 0.5).to([1, 1], 0.5),
        blue_scale([1.2, 0.8], 0.5).to([1, 1], 0.5),
    );

    const line_progress = createSignal(0);
    view.add(
        <Ray
            lineWidth={5}
            stroke={'white'}
            lineDash={[20]}
            fromY={-600}
            toY={600}
            end={() => line_progress() + 0.5}
            start={() => 0.5 - line_progress()}
        />
    )
    yield* line_progress(0.5, 1);
    yield* waitFor(1);
    yield* blue_scale([0, 0], 1);

    const cobordism = createRef<Cobordism>();
    view.add(
        <Cobordism
            ref={cobordism}
            lineWidth={5}
            stroke={'lightskyblue'}
            circleSize={200}
            x={() => - circle_offset()}
            scale={0.7}
        />
    );
    yield* cobordism().animate();
    yield* red_scale([0, 0], 1);
    const diag = createRef<ComDiag>();
    view.add(
        <ComDiag
            ref={diag}
            scale={2}
            gapSize={100}
            x={circle_offset}
            itemColor={'coral'}
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
        />
    );
    yield* diag().animate();

    yield* line_progress(0, 1);
    yield* all(circle_offset(0, 1), diag().opacity(0, 1), cobordism().opacity(0, 1),
        delay(0.5, all(red_scale([1, 1], 0.5), blue_scale([1, 1], 0.5))));
    yield* tween(2, value => {
        layout_ref().scale(1 + Math.sin(value * Math.PI * 1.5) * 0.1)
    })
    yield* layout_ref().scale(0, 1);
    const title = createRef<Txt>();
    view.add(<Txt
        ref={title}
        fontSize={100}
        text={"TQFT's\nand\nFrobenius Algebras"}
        textAlign={'center'}
        fontFamily={'Fira Sans Book'}
        fill={'white'}
        opacity={0}
        scale={0.5}
    />);
    yield* all(title().fontSize(250, 2, easeOutQuint), title().opacity(1, 1));
    yield* waitFor(1);
})