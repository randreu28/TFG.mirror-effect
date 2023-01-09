import { OrbitControls } from "@react-three/drei";
import { Model } from "./Model";

type Props = {};

export default function MyScene({}: Props) {
  return (
    <>
      <OrbitControls />
      <ambientLight />
      <pointLight position={[1, 1, 1]} />
      <Model position={[0, -2.5, 0]} />
    </>
  );
}
