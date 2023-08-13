import { Circle, CubicBezier, Layout, Shape, ShapeProps, initial, signal } from "@motion-canvas/2d";
import { SignalValue, SimpleSignal, all, createSignal, easeInOutCubic, makeRef, range, tween } from "@motion-canvas/core";

export interface CobordismProps extends ShapeProps {
    circleSize?: SignalValue<number>;
    lengthScale?: SignalValue<number>;
    connectorScale?: SignalValue<number>;
    bottomCirclesOpacity?: SignalValue<number>;
    topCirclesOpacity?: SignalValue<number>;
    numBottomCircles?: SignalValue<number>;
    numTopCircles?: SignalValue<number>;
    numHoles?: SignalValue<number>;
    needsAnimation?: SignalValue<boolean>;
}

export class Cobordism extends Shape {

    @initial(200)
    @signal()
    public declare readonly circleSize: SimpleSignal<number, this>;
    @initial(1)
    @signal()
    public declare readonly bottomCirclesOpacity: SimpleSignal<number, this>;
    @initial(1)
    @signal()
    public declare readonly topCirclesOpacity: SimpleSignal<number, this>;
    @initial(1)
    @signal()
    public declare readonly lengthScale: SimpleSignal<number, this>;
    @initial(1)
    @signal()
    public declare readonly connectorScale: SimpleSignal<number, this>;
    @initial(1)
    @signal()
    public declare readonly numBottomCircles: SimpleSignal<number, this>;
    @initial(2)
    @signal()
    public declare readonly numTopCircles: SimpleSignal<number, this>;
    @initial(0)
    @signal()
    public declare readonly numHoles: SimpleSignal<number, this>;
    @initial(true)
    @signal()
    public declare readonly needsAnimation: SimpleSignal<boolean, this>;

    private bottomCircles: Circle[] = [];
    private topCircles: Circle[] = [];
    private lines: CubicBezier[] = [];
    private progress = createSignal(0);
    private bottomAngle = createSignal(0);
    private bottomConnectorAngle = createSignal(360);

