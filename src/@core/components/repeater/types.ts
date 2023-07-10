// ** React Imports
import { ReactNode, ComponentType } from 'react'
import { Texture } from 'three'

export type RepeaterProps = {
  count: number
  map: Texture
  children(i: number): ReactNode
  tag?: ComponentType | keyof JSX.IntrinsicElements
}
