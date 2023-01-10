import { MeshReflectorMaterial } from "@react-three/drei";
import { useControls } from "leva";

export default function Mirror(props: JSX.IntrinsicElements["mesh"]) {
  const config = useControls({
    blur: [300, 100], // Blur ground reflections (width, heigt), 0 skips blur
    resolution: 256, // Off-buffer resolution, lower=faster, higher=better quality, slower
    mixBlur: { value: 1, min: 0, max: 1 }, // How much blur mixes with surface roughness (default = 1),
    mixStrength: 50, // Strength of the reflections
    roughness: 0,
    depthScale: 4, // Scale the depth factor (0 = no depth, default = 0)
    minDepthThreshold: 4, // Lower edge for the depthTexture interpolation (default = 0)
    maxDepthThreshold: 10, // Upper edge for the depthTexture interpolation (default = 0)
    color: "#743d8d",
    metalness: { value: 0, min: 0, max: 1 },
    mirror: 0,
  });

  return (
    <mesh {...props}>
      <boxGeometry args={[0.05, 1, 1]} />
      <MeshReflectorMaterial {...config} />
    </mesh>
  );
}
