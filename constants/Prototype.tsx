"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

/**
 * Prototype – interactive 3-D product box
 * --------------------------------------------------------------
 * • Much larger rectangular prism (3 × 1 × 1 units)
 * • Auto-rotates when not dragged
 * • Full 360° manual rotation via pointer drag
 * • Clicking toggles top lid opening animation
 */

function BoxWithLid() {
  const groupRef = useRef<THREE.Group>(null!);
  

  /* ----- Interaction state ----- */
  const isDragging = useRef(false);
  const prev = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  

  /* ----- Animation loop ----- */
  useFrame(({ clock }) => {
    // Auto-rotation when NOT dragging
    if (!isDragging.current && groupRef.current) {
      groupRef.current.rotation.y += 0.003; // slow spin
      // groupRef.current.rotation.x intentionally left unchanged to allow full 360° drag
    }


  });

  /* ----- Pointer handlers ----- */
  const handlePointerDown = (e: PointerEvent) => {
    isDragging.current = true;
    if (e.pointerType === "touch") (e.target as Element).setPointerCapture(e.pointerId);
    prev.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!isDragging.current || !groupRef.current) return;
    const dx = e.clientX - prev.current.x;
    const dy = e.clientY - prev.current.y;
    groupRef.current.rotation.y += dx * 0.005;
    groupRef.current.rotation.x += dy * 0.005;
    prev.current = { x: e.clientX, y: e.clientY };
  };

  const stopDrag = () => {
    isDragging.current = false;
  };



  /* ----- Box dimensions ----- */
  // Pizza-box proportions: large square, very shallow height
  const BODY = { w: 5, h: 1, d: 5 }; // increased height for deeper box


  /* ----- Textures and materials ----- */
  const [
    texFront,
    texBack,
    texS1,
    texS2,
    texS3,
    texS4,
  ] = useLoader(THREE.TextureLoader, [
    "/FRONT.jpg",
    "/BACK.jpg",
    "/S1.jpg",
    "/S2.jpg",
    "/S3.jpg",
    "/S4.jpg",
  ]);

  const materials = useMemo(
    () => [
      // Order: +X, -X, +Y, -Y, +Z, -Z
      new THREE.MeshStandardMaterial({ map: texS1, side: THREE.DoubleSide }), // +X – first side
      new THREE.MeshStandardMaterial({ map: texS2, side: THREE.DoubleSide }), // -X – second side
      new THREE.MeshStandardMaterial({ map: texFront, side: THREE.DoubleSide }), // +Y – top (FRONT.jpg)
      new THREE.MeshStandardMaterial({ map: texBack, side: THREE.DoubleSide }), // -Y – fourth side / bottom
      new THREE.MeshStandardMaterial({ map: texS3, side: THREE.DoubleSide }), // +Z – third side
      new THREE.MeshStandardMaterial({ map: texS4, side: THREE.DoubleSide }), // -Z – back (BACK.jpg)
    ],
    [texFront, texBack, texS1, texS2, texS3, texS4]
  );

  return (
    <group
      ref={groupRef}
      position={[0, 0, 0]}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDrag}
      onPointerLeave={stopDrag}
      castShadow
      receiveShadow
    >
      {/* Body */}
      <mesh castShadow position={[0, 0, 0]} material={materials}>
        <boxGeometry args={[BODY.w, BODY.h, BODY.d]} />
      </mesh>


    </group>
  );
}


interface PrototypeProps { size?: number | string }

export default function Prototype({ size = "60vw" }: PrototypeProps) {
  return (
    <div
        className="w-full h-auto select-none cursor-grab active:cursor-grabbing"
        id="prototype"
      >
      <Canvas
        shadows
        camera={{ position: [10, 5, 12], fov: 25 }}
        dpr={typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1}
        style={{ width: "100%", height: typeof size === "number" ? `${size}px` : size }}
      >
        {/* Lights */}
        <ambientLight intensity={0.8} />
        <directionalLight
          castShadow
          position={[5, 10, 5]}
          intensity={1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        {/* Interactive box */}
        <BoxWithLid />

        {/* Ground plane for shadow */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -(1 + 0.2), 0]}
          receiveShadow
        >
          <planeGeometry args={[20, 20]} />
          <shadowMaterial opacity={0.25} />
        </mesh>
      </Canvas>
    </div>
  );
}


