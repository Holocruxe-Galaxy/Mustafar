'use client'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

const Cruxis = () => {
  const cruxisRef = useRef()

  // !! Blue Cruxis está alojado en public/models
  const cruxis = useGLTF('/models/BlueCruxis.gltf')

  return <primitive ref={cruxisRef} object={cruxis.scene} scale={1} position={[0, 0, 0]} />
}

const CruxisCanvas = () => {
  return (
    <>
      <Cruxis />
    </>
  )
}

export default CruxisCanvas
