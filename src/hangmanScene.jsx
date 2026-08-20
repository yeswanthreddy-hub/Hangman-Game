import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, ContactShadows, OrbitControls, Stars } from '@react-three/drei'
import { easing } from 'maath'

const WOOD = '#8a5a2b'
const WOOD_DARK = '#6e4520'
const ROPE = '#c9a15c'
const SKIN = '#f7c59f'
const BODY = '#2dd4bf'
const ARMS = '#14b8a6'
const LEGS = '#0d9488'

function Part({ visible, children }) {
  const ref = useRef()
  useFrame((_, delta) => {
    easing.damp3(
      ref.current.scale,
      visible ? { x: 1, y: 1, z: 1 } : { x: 0, y: 0, z: 0 },
      0.45,
      delta,
    )
  })
  return (
    <group ref={ref} scale={[0, 0, 0]}>
      {children}
    </group>
  )
}

function Scaffold() {
  return (
    <group>
      <mesh position={[0, 0.09, 0]}>
        <boxGeometry args={[2.7, 0.18, 1.7]} />
        <meshStandardMaterial color={WOOD_DARK} roughness={0.7} />
      </mesh>
      <mesh position={[-1.2, 1.4, 0]}>
        <boxGeometry args={[0.2, 2.8, 0.2]} />
        <meshStandardMaterial color={WOOD} roughness={0.6} />
      </mesh>
      <mesh position={[-0.3, 2.75, 0]}>
        <boxGeometry args={[1.9, 0.18, 0.2]} />
        <meshStandardMaterial color={WOOD} roughness={0.6} />
      </mesh>
      <mesh position={[-1.05, 1.55, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[1.75, 0.12, 0.12]} />
        <meshStandardMaterial color={WOOD} roughness={0.6} />
      </mesh>
      <mesh position={[0.45, 2.5, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.55, 12]} />
        <meshStandardMaterial color={ROPE} roughness={0.8} />
      </mesh>
    </group>
  )
}

function Body({ stage, result }) {
  const bodyColor = result === 'won' ? '#22c55e' : result === 'lost' ? '#ef4444' : BODY
  return (
    <group position={[0.45, 0, 0]}>
      <Part visible={stage >= 1}>
        <mesh position={[0, 1.98, 0]}>
          <sphereGeometry args={[0.28, 24, 24]} />
          <meshStandardMaterial color={result ? bodyColor : SKIN} roughness={0.4} />
        </mesh>
      </Part>
      <Part visible={stage >= 2}>
        <mesh position={[0, 1.5, 0]}>
          <cylinderGeometry args={[0.19, 0.21, 0.75, 20]} />
          <meshStandardMaterial color={bodyColor} roughness={0.4} />
        </mesh>
      </Part>
      <Part visible={stage >= 3}>
        <group position={[0.32, 1.68, 0]} rotation={[0, 0, 0.55]}>
          <mesh position={[0, -0.28, 0]}>
            <cylinderGeometry args={[0.07, 0.06, 0.56, 12]} />
            <meshStandardMaterial color={ARMS} roughness={0.4} />
          </mesh>
        </group>
      </Part>
      <Part visible={stage >= 4}>
        <group position={[-0.32, 1.68, 0]} rotation={[0, 0, -0.55]}>
          <mesh position={[0, -0.28, 0]}>
            <cylinderGeometry args={[0.07, 0.06, 0.56, 12]} />
            <meshStandardMaterial color={ARMS} roughness={0.4} />
          </mesh>
        </group>
      </Part>
      <Part visible={stage >= 5}>
        <group position={[0.14, 1.22, 0]} rotation={[0, 0, 0.35]}>
          <mesh position={[0, -0.27, 0]}>
            <cylinderGeometry args={[0.08, 0.06, 0.54, 12]} />
            <meshStandardMaterial color={LEGS} roughness={0.4} />
          </mesh>
        </group>
      </Part>
      <Part visible={stage >= 6}>
        <group position={[-0.14, 1.22, 0]} rotation={[0, 0, -0.35]}>
          <mesh position={[0, -0.27, 0]}>
            <cylinderGeometry args={[0.08, 0.06, 0.54, 12]} />
            <meshStandardMaterial color={LEGS} roughness={0.4} />
          </mesh>
        </group>
      </Part>
    </group>
  )
}

export default function HangmanScene({ stage, result }) {
  return (
    <>
      <color attach="background" args={['#0b1020']} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 8, 4]} intensity={1.3} />
      <directionalLight position={[-4, 3, -5]} intensity={0.5} color="#7fb3ff" />
      <pointLight position={[0, 4, -3]} intensity={0.4} />

      <Stars radius={60} depth={50} count={2500} factor={4} saturation={0} fade speed={1} />

      <group position={[0, -0.15, 0]}>
        <Scaffold />
        <Float speed={1.6} rotationIntensity={0.18} floatIntensity={0.4}>
          <Body stage={stage} result={result} />
        </Float>
        <ContactShadows
          position={[0, 0.18, 0]}
          opacity={0.55}
          scale={8}
          blur={2.4}
          far={4}
          color="#000000"
        />
      </group>

      <OrbitControls
        makeDefault
        enablePan={false}
        minDistance={3}
        maxDistance={9}
        maxPolarAngle={Math.PI / 2.1}
        target={[0, 1.2, 0]}
      />
    </>
  )
}