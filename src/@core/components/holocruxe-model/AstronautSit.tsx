'use client'
import React, { useRef } from 'react'
import { useGLTF, PerspectiveCamera } from '@react-three/drei'

const AstronautSit = () => {
  const astronautSitRef = useRef()
  const astronautSit = useGLTF('/models/astronautSit.gltf')


  return <primitive
  ref={astronautSitRef}
  object={astronautSit.scene}
  scale={4}
  position={[0, 0.5, 0]}
  rotation={[0.3,3.1,0]}

  />
}

const AstronautSitCanvas = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 5.5, 11]} fov={75}></PerspectiveCamera>
      <AstronautSit />
    </>
  )

  };
export default AstronautSitCanvas;
