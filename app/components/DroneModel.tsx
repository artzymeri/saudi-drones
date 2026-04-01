"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

function Drone() {
  const { scene } = useGLTF("/drone-3d.glb");
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Continuous slow rotation on Y axis
      groupRef.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.6}>
      <group ref={groupRef} rotation={[0.3, 0, 0]}>
        <primitive object={scene} scale={2} position={[0, 0, 0]} />
      </group>
    </Float>
  );
}

// Preload the model
useGLTF.preload("/drone-3d.glb");

export default function DroneModel() {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 7], fov: 10 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight
        position={[-3, 2, -2]}
        intensity={0.3}
        color="#5a8a70"
      />
      <pointLight
        position={[0, -2, 3]}
        intensity={0.2}
        color="#a89470"
      />
      <Environment preset="city" />
      <Drone />
    </Canvas>
  );
}
