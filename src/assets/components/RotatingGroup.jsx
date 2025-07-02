import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";

const RotatingGroup = ({ children }) => {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0; // Rotar en el eje Y
      //      groupRef.current.rotation.y += 0.0003; // Rotar en el eje Y
    }
  });

  return <group ref={groupRef}>{children}</group>;
};

export default RotatingGroup;
