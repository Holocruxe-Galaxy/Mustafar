'use client'
import React, { useRef } from 'react'
import { useGLTF, PerspectiveCamera } from '@react-three/drei'


const AstronautWave = () => {

  const astronautWaveRef = useRef()
  const astronautWave = useGLTF('/models/astronautWave.gltf')

  return <primitive
  ref={astronautWaveRef}
  object={astronautWave.scene}
  scale={4}
  position={[0, -1, 0]}
  rotation={[0.3,3.1,0]}

  />;
}

const AstronautWaveCanvas = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 5.5, 11]} fov={75}></PerspectiveCamera>
      <AstronautWave />
    </>
  )

  };

export default AstronautWaveCanvas;
