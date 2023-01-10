import { Environment, OrbitControls } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import Mirror from "./Mirror";

import { Model } from "./Model";

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

    const Icosahedron = new THREE.IcosahedronGeometry().attributes.normal.array;
    return generateMirrorCloud(Icosahedron, 3, 6);
  }, []);

  return (
    <>
      <OrbitControls />
      <Environment preset="night" />

      {mirrors.map((mirror, key) => {
        return (
          <Mirror
            position={mirror.position}
            rotation={mirror.rotation}
            key={key}
          />
        );
      })}

      <Model position={[0, -3, 0]} />
    </>
  );
}
