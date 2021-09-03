import { Point } from '@visx/point'
import { scaleBand } from '@visx/scale'
import { Fullscreen } from './App'
import { Group } from '@visx/group'
import { Line } from '@visx/shape'
import { makeNoise4D } from 'open-simplex-noise'
import { useControls } from 'leva'

const noise = makeNoise4D(Date.now())

function aFrom(n: number) {
    return Array.from({ length: n }).map((_, i) => i)
}

interface FlowCellProps {
    x: number
    y: number
    size: number
    frequency: number
    tx: number
    ty: number
    stroke: string
    strokeWidth: number
    strokeOpacity: number
    length: number
}

function FlowCell({
    x,
    y,
    size,
    frequency,
    tx,
    ty,
    length,
    stroke,
    strokeWidth,
    strokeOpacity,
}: FlowCellProps) {
    const a = noise(x * frequency, y * frequency, tx, ty) * Math.PI
    const r = length * size
    const from = { x: r * Math.sin(a), y: r * Math.cos(a) }
    const to = { x: -from.x, y: -from.y }

    return (
        <Group left={x + 0.5 * size} top={y + 0.5 * size}>
            <Line
                from={from}
                to={to}
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeOpacity={strokeOpacity}
            />
        </Group>
    )
}

interface Props {
    size: number
    cells: number
    frequency: number
    t: number
    tRadius: number
}

export function Vis({ size, cells, frequency, t, tRadius }: Props) {
    const margin = 0.05 * size

    const scale = scaleBand({
        domain: aFrom(cells),
        range: [margin, size - margin],
        padding: 0,
    })

    const cellPoints = aFrom(cells * cells).map(
        (i) => new Point({ x: i % cells, y: Math.floor(i / cells) }),
    )

    const cellFrequency = frequency * (1 / cells)

    const tx = tRadius * Math.sin(t * Math.PI * 2)
    const ty = tRadius * Math.cos(t * Math.PI * 2)

    const strokeProps = useControls('Stroke', {
        stroke: '#000000',
        strokeWidth: 2,
        strokeOpacity: 0.5,
        length: 1,
    })

    return (
        <Fullscreen as="svg" viewBox={`0 0 ${size} ${size}`}>
            {cellPoints.map((p, i) => (
                <FlowCell
                    key={i}
                    x={scale(p.x) || 0}
                    y={scale(p.y) || 0}
                    size={scale.bandwidth()}
                    frequency={cellFrequency}
                    tx={tx}
                    ty={ty}
                    {...strokeProps}
                />
            ))}
        </Fullscreen>
    )
}
