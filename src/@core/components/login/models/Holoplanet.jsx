'use client'
import React, { useRef } from 'react'
import { useGLTF, PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

const Holoplanet = () => {
  const holoplanetRef = useRef()
  const holoplanet = useGLTF('/models/Holoplanet.gltf')

  useFrame(() => {
    if (holoplanetRef.current) {
      holoplanetRef.current.rotation.x -= 0.001
    }
  })

  return <primitive ref={holoplanetRef} object={holoplanet.scene} scale={3} position={[0, -3.5, -1]} />
}

const HoloplanetCanvas = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 5.5, 11]} fov={75}></PerspectiveCamera>
      <Holoplanet />
    </>
  )
}

export default HoloplanetCanvas
