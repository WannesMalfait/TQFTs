import { makeScene2D, Rect, Video } from '@motion-canvas/2d';

import video from '../video/revolutions_in_physics.mp4';
import { createRef, Direction, slideTransition, waitFor, waitUntil } from '@motion-canvas/core';

export default makeScene2D(function* (view) {
    const videoRef = createRef<Video>();

    yield view.add(<Video ref={videoRef} src={video} />);
    videoRef().play();
    yield* slideTransition(Direction.Right);
    yield* waitFor(5);
    yield* waitUntil('Two Theories');
});