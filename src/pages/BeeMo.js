import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const BeeModel = (props) => {
  const ref = useRef();
  const { scene } = useGLTF("models/bug55.glb"); // Ensure this path matches your public folder!

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.003; // Slow rotation
    }
  });

  return <primitive object={scene} ref={ref} scale={0.3} {...props} />;
};

export default BeeModel;
