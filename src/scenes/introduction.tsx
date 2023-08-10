import { makeScene2D } from "@motion-canvas/2d";
import { Cobordism, ComDiag } from "../components";
import { createRef, waitFor } from "@motion-canvas/core";

export default makeScene2D(function* (view) {

    const cobordism = createRef<Cobordism>();
    view.add(<Cobordism
        ref={cobordism}
        lineWidth={10}
        stroke={'red'}
    />)

    yield* cobordism().animate();
    yield* waitFor(1);
    const diag = createRef<ComDiag>();
    view.add(<ComDiag
        ref={diag}
        diagScale={1}
        gapSize={120}
        itemColor={'lightgrey'}
        labelColor={'white'}
        items={
            [
                [null, 'A \\otimes A', null],
                ['A \\otimes A \\otimes A', 'A', 'A \\otimes A \\otimes A'],
                [null, 'A \\otimes A', null]
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
    />)

    yield* diag().animate();
    yield* waitFor(1);
})