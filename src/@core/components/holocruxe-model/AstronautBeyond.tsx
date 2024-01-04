'use client'
import React, { useRef } from 'react'
import { useGLTF, PerspectiveCamera } from '@react-three/drei'



const AstronautBeyond = () => {

  const astronautBeyondRef = useRef()
  const astronautBeyond = useGLTF('/models/beyondAstronaut.gltf')

  return <primitive
  ref={astronautBeyondRef}
  object={astronautBeyond.scene}
  scale={3.6}
  position={[0, 0.5, 0]}
  rotation={[0.3,3.1,0]}

  />;
}

const AstronautBeyondCanvas = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 5.5, 11]} fov={75}></PerspectiveCamera>
      <AstronautBeyond />
    </>
  )

  };

export default AstronautBeyondCanvas;
