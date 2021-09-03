import { styled } from '@stitches/react'
import { useControls } from 'leva'
import { Vis } from './Vis'

export const Fullscreen = styled('div', {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
})

export default function App() {
    const grid = useControls('Grid', {
        size: 800,
        cells: 40,
    })
    const noiseLoop = useControls('Noise Loop', {
        frequency: 0.25,
        tRadius: 1,
        t: {
            value: 0,
            min: 0,
            max: 1,
            step: 0.01,
        },
    })

    return (
        <Fullscreen>
            <Vis {...grid} {...noiseLoop} />
        </Fullscreen>
    )
}
