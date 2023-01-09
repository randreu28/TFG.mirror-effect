import { MeshReflectorMaterial } from "@react-three/drei";
import { DoubleSide } from "three";

export default function Mirror(props: JSX.IntrinsicElements["mesh"]) {
  return (
    <mesh {...props}>
      <planeGeometry args={[4, 4]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={2048}
        mixBlur={1}
        mixStrength={50}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#112727"
        metalness={0.5}
        mirror={0}
        side={DoubleSide}
      />
    </mesh>
  );
}
