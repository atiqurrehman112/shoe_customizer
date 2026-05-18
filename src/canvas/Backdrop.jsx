import React, { useRef } from 'react'
import {easing} from "maath"
import { useFrame } from '@react-three/fiber'
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei'
import { useSnapshot } from 'valtio'
import state from '../store'


function Backdrop() {
  const shadows = useRef();
  const snap = useSnapshot(state);

  
  useFrame((_, delta) =>
    easing.dampC(
      shadows.current.getMesh().material.color,
      snap.color,
      0.25,
      delta
    )
  )
  return (
    <AccumulativeShadows 
    ref={shadows}
    //temporal
    frames={60}
    alphaTest={0.85}
    scale={100}
    rotation={[Math.PI / 2,0,0]}
    position={[0,0,-0.5]}
    >
      <RandomizedLight
      amount={4}
       radius={9}
       intensity={0.5}
       ambient={0.25}
      position={[5,15,-10]}
      />
      <RandomizedLight
      amount={4}
       radius={5}
       intensity={0.25}
       ambient={0.55}
      position={[-5,-10,-9]}
      />
    </AccumulativeShadows>
  )
}

export default Backdrop