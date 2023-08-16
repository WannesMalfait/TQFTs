import { makeScene2D, Rect, Video } from '@motion-canvas/2d';

import video from '../video/shape_of_space.mp4';
import { createRef, fadeTransition, waitFor, waitUntil } from '@motion-canvas/core';

export default makeScene2D(function* (view) {
    const videoRef = createRef<Video>();

    yield view.add(<Video ref={videoRef} src={video} />);
    videoRef().play();
    yield* fadeTransition(1);
    yield* waitFor(0.5);
    yield* waitUntil('Quantum Theory');
});