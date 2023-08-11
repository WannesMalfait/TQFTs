import { Latex, Layout, NodeProps, Ray, Rect, Shape, ShapeProps, colorSignal, initial, signal } from "@motion-canvas/2d";
import { ColorSignal, PossibleColor, PossibleVector2, SignalValue, SimpleSignal, Vector2, all, easeInOutCubic, makeRef, tween, unwrap } from "@motion-canvas/core";

export interface ComDiagProps extends ShapeProps {
    labelHeight?: SignalValue<number>;
    gapSize?: SignalValue<number>;
    itemColor?: SignalValue<PossibleColor>;
    labelColor?: SignalValue<PossibleColor>;
    items?: SignalValue<SignalValue<SignalValue<string | null>[]>[]>;
    arrows?: SignalValue<SignalValue<PossibleVector2[]>[]>;
    labels?: SignalValue<string[]>;

}

export class ComDiag extends Shape {
    @initial('#CCCCCC')
    @colorSignal()
    public declare readonly itemColor: ColorSignal<this>;
    @initial('white')
    @colorSignal()
    public declare readonly labelColor: ColorSignal<this>;
    @initial(15)
    @signal()
    public declare readonly labelHeight: SimpleSignal<number, this>;
    @initial(120)
    @signal()
    public declare readonly gapSize: SimpleSignal<number, this>;
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
                    ref={makeRef(this.itemRefs, row_i * 3 + col_i)}
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
                    stroke={this.itemColor}
                    start={0.1}
                    end={0.1}
                    lineWidth={2}
                    endArrow={true}
                    arrowSize={10}
                />
            })
        )

        this.arrows().map((signal, i) => {
            const arrow = unwrap(signal);
            const from = new Vector2(unwrap(arrow[0]));
            const to = new Vector2(unwrap(arrow[1]));
            const from_row = from.x;
            const from_column = from.y;
            const from_item = this.itemRefs[from_row * 3 + from_column];
            const to_row = to.x;
            const to_column = to.y;
            const to_item = this.itemRefs[to_row * 3 + to_column];

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
                return (midpoint.position.add(midpoint.normal.scale(sign * 25)))
                    .transformAsPoint(arrow_ref.parent().localToWorld())
            }
            );

        })

    }
    public *animate(duration: number = 3) {
        const original_gap_size = this.gapSize();
        yield* tween(duration / 3, value => { this.gapSize(easeInOutCubic(value, original_gap_size / 10, original_gap_size)) });
        yield* all(...this.arrowRefs.map(arrow => tween(duration / 3, value => arrow.end(easeInOutCubic(value, 0.1, 0.85)))));
        yield* all(...this.labelRefs.map(label => tween(duration / 3, value => label.opacity(easeInOutCubic(value)))));
    }
}