    public constructor(props?: CobordismProps) {
        super({
            ...props
        });

        if (!this.needsAnimation()) {
            this.progress(1);
            this.bottomAngle(360);
            this.bottomConnectorAngle(180);
        }

        // Connecting lines.
        this.add(
            range(2).map(i => {
                const start_width = ((this.numBottomCircles() - 1) * this.connectorScale()
                    + this.numBottomCircles()) * this.circleSize();
                const end_width = ((this.numTopCircles() - 1) * this.connectorScale()
                    + this.numTopCircles()) * this.circleSize();
                return (
                    <CubicBezier
                        ref={makeRef(this.lines, i)}
                        lineWidth={this.lineWidth}
                        stroke={this.stroke}
                        p0={[-start_width / 2 + i * start_width, this.circleSize() * this.lengthScale()]}
                        p1={[-start_width / 2 + i * start_width, 0]}
                        p2={[-end_width / 2 + i * end_width, 0]}
                        p3={[-end_width / 2 + i * end_width, -this.circleSize() * this.lengthScale()]}
                        lineCap={'round'}
                        end={this.progress}
                        opacity={() => Math.pow(this.progress(), 0.2)}
                    />
                )
            })
        );

        // Bottom circles.
        this.add(
            range(this.numBottomCircles()).map(
                i => {
                    const l1_pos = this.lines[0].getPointAtPercentage(0).position;
                    const l2_pos = this.lines[1].getPointAtPercentage(0).position;
                    let fac = 1;
                    if (this.numBottomCircles() != 1) {
                        fac = i / (this.numBottomCircles() - 1);
                    }
                    return (
                        <Circle
                            ref={makeRef(this.bottomCircles, i)}
                            stroke={this.stroke}
                            lineWidth={this.lineWidth}
                            y={l1_pos.y}
                            x={() => fac * (l2_pos.x - this.circleSize() / 2) +
                                (1 - fac) * (l1_pos.x + this.circleSize() / 2)}
                            width={this.circleSize}
                            height={() => this.circleSize() * 0.5}
                            lineCap={'round'}
                            opacity={() => (this.bottomAngle() <= 0.01) ? 0 : this.bottomCirclesOpacity()}
                            endAngle={this.bottomAngle}
                        />
                    );
                }),
        );


        // Bottom circle connectors.
        this.add(
            range(this.numBottomCircles() - 1).map(
                i => {
                    const width = () => this.bottomCircles[i + 1].left().x - this.bottomCircles[i].right().x;
                    return (
                        <Circle
                            stroke={this.stroke}
                            lineWidth={this.lineWidth}
                            left={this.bottomCircles[i].right}
                            width={width}
                            height={() => width() * 0.25}
                            lineCap={'round'}
                            startAngle={this.bottomConnectorAngle}
                            endAngle={360}
                            opacity={() => (this.bottomConnectorAngle() >= 359.99) ? 0 : 1}
                        />
                    );
                }),
        );

        // Holes.
        this.add(
            range(this.numHoles()).map(
                i => {
                    const right = this.lines[1].getPointAtPercentage(0.5).position.x;
                    const left = this.lines[0].getPointAtPercentage(0.5).position.x;
                    const available_width = right - left;
                    const width = available_width / (this.numHoles() * 2 + 1);
                    const x = left + width * (2 * i + 1) + width / 2;
                    return (
                        <Layout>
                            <Circle
                                stroke={this.stroke}
                                lineWidth={this.lineWidth}
                                size={width}
                                height={width * 0.5}
                                y={- width * 0.09}
                                x={x}
                                startAngle={10}
                                endAngle={170}
                                lineCap={'round'}
                                opacity={() => Math.pow(this.progress(), 4)}
                            />
                            <Circle
                                stroke={this.stroke}
                                lineWidth={this.lineWidth}
                                size={width * 0.8}
                                height={width * 0.5 * 0.8}
                                y={width * 0.09}
                                x={x}
                                startAngle={190}
                                endAngle={350}
                                lineCap={'round'}
                                opacity={() => Math.pow(this.progress(), 4)}
                            />
                        </Layout>
                    );
                }
            )
        );

        // Top circles.
        this.add(
            range(this.numTopCircles()).map(
                i => {
                    const l1_pos = () => this.lines[0].getPointAtPercentage(this.progress()).position;
                    const l2_pos = () => this.lines[1].getPointAtPercentage(this.progress()).position;
                    let fac = 1;
                    let circleSize = () => (l2_pos().x - l1_pos().x)
                        / (this.numTopCircles() + (this.numTopCircles() - 1) * this.connectorScale());
                    if (this.numTopCircles() >= this.numBottomCircles()) {
                        circleSize = this.circleSize;
                    }
                    if (this.numTopCircles() != 1) {
                        fac = i / (this.numTopCircles() - 1);
                    }
                    return (
                        <Layout>
                            <Circle
                                ref={makeRef(this.topCircles, i)}
                                stroke={this.stroke}
                                lineWidth={this.lineWidth}
                                y={() => l1_pos().y}
                                x={() => fac * (l2_pos().x - circleSize() / 2) +
                                    (1 - fac) * (l1_pos().x + circleSize() / 2)}
                                width={circleSize}
                                height={() => circleSize() * 0.5 * (0.1 + 0.9 * this.progress())}
                                opacity={() => this.progress() * this.topCirclesOpacity()}
                                startAngle={180}
                                lineCap={'round'}
                            />
                            <Circle
                                stroke={this.stroke}
                                lineWidth={this.lineWidth}
                                y={() => l1_pos().y}
                                x={() => fac * (l2_pos().x - circleSize() / 2) +
                                    (1 - fac) * (l1_pos().x + circleSize() / 2)}
                                width={circleSize}
                                height={() => circleSize() * 0.5 * (0.1 + 0.9 * this.progress())}
                                opacity={() => this.progress() * this.topCirclesOpacity()}
                                endAngle={180}
                                lineCap={'round'}
                                lineDash={() => [Math.PI * circleSize() / 30]}
                            />
                        </Layout >
                    );
                }),
        );

        // Top circle connectors.
        this.add(
            range(this.numTopCircles() - 1).map(
                i => {
                    const width = () => this.topCircles[i + 1].left().x - this.topCircles[i].right().x;
                    return (
                        <Circle
                            stroke={this.stroke}
                            lineWidth={this.lineWidth}
                            left={this.topCircles[i].right}
                            width={width}
                            height={() => width() * 0.25}
                            lineCap={'round'}
                            opacity={this.progress}
                            endAngle={180}
                        />
                    );
                }),
        );

    }
    public *animate(start: number = 1, end: number = 1.5) {
        this.progress(0);
        this.bottomAngle(0);
        this.bottomConnectorAngle(360);
        yield*
            tween(start, value => {
                this.bottomAngle(easeInOutCubic(value, 0, 360));
                // Delay this till halfway.
                const delayed_value = Math.max(0, value - 0.5) * 2;
                this.bottomConnectorAngle(easeInOutCubic(delayed_value, 360, 180));
            });
        yield* this.progress(1, end);
    }

    public *bottom_circles(duration: number = 1) {
        this.bottomAngle(0);
        yield* this.bottomAngle(360, duration);
    }
    public *bottom_connectors(duration: number = 0.5) {
        this.bottomConnectorAngle(360);
        yield* this.bottomConnectorAngle(180, duration);
    }
    public *extrude(duration: number = 1.5) {
        this.progress(0);
        yield* this.progress(1, duration);
    }
}

