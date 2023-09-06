'use client'
import React, { useRef } from 'react'
import { useGLTF, PerspectiveCamera } from '@react-three/drei'



const AstronautVoltereta = () => {
  const astronautVolteretaRef = useRef()
  const astronautVoltereta = useGLTF('/models/astronautVoltereta.gltf')

  return <primitive
  ref={astronautVolteretaRef}
  object={astronautVoltereta .scene}
  scale={5.2}
  position={[0, 0.5, 0]}
  rotation={[0,3.4,0]}

  />;
}

const AstronautVolteretaCanvas = () => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 5.5, 11]} fov={75}></PerspectiveCamera>
      <AstronautVoltereta />
    </>
  )

  };

export default AstronautVolteretaCanvas;
