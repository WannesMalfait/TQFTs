import { Latex, Layout, NodeProps, Ray, Rect, Shape, ShapeProps, colorSignal, initial, signal } from "@motion-canvas/2d";
import { ColorSignal, PossibleColor, PossibleVector2, SignalValue, SimpleSignal, Vector2, all, easeInOutCubic, makeRef, tween, unwrap } from "@motion-canvas/core";

export interface ComDiagProps extends ShapeProps {
    labelHeight?: SignalValue<number>;
    gapSize?: SignalValue<number>;
    itemColor?: SignalValue<PossibleColor>;
    arrowColor?: SignalValue<PossibleColor>;
    labelColor?: SignalValue<PossibleColor>;
    flipArrows?: SignalValue<boolean>;
    items?: SignalValue<SignalValue<SignalValue<string | null>[]>[]>;
    arrows?: SignalValue<SignalValue<PossibleVector2[]>[]>;
    labels?: SignalValue<string[]>;

}

export class ComDiag extends Shape {
    @initial('#CCCCCC')
    @colorSignal()
    public declare readonly itemColor: ColorSignal<this>;
    @initial('#CCCCCC')
    @colorSignal()
    public declare readonly arrowColor: ColorSignal<this>;
    @initial('white')
    @colorSignal()
    public declare readonly labelColor: ColorSignal<this>;
    @initial(15)
    @signal()
    public declare readonly labelHeight: SimpleSignal<number, this>;
    @initial(120)
    @signal()
    public declare readonly gapSize: SimpleSignal<number, this>;
    @initial(false)
    @signal()
    public declare readonly flipArrows: SimpleSignal<boolean, this>;
    @initial([['item']])
    @signal()
    public declare readonly items: SimpleSignal<
        SignalValue<SignalValue<string | null>[]>[]
        , this>;
    @initial([])
    @signal()
    public declare readonly arrows: SimpleSignal<
        SignalValue<PossibleVector2[]>[],
        this>;
    @initial([])
    @signal()
    public declare readonly labels: SimpleSignal<string[], this>;


    private itemRefs: Latex[] = [];
    private arrowRefs: Ray[] = [];
    private labelRefs: Latex[] = [];

    public constructor(props?: ComDiagProps) {
        super({
            ...props
        });

        const row_len = this.items()[0].length;

        let diagram =
            <Rect direction={'column'} gap={this.gapSize} alignItems={'center'} layout>
            </Rect>;
        this.items().forEach((row, row_i) => {
            const row_layout = <Layout direction={'row'} gap={this.gapSize} />;
            unwrap(row).forEach((item, col_i) => {
                if (item == null) {
                    return;
                }

                row_layout.add(<Latex
                    ref={makeRef(this.itemRefs, row_i * row_len + col_i)}
                    tex={'{\\color{' + this.itemColor() + '}' + item + '}'}
                />);
            });
            diagram.add(row_layout);
        });

        this.add(
            diagram
        )

        this.add(
            this.arrows().map((_, i) => {
                return <Ray
                    ref={makeRef(this.arrowRefs, i)}
                    stroke={this.arrowColor}
                    start={0.1}
                    end={0.1}
                    lineWidth={1}
                    endArrow={!this.flipArrows()}
                    startArrow={this.flipArrows()}
                    arrowSize={5}
                />
            })
        )

        this.arrows().map((signal, i) => {
            const arrow = unwrap(signal);
            const from = new Vector2(unwrap(arrow[0]));
            const to = new Vector2(unwrap(arrow[1]));
            const from_row = from.x;
            const from_column = from.y;
            const from_item = this.itemRefs[from_row * row_len + from_column];
            const to_row = to.x;
            const to_column = to.y;
            const to_item = this.itemRefs[to_row * row_len + to_column];

            const arrow_ref = this.arrowRefs[i];

            arrow_ref.from(() => from_item.top()
                .transformAsPoint(from_item.parent().localToWorld())
                .transformAsPoint(arrow_ref.worldToParent())
            );
            arrow_ref.to(() => to_item.bottom()
                .transformAsPoint(to_item.parent().localToWorld())
                .transformAsPoint(arrow_ref.worldToParent())
            );
            this.add(<Latex
                ref={makeRef(this.labelRefs, i)}
                tex={'{\\color{' + this.labelColor() + '} ' + this.labels()[i] + '}'}
                height={this.labelHeight}
                opacity={0}
            />)
            this.labelRefs[i].absolutePosition(() => {
                const midpoint = arrow_ref.getPointAtPercentage(0.5);
                // Push arrows labels away from the center of the diagram.
                const sign = (midpoint.normal.dot(midpoint.position) >= 0.01) ? 1 : -1;
                return (midpoint.position.add(
                    // 10 pixels offset from the arrow
                    midpoint.normal.scale(sign * (10 + this.labelRefs[i].width() / 2))))
                    .transformAsPoint(arrow_ref.parent().localToWorld())
            }
            );

        })

    }
    public *animate(duration: number = 3) {
        const original_gap_size = this.gapSize();
        yield* tween(duration / 3, value => { this.gapSize(easeInOutCubic(value, original_gap_size / 10, original_gap_size)) });
        if (this.flipArrows()) {
            yield* all(...this.arrowRefs.map(arrow => {
                arrow.end(0.9);
                return tween(duration / 3, value => arrow.start(easeInOutCubic(value, 0.9, 0.1)));
            }
            ));
        } else {
            yield* all(...this.arrowRefs.map(arrow => tween(duration / 3, value => arrow.end(easeInOutCubic(value, 0.1, 0.9)))));
        }
        yield* all(...this.labelRefs.map(label => tween(duration / 3, value => label.opacity(easeInOutCubic(value)))));
    }

    public *expand(duration: number = 1) {
        const original_gap_size = this.gapSize();
        this.gapSize(original_gap_size / 10);
        yield* this.gapSize(original_gap_size, duration);
    }

    public *animate_arrows(duration: number = 1) {
        if (this.flipArrows()) {
            yield* all(...this.arrowRefs.map(arrow => {
                arrow.end(0.9);
                return tween(duration, value => arrow.start(easeInOutCubic(value, 0.9, 0.1)));
            }));

        } else {
            yield* all(...this.arrowRefs.map(arrow =>
                tween(duration, value => arrow.end(easeInOutCubic(value, 0.1, 0.8)))));
        }
    }

    public *animate_labels(duration: number = 1) {
        yield* all(...this.labelRefs.map(label =>
            tween(duration, value => label.opacity(easeInOutCubic(value)))));
    }
}