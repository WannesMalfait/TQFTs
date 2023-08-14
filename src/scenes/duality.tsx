import { Circle, Latex, Layout, Ray, Rect, Shape, Txt, colorSignal, makeScene2D } from '@motion-canvas/2d';
import { all, createRef, createSignal, sequence, waitFor } from '@motion-canvas/core';
import { Cobordism, ComDiag } from '../components';

export default makeScene2D(function* (view) {
    const unitality_diag = createRef<ComDiag>();
    const associativity_diag = createRef<ComDiag>();
    const counitality_diag = createRef<ComDiag>();
    const coassociativity_diag = createRef<ComDiag>();
    const associativity_txt = createRef<Txt>();
    const unitality_txt = createRef<Txt>();
    view.add(
        <>
            <Txt
                text={'Duality'}
                fontSize={80}
                y={-450}
                fill={'white'}
                fontFamily={'Fira Sans Book'}
            />
            <Txt
                ref={associativity_txt}
                text={'Associativity'}
                fontSize={60}
                y={450}
                x={-500}
                fill={'white'}
                fontFamily={'Fira Sans Book'}
            />
            <Txt
                ref={unitality_txt}
                text={'Unitality'}
                fontSize={60}
                y={450}
                x={500}
                fill={'white'}
                fontFamily={'Fira Sans Book'}
            />
            <ComDiag
                ref={associativity_diag}
                position={[-500, 0]}
                scale={3}
                gapSize={80}
                labelHeight={12}
                itemColor={'pink'}
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
            <ComDiag
                ref={unitality_diag}
                position={[500, 0]}
                scale={3}
                gapSize={65}
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
            <ComDiag
                ref={coassociativity_diag}
                position={[-500, 0]}
                scale={3}
                gapSize={80}
                labelHeight={12}
                itemColor={'pink'}
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
                    '\\delta \\otimes id',
                    'id \\otimes \\delta',
                    '\\delta',
                    '\\delta'
                ]}
                opacity={0}
            />
            <ComDiag
                ref={counitality_diag}
                position={[500, 0]}
                scale={3}
                gapSize={65}
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
                    '\\epsilon \\otimes id',
                    'id \\otimes \\epsilon',
                    '\\delta',
                    '\\delta'
                ]}
                opacity={0}
            />
        </>
    );

    yield* all(
        unitality_diag().opacity(1, 1),
        associativity_diag().opacity(1, 1),
        unitality_diag().animate(),
        associativity_diag().animate(),
    );
    yield* all(
        coassociativity_diag().animate_arrows(0),
        coassociativity_diag().animate_labels(0),
        counitality_diag().animate_arrows(0),
        counitality_diag().animate_labels(0),
    );
    yield* all(
        associativity_diag().opacity(0, 1),
        coassociativity_diag().opacity(1, 1),
        unitality_diag().opacity(0, 1),
        counitality_diag().opacity(1, 1),
        associativity_txt().text('Coassociativity', 0.3),
        unitality_txt().text('Counitality', 0.3),
    )
    yield* waitFor(0.5);

});