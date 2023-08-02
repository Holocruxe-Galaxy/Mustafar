'use client'
import React, { useRef } from 'react'
import { useGLTF, PerspectiveCamera } from '@react-three/drei'

const ModelSit = () => {
  const astronautSitRef = useRef()
  const astronautSit = useGLTF('/models/astronautSit.gltf')


  return <primitive ref={astronautSitRef} object={astronautSit.scene} scale={3} position={[0, -3.5, -1]} />
}

const AstronautSitCanvas = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 5.5, 11]} fov={75}></PerspectiveCamera>
      <ModelSit />
    </>
  )

  };
export default AstronautSitCanvas;
