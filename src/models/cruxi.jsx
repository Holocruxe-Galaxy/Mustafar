import React, { useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { /* Canvas, */ useFrame } from '@react-three/fiber'

export function Cruxi(props) {
  const gltf = useGLTF('/models/robotv4.gltf')
  const groupRef = useRef()

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = ev => {
      setMousePosition({ x: ev.clientX, y: ev.clientY })
    }

    document.addEventListener('mousemove', updateMousePosition)

    return () => document.removeEventListener('mousemove', updateMousePosition)
  }, [])

  gltf.scene.rotation.y = Math.PI / 0.665

  useFrame(() => {
    if (groupRef && groupRef.current) {
      /* const scaleFactor = 8 */
      const [x, y] = [mousePosition.x / window.innerWidth - 0.5, mousePosition.y / window.innerHeight - 0.5]
      const maxXRotation = Math.PI / 6
      const minXRotation = -Math.PI / 6
      const maxYRotation = Math.PI / 6
      const minYRotation = -Math.PI / 6
      const newXRotation = Math.max(minXRotation, Math.min(maxXRotation, y * Math.PI))
      const newYRotation = Math.max(minYRotation, Math.min(maxYRotation, x * Math.PI))
      groupRef.current.rotation.y = newYRotation
      groupRef.current.rotation.x = newXRotation
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]} {...props} dispose={null}>
      <primitive object={gltf.scene} />
    </group>
  )
}
useGLTF.preload('/models/robotv4.gltf')
