import { Environment, Grid, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import Mirror from "./Mirror";

import { Model } from "./Model";
import { Glitch } from "@react-three/postprocessing";
import { Vector2 } from "three";

type Props = {};

type mirror = {
  position: THREE.Vector3;
  rotation: THREE.Euler;
};

export default function MyScene({}: Props) {
  const mirrors = useMemo(() => {
    /**
     * Generates a cloud of points based on the data array of an object.
     *
     * @param data - The raw data array of an object
     * @param length - The length on which the data array must be subarrayed
     * @returns an array of objects with position and rotation
     */
    function generateMirrorCloud(data: any, length: number, scale: number) {
      let mirrors: mirror[] = [];
      for (let i = 0; i < data.length; i += length) {
        const dataArray = data.subarray(i, i + length);
        const newPosition = new THREE.Vector3(
          dataArray[0] * scale, // x
          dataArray[1] * scale, // y
          dataArray[2] * scale // z
        );
        const newRotation = new THREE.Euler().setFromVector3(newPosition);
        mirrors.push({ position: newPosition, rotation: newRotation });
      }
      return mirrors;
    }

    const _Icoshaderon = new THREE.IcosahedronGeometry().attributes.normal;
    let Icosahedron: ArrayLike<number> | undefined;

    if (_Icoshaderon instanceof THREE.Float32BufferAttribute) {
      Icosahedron = _Icoshaderon.array;
    } else {
      throw Error("Type error");
    }

    return generateMirrorCloud(Icosahedron, 3, 6);
  }, []);

  const mirrorGroup = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const currentPosition = mirrorGroup.current.position;
    const currentRotation = mirrorGroup.current.rotation;

    currentPosition.set(
      currentPosition.x,
      currentPosition.y + Math.sin(t) * 0.005,
      currentPosition.z
    );

    currentRotation.set(t * 0.025, t * 0.025, t * 0.025);
  });

  return (
    <>
      <OrbitControls />
      <Grid
        renderOrder={-1}
        position={[0, -3, 0]}
        infiniteGrid
        cellSize={0.6}
        cellThickness={0.6}
        sectionSize={3.3}
        sectionThickness={1.5}
        cellColor={"white"}
        sectionColor={"darkviolet"}
        fadeDistance={30}
      />
      <Environment preset="night" />

      <EffectComposer>
        <Glitch
          strength={new Vector2(1, 1)}
          duration={new Vector2(0.25, 0.25)}
          delay={new Vector2(5, 5)}
        />
      </EffectComposer>

      <group ref={mirrorGroup}>
        {mirrors.map((mirror, key) => {
          return (
            <Mirror
              position={mirror.position}
              rotation={mirror.rotation}
              key={key}
            />
          );
        })}
      </group>

      <Model position={[0, -3, 0]} />
    </>
  );
}
