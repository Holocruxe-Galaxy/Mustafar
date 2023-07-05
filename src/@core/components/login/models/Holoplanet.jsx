'use client'
import React, { Suspense, useRef } from 'react'

import { useGLTF, PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const Holoplanet = () => {
  const holoplanetRef = useRef()
  const holoplanet = useGLTF('/models/Holoplanet.gltf')

  useFrame(() => {
    if (holoplanetRef.current) {
      holoplanetRef.current.rotation.x -= 0.003
    }
  })

  return (
    <primitive
      ref={holoplanetRef}
      object={holoplanet.scene}
      scale={3}
      position={[0, -9.5, 0]} //la posicion!
    />
  )
}

const HoloplanetCanvas = () => {
  return (
    <>
      <Suspense>
        <directionalLight intensity={0.2} position={[-5, 5, 5]} castShadow shadow-mapSize={1024} />
        <Holoplanet />
        <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={75}></PerspectiveCamera>
      </Suspense>
    </>
  )
}

export default HoloplanetCanvas
