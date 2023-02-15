import { TextScramble } from "@a7sc11u/scramble";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Suspense, useEffect, useRef, useState } from "react";
import MyScene from "./components/MyScene";

export default function App() {
  const ref = useRef<HTMLDivElement>(null)!;

  const [controlsSwitch, setControlsSwitch] = useState<boolean>(true);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.altKey && e.key == "h") setControlsSwitch(!controlsSwitch);
    });
  }, [controlsSwitch]);

  return (
    <>
      <Leva hidden={controlsSwitch} />
      <div className="text-center text-4xl font-extrabold w-1/2 mx-auto pt-10 z-20 relative">
        <TextScramble
          as="h1"
          className="leading-loose absolute"
          ref={ref}
          play={true}
          text="The future is around us. You just have to look."
        />
      </div>
      <div className="w-screen h-screen absolute left-0 top-0 z-10">
        <Suspense fallback={<>...loading</>}>
          <Canvas>
            <MyScene />
          </Canvas>
        </Suspense>
      </div>
    </>
  );
}
