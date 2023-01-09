import { OrbitControls, Plane } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import Mirror from "./Mirror";

import { Model } from "./Model";

type Props = {};

export default function MyScene({}: Props) {
  const mirrorVectors = useMemo(() => {
    const Icosahedron = new THREE.IcosahedronGeometry().attributes.normal.array;

    function groupByVectors(data: any, length: number, scale: number) {
      let result = [];
      for (let i = 0; i < data.length; i += length) {
        const dataArray = data.subarray(i, i + length);
        const newVertice = new THREE.Vector3(
          dataArray[0] * scale, // x
          dataArray[1] * scale, // y
          dataArray[2] * scale // z
        );
        result.push(newVertice);
      }
      return result;
    }

    return groupByVectors(Icosahedron, 3, 5);
  }, []);

  return (
    <>
      {mirrorVectors.map((vector3, key) => {
        return <Plane key={key} position={vector3} />;
      })}

      <ambientLight />
      <OrbitControls />
      <Model position={[0, -3, 0]} />
      <Mirror position={[0, -3, 0]} rotation={[Math.PI * 2.5, 0, 0]} />

      <pointLight position={[1, 1, 1]} color="green" />
    </>
  );
}
