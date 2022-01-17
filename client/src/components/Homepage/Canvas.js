import { Canvas, useFrame } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense, useRef } from "react";
import image from "../../assets/blender/clipboard3.gltf";
import styles from "./Canvas.module.css";

const Model = () => {
  const myRef = useRef();
  useFrame(({ clock }) => {
    const a = clock.getElapsedTime() + 60;
    myRef.current.rotation.y = a;
  });
  const gltf = useLoader(GLTFLoader, image);
  return (
    <>
      <primitive ref={myRef} object={gltf.scene} scale={0.7} />
    </>
  );
};

const Clipboard = () => {
  return (
    <div className={styles.canvasContainer}>
      <Canvas className={styles.canvas}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <spotLight position={[10, 10, 10]} angle={0.7} />
          <Model />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Clipboard;
