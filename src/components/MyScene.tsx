import { OrbitControls } from "@react-three/drei";

type Props = {};

export default function MyScene({}: Props) {
  return (
    <>
      <OrbitControls />
      <ambientLight />
      <pointLight position={[1, 1, 1]} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </>
  );
}
