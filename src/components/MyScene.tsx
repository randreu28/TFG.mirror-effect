import { OrbitControls } from "@react-three/drei";
import { Model } from "./Model";

type Props = {};

export default function MyScene({}: Props) {
  return (
    <>
      <ambientLight />
      <OrbitControls />
      <Model position={[0, -3, 0]} />

      <pointLight position={[1, 1, 1]} color="green" />
    </>
  );
}
