import { useFrame, useThree } from '@react-three/fiber'
import { Icosahedron, useMatcapTexture } from '@react-three/drei'
import { useRef } from 'react'

const yellowMatcap = 'F0D504_FBFAD3_B98609_CDA204'
// const orangeMatcap = 'F75F0B_461604_9A3004_FB9D2F'

export default function SpinningIco() {
    const ref = useRef<any>(null!)

    const [matcap] = useMatcapTexture(yellowMatcap, 256)

    const { width, height } = useThree((s) => s.viewport)
    const r = Math.min(width, height) * 0.25

    useFrame(() => {
        ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += 0.007
    })

    return (
        <Icosahedron ref={ref} scale={[r, r, r]}>
            <meshMatcapMaterial matcap={matcap as any} />
        </Icosahedron>
    )
}
