import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Suspense, useEffect, useState } from "react";
import Intro from "./components/Intro";
import MyScene from "./components/MyScene";
import Spinner from "./components/Spinner";

export default function App() {
  const [controlsSwitch, setControlsSwitch] = useState<boolean>(true);
  const [consent, setConsent] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.altKey && e.key == "h") setControlsSwitch(!controlsSwitch);
    });
  }, [controlsSwitch]);

  if (!consent) {
    return <Intro setConsent={setConsent} />;
  }

  return (
    <>
      <Leva hidden={controlsSwitch} />

      <div className="w-screen h-screen absolute left-0 top-0 z-10">
        <Suspense fallback={<Spinner />}>
          <Canvas>
            <MyScene />
          </Canvas>
        </Suspense>
      </div>
    </>
  );
}
