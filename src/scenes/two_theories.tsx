import { Circle, Ray, Rect, Txt, colorSignal, makeScene2D } from '@motion-canvas/2d';
import { all, createRef, createSignal, waitFor } from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  // Create your animations here

  const general_relativity = createRef<Txt>();
  const offset = createSignal(0);
  view.add(<Txt
    ref={general_relativity}
    fontSize={80}
    x={() => 450 - offset()}
    text={'General Relativity'}
    fontFamily={'Fira Sans Book'}
    fill={'white'}
  />);
  const quantum_mechanics = createRef<Txt>();
  view.add(<Txt
    ref={quantum_mechanics}
    fontSize={80}
    x={() => -450 + offset()}
    text={'Quantum Mechanics'}
    fontFamily={'Fira Sans Book'}
    fill={'white'}
  />);

  yield* all(
    offset(-70, 0.5).to(70, 1).to(-70, 1).to(0, 1),
    quantum_mechanics().fill('lightskyblue', 0.5).to('darkorange', 1).to('lightskyblue', 1).to('white', 1),
    general_relativity().fill('lightskyblue', 0.5).to('darkorange', 1).to('lightskyblue', 1).to('white', 1)
  );
  yield* waitFor(1);

  const quantum_gravity = createRef<Txt>();
  view.add(<Txt
    ref={quantum_gravity}
    fontSize={80}
    y={300}
    text={'Quantum Gravity'}
    fontFamily={'Fira Sans Book'}
    fill={'white'}
    opacity={0}
  />);
  const arrow_progress = createSignal(0);
  view.add(<Ray
    lineWidth={8}
    endArrow
    stroke={'lightskyblue'}
    end={arrow_progress}
    from={quantum_mechanics().bottom}
    to={quantum_gravity().top}
  />);
  view.add(<Ray
    lineWidth={8}
    endArrow
    stroke={'lightskyblue'}
    end={arrow_progress}
    from={general_relativity().bottom}
    to={quantum_gravity().top}
  />);
  yield* arrow_progress(0.8, 1);
  yield* quantum_gravity().opacity(1, 1);
  yield* waitFor(1);

  const cover = createRef<Rect>();
  view.add(<Rect
    ref={cover}
    size={2000}
    fill={'#202020'}
    opacity={0} />);
  yield* cover().opacity(1, 1.5);
  const tqfts = createRef<Txt>();
  view.add(<Txt
    ref={tqfts}
    fontSize={80}
    text={'Topological Quantum Field Theories'}
    fontFamily={'Fira Sans Book'}
    fill={'lightskyblue'}
    opacity={0}
  />);
  yield* all(tqfts().opacity(1, 1), tqfts().fontSize(100, 2));
  yield* waitFor(1);
});
