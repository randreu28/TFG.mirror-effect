import { Canvas } from "@react-three/fiber";
import MyScene from "./components/MyScene";

export default function App() {
  return (
    <div className="w-screen h-screen">
      <Canvas>
        <MyScene />
      </Canvas>
    </div>
  );
}
